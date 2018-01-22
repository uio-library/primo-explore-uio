import get from 'lodash/get';
import uniq from 'lodash/uniq';
import pick from 'lodash/pick';

class LoggingService {

    /*
    $rootScope: IRootScopeService;
    primoVersion: string;
    searchStateService: SearchStateService;
    trail: list;
    keypresses: number
    pasted: boolean
    t1: Date
    */

    /****************************************************************************
     * Constructor
     ****************************************************************************/

    log() {
        let debug = false;

        let args = [].slice.call(arguments);
        args[0] = '[slurp] ' + args[0];
        if (debug) console.log.apply(this, args);
    }

    constructor($rootScope) {
        this.$rootScope = $rootScope;

        // Primo version
        this.primoVersion = null;

        // Unfortunately many of the Primo services are not injectable, so we need
        // to get them from one of the components when ready.
        this.searchStateService = null;
        this.userSessionManagerService = null;

        this.lastAction = null;

        // Navigation trail
        this.trail = [];

        // User language
        this.lang = null;

        // Number of keypresses in main search field. Tracked by prmSearchBarAfter
        this.keypresses = 0;

        // Received a paste event? Tracked by prmSearchBarAfter
        this.pasted = false;

        // Server url
        this.url = 'https://ub-www01.uio.no/slurp/';

        $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState) => {
            var sc = {
                from: fromState.name,
                fromTime: new Date(),
                to: toState.name,
                toTime: new Date(),
                params: toParams,
            };

            if (toParams.lang) {
                this.lang = toParams.lang;
            }

            var dt = '';
            if (this.trail.length > 0) {
                sc.fromTime = this.trail[this.trail.length - 1].toTime;
                dt = `after ${(sc.toTime - sc.fromTime)/1000} secs`;
            }
            this.trail.push(sc);
            this.t1 = new Date();
            this.log(`%cState changed from ${sc.from} to ${sc.to} ${dt}`, 'background: green; color: white; display: block;');

            // if (toState.name == 'exploreMain.search') {
            //   req.params = {
            //     mode: toParams.mode,  // 'advanced' or '?'
            //     lang: toParams.lang,
            //     query: toParams.query,
            //     search_scope: toParams.search_scope,  // 'default', 'everything', 'local_scope' (Bøker ved UiO), 'bibsys_ils', ..
            //     tab: toParams.tab,  // 'default_tab', 'everything', 'local_uio', 'bibsys_consortia' ...
            //     sortby: toParams.sortby,  // "rank"

            //     // pfilter: Materialtype/språk/utgivelsesdato
            //     // Can be either a string or an array!
            //     // Examples:
            //     //  - "pfilter,exact,books,AND"
            //     //  - ["lang,exact,nor,AND", "pfilter,exact,books,AND", "creationdate,exact,1-YEAR,AND"]
            //     pfilter: toParams.pfilter,

            //     // Facets
            //     // Can be either a string or an array!
            //     // Examples:
            //     //  - "local4,include,NB"
            //     //  - ["local4,include,NB", "local10,include,641.5", "local14,include,Matoppskrifter"]
            //     facet: toParams.facet,
            //   };
            // }
        });
    }

    /****************************************************************************
     * Internal methods
     ****************************************************************************/

    isLoggedIn() {
        if (!this.userSessionManagerService) {
            return false;
        }
        return !!this.userSessionManagerService.getUserName().length;
    }

    getUserLanguage() {
        if (!this.userSessionManagerService) {
            return this.lang;
        }

        return this.userSessionManagerService.getUserLanguage();
    }

    simplifyRecord(record) {
        return {
            id:          get(record, 'pnx.control.recordid.0'),
            is_local:    get(record, 'context') == 'L',
            adds_id:     get(record, 'pnx.control.addsrcrecordid.0'),
            source:      get(record, 'pnx.control.sourcesystem.0'),
            ddc:         uniq(get(record, 'pnx.facets.lfc10', [])),
            hume:        uniq(get(record, 'pnx.facets.lfc14', [])),
            real:        uniq(get(record, 'pnx.facets.lfc20', [])),
            rsrctype:    get(record, 'pnx.facets.rsrctype', []),
            disptype:    get(record, 'pnx.display.type.0'),
            title:       get(record, 'pnx.display.title.0')
        };
    }

    trackEvent(action, data) {
        let size = JSON.stringify(data).length;
        this.log(`%cTrack "${action}" action (${size} bytes)`, 'background: green; color: white; display: block;');
        this.log('', data);

        data.lang = this.getUserLanguage();
        data.logged_in = this.isLoggedIn();

        let payload = {
            last_action: this.lastAction,
            action: action,
            data: data,
            session_id: sessionStorage.getItem('slurpSessionId'),
            action_no: parseInt(sessionStorage.getItem('slurpActionNo')) || 1,
            hist: window.history.length,
        };

        this.lastAction = action;

        // Don't use $http since we don't want the Primo default headers etc.
        setTimeout(() => {
            let req = new XMLHttpRequest();
            req.onreadystatechange = function() {
                if(req.readyState === XMLHttpRequest.DONE && req.status === 200) {
                    let res = JSON.parse(req.responseText);
                    sessionStorage.setItem('slurpSessionId', res.session_id);
                    sessionStorage.setItem('slurpActionNo', res.action_no);
                }
            };
            req.open('POST', this.url);
            req.send(JSON.stringify(payload));
        });
    }

    trackError(msg) {
        this.log(`%c${msg}`, 'background: red; color: white; display: block;');
        // TODO: Actually send something to server
    }

    trackSearch(search, result, pageNo) {
        if (!this.trail.length) {
            this.error('Ouch!');
            // something is wrong
            return;
        }
        let trailStep = this.trail[this.trail.length - 1];
        let dt = new Date() - trailStep.toTime;
        this.log(`%cGot search results after waiting ${dt/1000.} secs`, 'background: green; color: white; display: block;');
        this.log('', search, result);

        let recs = result.data.map(this.simplifyRecord);

        let facets = search.facets.map(facet => pick(facet, [
            'name',               // ex: 'local20'
            'value',              // ex: 'Fisker'
            'type',               // ex: 'include'
            'multiFacetGroupId',  // int
        ]));

        // - Multiple query parts are split by semicolon
        // - Each part consists of {field},{precision},{term},{operator}
        // - Semicolons are stripped from queries.
        // - Colons are included and NOT escaped. Example:
        //      title,contains,fisker,krabber,OR;creator,contains,tor,NOT;any,exact,laks,AND
        // - In advanced search, there is always a trailing operator, in simple search not.
        // - Material type, language and date selected in advanced search are included as
        //   part of the query, but prefixed with "facet_"

        let query = [], query_facets = [];

        search.query.split(/;/).forEach(function(x) {
            let comp = x.split(/,/);
            let res;

            if (comp[comp.length-1].match(/^(?:AND|OR|NOT)$/)) {
                res = {
                    op: comp[comp.length-1],
                    field: comp[0],
                    prec: comp[1],
                    term: comp.slice(2, comp.length-1).join(','),
                };
            } else {
                res = {
                    op: null,
                    field: comp[0],
                    prec: comp[1],
                    term: comp.slice(2, comp.length).join(','),
                };
            }
            if (res.field.match(/^facet_/)) {
                query_facets.push({
                    field: res.field,
                    prec: res.prec,
                    term: res.term,
                });
            } else {
                query.push(res);
            }
        });

        for (var i = query.length - 1; i > 0; i--) {
            query[i].op = query[i - 1].op;
        }
        query[0].op = null;

        let data = {
            trailStep: this.trail.length,

            keypresses: this.keypresses,
            pasted: this.pasted,
            prepTime: trailStep.toTime - trailStep.fromTime,
            loadTime: (new Date() - trailStep.toTime),
            version: this.primoVersion,

            // Search
            advanced: search.mode == 'advanced',
            query: query,
            query_facets: query_facets,
            scope: search.scope,    // Trenger vi både scope og tab?
            sort: search.sortby,
            facets: facets,

            // Results
            first: parseInt(result.info.first),
            last: parseInt(result.info.last),
            total: parseInt(result.info.total),
            results: recs.map((x) => x.id),
            page_no: pageNo,

            aggs: {
                records: recs.length,  // greit å ha lett tilgjengelig for å kunne regne prosenter
                is_local: recs.filter((x) => x.is_local).length,  // for å si noe om hvor mange av treffene som er relevante for emnesøk?
                has_dewey: recs.filter((x) => x.ddc.length).length,
                has_humord: recs.filter((x) => x.hume.length).length,
                has_rt: recs.filter((x) => x.real.length).length,
            },
        };

        // var summary = `${data.scope}:${data.query}: Loaded ${data.results.length} of ${data.total} results, of which
        //     ${data.aggs.is_local} local (non-PCI), ${data.aggs.has_dewey} got DDC,
        //     ${data.aggs.has_humord} got Humord, ${data.aggs.has_rt} got Realfagstermer.`;
        // TODO: Notify as event?

        let action = 'search';
        if (get(search, 'facets.0.name') == 'frbrgroupid') {
            action = 'expand_frbr_group';
        } else if (pageNo > 1) {
            action = 'change_page';
        } else if (facets.length) {
            action = 'refinement';
        }

        this.trackEvent(action, data);
    }

    /****************************************************************************
     * Interface for prmSearchBarAfter
     ****************************************************************************/

    // public
    initSearchBar() {
        this.pasted = false;
        this.keypresses = 0;
    }

    // public
    incrKeypressCount() {
        this.keypresses++;
    }

    // public
    setSearchStateService(searchStateService) {
        this.searchStateService = searchStateService;
    }

    // public
    setUserSessionManagerService(userSessionManagerService) {
        this.userSessionManagerService = userSessionManagerService;
    }

    // public
    setPrimoVersion(version) {
        this.primoVersion = version;
    }

    // public
    searchBarElementPasteEvent() {
        this.pasted = true;
    }

    /****************************************************************************
     * Interface for prmSearchResultListAfter
     ****************************************************************************/

    /**
     * Method called from prmSearchResultListAfter when any number of pages
     * are loaded. This also indicates that search results are ready.
     */
    searchPageLoaded(pages) {

        if (!this.searchStateService) {
            // Something is really wrong
            this.trackError('searchStateService not injected');
            return;
        }

        if (this.searchStateService.isSearchInProgress()) {
            this.trackError('searchStateService search still in progress');
            return;
        }

        let search = this.searchStateService.getSearchObject();
        let result = this.searchStateService.getResultObject();

        if (!search || !result) {
            this.trackError('searchObject or resultObject is missing');
            return;
        }

        this.trackSearch(search, result, pages);
    }

    /****************************************************************************
     * Interface for prmNoSearchResultAfter
     ****************************************************************************/

    noResultsPageLoaded() {
        if (!this.searchStateService) {
            // Something is really wrong
            this.trackError('searchStateService not injected');
            return;
        }

        if (this.searchStateService.isSearchInProgress()) {
            this.trackError('searchStateService search still in progress');
            return;
        }

        let search = this.searchStateService.getSearchObject();
        let result = this.searchStateService.getResultObject();

        if (!search || !result) {
            this.trackError('searchObject or resultObject is missing');
            return;
        }

        this.trackSearch(search, result);
    }

    /****************************************************************************
     * Interface for prmFullViewAfter
     ****************************************************************************/

    trackViewRecord(record) {
        this.log('View record', record);
        let data = this.simplifyRecord(record);
        this.trackEvent('view_record', data);
    }

    leaveViewRecord(record) {
        this.log('Leave record', record);
        let data = {
            id: get(record, 'pnx.control.recordid.0'),
        };
        this.trackEvent('leave_record', data);
    }

    trackSendTo(serviceName, record) {
        let data = {
            service: serviceName,
            rec: this.simplifyRecord(record),
        };
        this.trackEvent('send_to', data);
    }

    /****************************************************************************
     * Interface for prmSaveToFavoritesButtonAfter
     ****************************************************************************/

    trackPinRecord(record) {
        let data = this.simplifyRecord(record);
        this.trackEvent('pin_record', data);
    }

    trackUnpinRecord(record) {
        let data = this.simplifyRecord(record);
        this.trackEvent('unpin_record', data);
    }

    /****************************************************************************
     * Interface for prmSearchAfter
     ****************************************************************************/

    trackHome() {
        this.trackEvent('goto_home', {});
    }

    /****************************************************************************
     * Interface for prmBrowseSearchAfter
     ****************************************************************************/

    trackBrowse(data) {
        this.trackEvent('browse', data);
    }

}

LoggingService.$inject = ['$rootScope'];

export default LoggingService;
