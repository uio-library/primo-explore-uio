(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _uniq = require('lodash/uniq');

var _uniq2 = _interopRequireDefault(_uniq);

var _pick = require('lodash/pick');

var _pick2 = _interopRequireDefault(_pick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoggingService = function () {
    _createClass(LoggingService, [{
        key: 'log',


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

        value: function log() {
            var debug = false;

            var args = [].slice.call(arguments);
            args[0] = '[slurp] ' + args[0];
            if (debug) console.log.apply(this, args);
        }
    }]);

    function LoggingService($rootScope) {
        var _this = this;

        _classCallCheck(this, LoggingService);

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

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
            var sc = {
                from: fromState.name,
                fromTime: new Date(),
                to: toState.name,
                toTime: new Date(),
                params: toParams
            };

            if (toParams.lang) {
                _this.lang = toParams.lang;
            }

            var dt = '';
            if (_this.trail.length > 0) {
                sc.fromTime = _this.trail[_this.trail.length - 1].toTime;
                dt = 'after ' + (sc.toTime - sc.fromTime) / 1000 + ' secs';
            }
            _this.trail.push(sc);
            _this.t1 = new Date();
            _this.log('%cState changed from ' + sc.from + ' to ' + sc.to + ' ' + dt, 'background: green; color: white; display: block;');

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

    _createClass(LoggingService, [{
        key: 'isLoggedIn',
        value: function isLoggedIn() {
            if (!this.userSessionManagerService) {
                return false;
            }
            return !!this.userSessionManagerService.getUserName().length;
        }
    }, {
        key: 'getUserLanguage',
        value: function getUserLanguage() {
            if (!this.userSessionManagerService) {
                return this.lang;
            }

            return this.userSessionManagerService.getUserLanguage();
        }
    }, {
        key: 'simplifyRecord',
        value: function simplifyRecord(record) {
            return {
                id: (0, _get2.default)(record, 'pnx.control.recordid.0'),
                is_local: (0, _get2.default)(record, 'context') == 'L',
                adds_id: (0, _get2.default)(record, 'pnx.control.addsrcrecordid.0'),
                source: (0, _get2.default)(record, 'pnx.control.sourcesystem.0'),
                ddc: (0, _uniq2.default)((0, _get2.default)(record, 'pnx.facets.lfc10', [])),
                hume: (0, _uniq2.default)((0, _get2.default)(record, 'pnx.facets.lfc14', [])),
                real: (0, _uniq2.default)((0, _get2.default)(record, 'pnx.facets.lfc20', [])),
                rsrctype: (0, _get2.default)(record, 'pnx.facets.rsrctype', []),
                disptype: (0, _get2.default)(record, 'pnx.display.type.0'),
                title: (0, _get2.default)(record, 'pnx.display.title.0')
            };
        }
    }, {
        key: 'trackEvent',
        value: function trackEvent(action, data) {
            var _this2 = this;

            var size = JSON.stringify(data).length;
            this.log('%cTrack "' + action + '" action (' + size + ' bytes)', 'background: green; color: white; display: block;');
            this.log('', data);

            data.lang = this.getUserLanguage();
            data.logged_in = this.isLoggedIn();

            var payload = {
                last_action: this.lastAction,
                action: action,
                data: data,
                session_id: sessionStorage.getItem('slurpSessionId'),
                session_start: sessionStorage.getItem('slurpSessionStart'),
                action_no: parseInt(sessionStorage.getItem('slurpActionNo')) || 1,
                hist: window.history.length
            };

            this.lastAction = action;

            // Don't use $http since we don't want the Primo default headers etc.
            setTimeout(function () {
                var req = new XMLHttpRequest();
                req.onreadystatechange = function () {
                    if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
                        var res = JSON.parse(req.responseText);
                        sessionStorage.setItem('slurpSessionId', res.session_id);
                        sessionStorage.setItem('slurpSessionStart', res.session_start);
                        sessionStorage.setItem('slurpActionNo', res.action_no);
                    }
                };
                req.open('POST', _this2.url);
                req.send(JSON.stringify(payload));
            });
        }
    }, {
        key: 'trackError',
        value: function trackError(msg) {
            this.log('%c' + msg, 'background: red; color: white; display: block;');
            // TODO: Actually send something to server
        }
    }, {
        key: 'trackSearch',
        value: function trackSearch(search, result, pageNo) {
            if (!this.trail.length) {
                this.error('Ouch!');
                // something is wrong
                return;
            }
            var trailStep = this.trail[this.trail.length - 1];
            var dt = new Date() - trailStep.toTime;
            this.log('%cGot search results after waiting ' + dt / 1000. + ' secs', 'background: green; color: white; display: block;');
            this.log('', search, result);

            var recs = result.data.map(this.simplifyRecord);

            var facets = search.facets.map(function (facet) {
                return (0, _pick2.default)(facet, ['name', // ex: 'local20'
                'value', // ex: 'Fisker'
                'type', // ex: 'include'
                'multiFacetGroupId'] // int
                );
            });

            // - Multiple query parts are split by semicolon
            // - Each part consists of {field},{precision},{term},{operator}
            // - Semicolons are stripped from queries.
            // - Colons are included and NOT escaped. Example:
            //      title,contains,fisker,krabber,OR;creator,contains,tor,NOT;any,exact,laks,AND
            // - In advanced search, there is always a trailing operator, in simple search not.
            // - Material type, language and date selected in advanced search are included as
            //   part of the query, but prefixed with "facet_"

            var query = [],
                query_facets = [];

            search.query.split(/;/).forEach(function (x) {
                var comp = x.split(/,/);
                var res = void 0;

                if (comp[comp.length - 1].match(/^(?:AND|OR|NOT)$/)) {
                    res = {
                        op: comp[comp.length - 1],
                        field: comp[0],
                        prec: comp[1],
                        term: comp.slice(2, comp.length - 1).join(',')
                    };
                } else {
                    res = {
                        op: null,
                        field: comp[0],
                        prec: comp[1],
                        term: comp.slice(2, comp.length).join(',')
                    };
                }
                if (res.field.match(/^facet_/)) {
                    query_facets.push({
                        field: res.field,
                        prec: res.prec,
                        term: res.term
                    });
                } else {
                    query.push(res);
                }
            });

            for (var i = query.length - 1; i > 0; i--) {
                query[i].op = query[i - 1].op;
            }
            query[0].op = null;

            var data = {
                trailStep: this.trail.length,

                keypresses: this.keypresses,
                pasted: this.pasted,
                prepTime: trailStep.toTime - trailStep.fromTime,
                loadTime: new Date() - trailStep.toTime,
                version: this.primoVersion,

                // Search
                advanced: search.mode == 'advanced',
                query: query,
                query_facets: query_facets,
                scope: search.scope, // Trenger vi både scope og tab?
                sort: search.sortby,
                facets: facets,

                // Results
                first: parseInt(result.info.first),
                last: parseInt(result.info.last),
                total: parseInt(result.info.total),
                results: recs.map(function (x) {
                    return x.id;
                }),
                page_no: pageNo,

                aggs: {
                    records: recs.length, // greit å ha lett tilgjengelig for å kunne regne prosenter
                    is_local: recs.filter(function (x) {
                        return x.is_local;
                    }).length, // for å si noe om hvor mange av treffene som er relevante for emnesøk?
                    has_dewey: recs.filter(function (x) {
                        return x.ddc.length;
                    }).length,
                    has_humord: recs.filter(function (x) {
                        return x.hume.length;
                    }).length,
                    has_rt: recs.filter(function (x) {
                        return x.real.length;
                    }).length
                }
            };

            // var summary = `${data.scope}:${data.query}: Loaded ${data.results.length} of ${data.total} results, of which
            //     ${data.aggs.is_local} local (non-PCI), ${data.aggs.has_dewey} got DDC,
            //     ${data.aggs.has_humord} got Humord, ${data.aggs.has_rt} got Realfagstermer.`;
            // TODO: Notify as event?

            var action = 'search';
            if ((0, _get2.default)(search, 'facets.0.name') == 'frbrgroupid') {
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

    }, {
        key: 'initSearchBar',
        value: function initSearchBar() {
            this.pasted = false;
            this.keypresses = 0;
        }

        // public

    }, {
        key: 'incrKeypressCount',
        value: function incrKeypressCount() {
            this.keypresses++;
        }

        // public

    }, {
        key: 'setSearchStateService',
        value: function setSearchStateService(searchStateService) {
            this.searchStateService = searchStateService;
        }

        // public

    }, {
        key: 'setUserSessionManagerService',
        value: function setUserSessionManagerService(userSessionManagerService) {
            this.userSessionManagerService = userSessionManagerService;
        }

        // public

    }, {
        key: 'setPrimoVersion',
        value: function setPrimoVersion(version) {
            this.primoVersion = version;
        }

        // public

    }, {
        key: 'searchBarElementPasteEvent',
        value: function searchBarElementPasteEvent() {
            this.pasted = true;
        }

        /****************************************************************************
         * Interface for prmSearchResultListAfter
         ****************************************************************************/

        /**
         * Method called from prmSearchResultListAfter when any number of pages
         * are loaded. This also indicates that search results are ready.
         */

    }, {
        key: 'searchPageLoaded',
        value: function searchPageLoaded(pages) {

            if (!this.searchStateService) {
                // Something is really wrong
                this.trackError('searchStateService not injected');
                return;
            }

            if (this.searchStateService.isSearchInProgress()) {
                this.trackError('searchStateService search still in progress');
                return;
            }

            var search = this.searchStateService.getSearchObject();
            var result = this.searchStateService.getResultObject();

            if (!search || !result) {
                this.trackError('searchObject or resultObject is missing');
                return;
            }

            this.trackSearch(search, result, pages);
        }

        /****************************************************************************
         * Interface for prmNoSearchResultAfter
         ****************************************************************************/

    }, {
        key: 'noResultsPageLoaded',
        value: function noResultsPageLoaded() {
            if (!this.searchStateService) {
                // Something is really wrong
                this.trackError('searchStateService not injected');
                return;
            }

            if (this.searchStateService.isSearchInProgress()) {
                this.trackError('searchStateService search still in progress');
                return;
            }

            var search = this.searchStateService.getSearchObject();
            var result = this.searchStateService.getResultObject();

            if (!search || !result) {
                this.trackError('searchObject or resultObject is missing');
                return;
            }

            this.trackSearch(search, result);
        }

        /****************************************************************************
         * Interface for prmFullViewAfter
         ****************************************************************************/

    }, {
        key: 'trackViewRecord',
        value: function trackViewRecord(record) {
            this.log('View record', record);
            var data = this.simplifyRecord(record);
            this.trackEvent('view_record', data);
        }
    }, {
        key: 'leaveViewRecord',
        value: function leaveViewRecord(record) {
            this.log('Leave record', record);
            var data = {
                id: (0, _get2.default)(record, 'pnx.control.recordid.0')
            };
            this.trackEvent('leave_record', data);
        }
    }, {
        key: 'trackSendTo',
        value: function trackSendTo(serviceName, record) {
            var data = {
                service: serviceName,
                rec: this.simplifyRecord(record)
            };
            this.trackEvent('send_to', data);
        }

        /****************************************************************************
         * Interface for prmSaveToFavoritesButtonAfter
         ****************************************************************************/

    }, {
        key: 'trackPinRecord',
        value: function trackPinRecord(record) {
            var data = this.simplifyRecord(record);
            this.trackEvent('pin_record', data);
        }
    }, {
        key: 'trackUnpinRecord',
        value: function trackUnpinRecord(record) {
            var data = this.simplifyRecord(record);
            this.trackEvent('unpin_record', data);
        }

        /****************************************************************************
         * Interface for prmSearchAfter
         ****************************************************************************/

    }, {
        key: 'trackHome',
        value: function trackHome() {
            this.trackEvent('goto_home', {});
        }

        /****************************************************************************
         * Interface for prmBrowseSearchAfter
         ****************************************************************************/

    }, {
        key: 'trackBrowse',
        value: function trackBrowse(data) {
            this.trackEvent('browse', data);
        }
    }]);

    return LoggingService;
}();

LoggingService.$inject = ['$rootScope'];

exports.default = LoggingService;

},{"lodash/get":93,"lodash/pick":105,"lodash/uniq":107}],2:[function(require,module,exports){
'use strict';

var _viewName = require('./viewName');

var _viewName2 = _interopRequireDefault(_viewName);

var _logging = require('./logging.service');

var _logging2 = _interopRequireDefault(_logging);

var _prmActionListAfter = require('./prmActionListAfter.component');

var _prmActionListAfter2 = _interopRequireDefault(_prmActionListAfter);

var _prmBriefResultContainerAfter = require('./prmBriefResultContainerAfter.component');

var _prmBriefResultContainerAfter2 = _interopRequireDefault(_prmBriefResultContainerAfter);

var _prmBrowseSearchAfter = require('./prmBrowseSearchAfter.component');

var _prmBrowseSearchAfter2 = _interopRequireDefault(_prmBrowseSearchAfter);

var _prmFullViewAfter = require('./prmFullViewAfter.component');

var _prmFullViewAfter2 = _interopRequireDefault(_prmFullViewAfter);

var _prmNoSearchResultAfter = require('./prmNoSearchResultAfter.component');

var _prmNoSearchResultAfter2 = _interopRequireDefault(_prmNoSearchResultAfter);

var _prmSaveToFavoritesButtonAfter = require('./prmSaveToFavoritesButtonAfter.component');

var _prmSaveToFavoritesButtonAfter2 = _interopRequireDefault(_prmSaveToFavoritesButtonAfter);

var _prmSearchAfter = require('./prmSearchAfter.component');

var _prmSearchAfter2 = _interopRequireDefault(_prmSearchAfter);

var _prmSearchBarAfter = require('./prmSearchBarAfter.component');

var _prmSearchBarAfter2 = _interopRequireDefault(_prmSearchBarAfter);

var _prmSearchResultListAfter = require('./prmSearchResultListAfter.component');

var _prmSearchResultListAfter2 = _interopRequireDefault(_prmSearchResultListAfter);

var _prmSilentLoginAfter = require('./prmSilentLoginAfter.component');

var _prmSilentLoginAfter2 = _interopRequireDefault(_prmSilentLoginAfter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = angular.module('viewCustom', ['angularLoad']);

app.service('loggingService', _logging2.default);

// SearchBar: The search form at the top of the page. Not reloaded on normal page changes.
app.component('prmSearchBarAfter', _prmSearchBarAfter2.default);

// SearchAfter: Everything below the searchbar. Reloaded on normal page changes
app.component('prmSearchAfter', _prmSearchAfter2.default);

// BrowseSearchAfter: Everything below the searchbar for browse pages. Reloaded on normal page changes
app.component('prmBrowseSearchAfter', _prmBrowseSearchAfter2.default);

// SearchResultList: The list of search results, repeated for each search page
app.component('prmSearchResultListAfter', _prmSearchResultListAfter2.default);

// NoSearchResult: If a search yields zero results, we get this instead of SearchResultList
app.component('prmNoSearchResultAfter', _prmNoSearchResultAfter2.default);

// BriefResultContainer: Each search result in the results list
app.component('prmBriefResultContainerAfter', _prmBriefResultContainerAfter2.default);

// FullView: The details view for a single record
app.component('prmFullViewAfter', _prmFullViewAfter2.default);

// ActionList: The action button bar: E-mail, Cite, Permalink, Endnote export etc.
app.component('prmActionListAfter', _prmActionListAfter2.default);

// SaveToFavoritesButton: The "pin record" button, this is found in multiple places
app.component('prmSaveToFavoritesButtonAfter', _prmSaveToFavoritesButtonAfter2.default);

// SilentLogin: Component outside the root uiView.
app.component('prmSilentLoginAfter', _prmSilentLoginAfter2.default);

// ------------------------------------------------------------------------

// eslint-disable-next-line no-unused-vars
app.run(['$rootScope', 'loggingService', function ($rootScope, loggingService) {
    // WARNING: This might not be called if Primo errors..
    // Components may still be initialized
    $rootScope.viewName = _viewName2.default;
}]);

},{"./logging.service":1,"./prmActionListAfter.component":3,"./prmBriefResultContainerAfter.component":4,"./prmBrowseSearchAfter.component":5,"./prmFullViewAfter.component":6,"./prmNoSearchResultAfter.component":7,"./prmSaveToFavoritesButtonAfter.component":8,"./prmSearchAfter.component":9,"./prmSearchBarAfter.component":10,"./prmSearchResultListAfter.component":11,"./prmSilentLoginAfter.component":12,"./viewName":13}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PrmActionListAfterController = function PrmActionListAfterController(loggingService, $document, $element) {
    var _this = this;

    _classCallCheck(this, PrmActionListAfterController);

    // Note: action list can be part of results list OR record view.
    $document.ready(function () {
        var parentElement = $element.parent()[0];
        var btns = angular.element(parentElement.querySelectorAll('#scrollActionList button'));

        if (!btns.length) {
            console.error('Error: No action buttons found!');
        }

        btns.on('click', function (evt) {
            var sendToType = evt.currentTarget.querySelectorAll('.button-text')[0].getAttribute('translate');
            var item = _this.parentCtrl.item.split('.').pop();
            loggingService.trackSendTo(sendToType, item);
        });
    });
};

PrmActionListAfterController.$inject = ['loggingService', '$document', '$element'];

exports.default = {
    bindings: { parentCtrl: '<' },
    controller: PrmActionListAfterController,
    template: ''
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PrmBriefResultContainerAfterController = function PrmBriefResultContainerAfterController($scope) {
    _classCallCheck(this, PrmBriefResultContainerAfterController);

    var item = this.parentCtrl.item;
    /*console.log('brief result', this.parentCtrl.item.pnx);
     let subjects = [];
    if (this.parentCtrl.item.pnx.browse && this.parentCtrl.item.pnx.browse.subject) {
        subjects = this.parentCtrl.item.pnx.browse.subject;
    }
     subjects = subjects.map((sub) => {
        let out = {};
        sub.replace(/^\$\$/, '', sub).split('$$').forEach((x) => {
            out[x.substr(0, 1)] = x.substr(1);
        })
        return out;
    });
    let noubomn = subjects.filter((sub) => {
        return sub.T == 'NOUBOMN' && sub.P != 'N';
    });
    let humord = subjects.filter((sub) => {
        return sub.T == 'HUMORD' && sub.P != 'N';
    });
     $scope.ddc = this.parentCtrl.item.pnx.display.lds10;
    $scope.humord = humord;
    $scope.noubomn = noubomn;
    */
};

PrmBriefResultContainerAfterController.$inject = ['$scope'];

exports.default = {
    bindings: { parentCtrl: '<' },
    controller: PrmBriefResultContainerAfterController
    /*
    template: `<div style="text-align: right; font-size:90%; padding:5px; color: #333; background: #eee;">
        <em>Flere bøker om:</em>
         <span ng-repeat="x in ddc">
            <a ui-sref="exploreMain.search({query: 'lsr10,exact,' + x, mode: 'advanced'})">{{x}}</a> &nbsp;
        </span>
         <span ng-if="humord.length">
            Humord:
            <span ng-repeat="x in humord">
                <a ui-sref="exploreMain.search({query: 'lsr14,exact,' + x.D, mode: 'advanced'})">{{x.D}}</a> &nbsp;
            </span>
        </span>
         <span ng-if="noubomn.length">
            Realfagstermer:
            <span ng-repeat="x in noubomn">
                <a ui-sref="exploreMain.search({query: 'lsr20,exact,' + x.D, mode: 'advanced'})">{{x.D}}</a> &nbsp;
            </span>
        </span>
    </div>`,*/
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PrmBrowseSearchAfterController = function PrmBrowseSearchAfterController($scope, $window, $element, $timeout, $document, $rootScope, loggingService) {
    var _this = this;

    _classCallCheck(this, PrmBrowseSearchAfterController);

    $document.ready(function () {
        var data = {
            input: _this.parentCtrl.browseSearchBarService.searchBarInput,
            scope: _this.parentCtrl.browseSearchService.searchedScope
        };
        loggingService.trackBrowse(data);
    });
};

PrmBrowseSearchAfterController.$inject = ['$scope', '$window', '$element', '$timeout', '$document', '$rootScope', 'loggingService'];

exports.default = {
    // The < symbol denotes one-way bindings which are available since 1.5.
    bindings: { parentCtrl: '<' },
    controller: PrmBrowseSearchAfterController,
    template: ''
};

},{"lodash/get":93}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PrmFullViewAfterController = function () {
    function PrmFullViewAfterController(loggingService) {
        _classCallCheck(this, PrmFullViewAfterController);

        this.loggingService = loggingService;
        this.item = this.parentCtrl.item;
        this.loggingService.trackViewRecord(this.item);
    }

    _createClass(PrmFullViewAfterController, [{
        key: '$onDestroy',
        value: function $onDestroy() {
            this.loggingService.leaveViewRecord(this.item);
        }
    }]);

    return PrmFullViewAfterController;
}();

PrmFullViewAfterController.$inject = ['loggingService'];

exports.default = {
    bindings: { parentCtrl: '<' },
    controller: PrmFullViewAfterController,
    template: ''
};

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Adopted from a version by @SarahZum
 * https://github.com/SarahZum/primo-explore-custom-no-results
 */

var PrmNoSearchResultAfterController = function PrmNoSearchResultAfterController(loggingService) {
    _classCallCheck(this, PrmNoSearchResultAfterController);

    loggingService.noResultsPageLoaded();

    // var vm = this;
    // vm.pciSetting = vm.parentCtrl.searchStateService.searchObject.pcAvailability || '';
    // condole.log(vm.parentCtrl.searchStateService.searchObject);
    // vm.getSearchTerm = function getSearchTerm() {
    //   return vm.parentCtrl.term;
    // };
};

PrmNoSearchResultAfterController.$inject = ['loggingService'];

exports.default = {
    bindings: { parentCtrl: '<' },
    controller: PrmNoSearchResultAfterController,
    template: ''
};

// export default {
//   bindings: {parentCtrl: '<'},
//   controller: PrmNoSearchResultAfterController,
//   controllerAs: 'vm',
//   template: `
//     <md-card class="default-card zero-margin _md md-primoExplore-theme">
//     <md-card-title>
//       <md-card-title-text>
//         <span translate="" class="md-headline ng-scope">No records found</span>
//       </md-card-title-text>
//     </md-card-title>
//     <md-card-content>
//       <p>
//         <span>There are no results matching your search:<blockquote>
//           <i>{{$ctrl.getSearchTerm()}}</i>.</blockquote>
//           <div ng-if="$ctrl.pciSetting !== \'true\'">
//             <a href="/primo-explore/search?query=any,contains,{{$ctrl.getSearchTerm()}}&tab=default_tab&search_scope=Everything&vid=01BRC_SOC&offset=0&sortby=rank&pcAvailability=true">
//               <b>Try again searching items held at other libraries?</b>
//             </a>
//           </div>
//         </span>
//       </p>
//       <p>
//         <span translate="" class="bold-text ng-scope">Suggestions:</span>
//       </p>
//       <ul>
//         <li translate="" class="ng-scope">Make sure that all words are spelled correctly.</li>
//         <li translate="" class="ng-scope">Try a different search scope.</li>
//         <li translate="" class="ng-scope">Try different search terms.</li>
//         <li translate="" class="ng-scope">Try more general search terms.</li>
//         <li translate="" class="ng-scope">Try fewer search terms.</li>
//       </ul>
//       <p>
//         <b>
//           <a href="https://stolaf.on.worldcat.org/search?queryString=kw:{{$ctrl.getSearchTerm()}}&databaseList=283">Search WorldCat</a>
//         </b>
//       </p>
//       <p>
//         <b>
//           <a href="https://www.stolaf.edu/library/research/students.cfm">Contact a Research Librarian for Assistance</a>
//         </b>
//       </p>
//     </md-card-content>
//   </md-card>
//   `
// }

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PrmSaveToFavoritesButtonAfterController = function () {
    function PrmSaveToFavoritesButtonAfterController($timeout, $element, loggingService) {
        _classCallCheck(this, PrmSaveToFavoritesButtonAfterController);

        this.$timeout = $timeout;
        this.$element = $element;
        this.loggingService = loggingService;
    }

    _createClass(PrmSaveToFavoritesButtonAfterController, [{
        key: '$postLink',
        value: function $postLink() {
            var _this = this;

            this.$timeout(function () {
                var parentElement = _this.$element.parent()[0];

                var pinBtn = parentElement.querySelector('button.pin-button'),
                    unpinBtn = parentElement.querySelector('button.unpin-button');

                // Limitation: This will only save the first click, since then the
                // button is replaced with another button element. We could add a
                // DOM watcher, but it's not worth it I think.
                if (pinBtn) {
                    pinBtn.addEventListener('click', function () {
                        _this.loggingService.trackPinRecord(_this.parentCtrl.item);
                    }, { passive: true, capture: true });
                } else if (unpinBtn) {
                    unpinBtn.addEventListener('click', function () {
                        _this.loggingService.trackUnpinRecord(_this.parentCtrl.item);
                    }, { passive: true, capture: true });
                }
            });
        }
    }]);

    return PrmSaveToFavoritesButtonAfterController;
}();

PrmSaveToFavoritesButtonAfterController.$inject = ['$timeout', '$element', 'loggingService'];

exports.default = {
    bindings: { parentCtrl: '<' },
    controller: PrmSaveToFavoritesButtonAfterController,
    template: ''
};

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PrmSearchAfterController = function PrmSearchAfterController($scope, $compile, $timeout, $document, loggingService) {
    _classCallCheck(this, PrmSearchAfterController);

    $document.ready(function () {
        // Note: At this point, the frontpage HTML template might not yet be ready.
        // We see this problem especially in Firefox for some reason. Until we find a better
        // way to detect when the template is loaded, we use a timeout of 100 msecs.
        $timeout(function () {
            var footer = angular.element(document.querySelector('.uio-footer')),
                prmSearchAfterEl = angular.element(document.querySelector('prm-search-after'));

            if (footer.length) {
                // We are on the front page. Move footer to our scope and make it visible
                prmSearchAfterEl.append(footer.detach().addClass('visible'));
                var fnLink = $compile(footer); // returns a Link function used to bind template to the scope
                fnLink($scope); // Bind scope to the template

                loggingService.trackHome();
            }
        }, 100);
    });
};

PrmSearchAfterController.$inject = ['$scope', '$compile', '$timeout', '$document', 'loggingService'];

exports.default = {
    bindings: { parentCtrl: '<' },
    controller: PrmSearchAfterController,
    template: ''
};

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PrmSearchBarAfterController = function PrmSearchBarAfterController($scope, $window, $element, $timeout, $document, $rootScope, loggingService) {
    var _this = this;

    _classCallCheck(this, PrmSearchBarAfterController);

    var primoVersion = (0, _get2.default)($window.appConfig, 'system-configuration.Primo_Version_Number', 'unknown');
    var searchStateService = this.parentCtrl.searchService.searchStateService;

    this.$scope = $scope;
    this.$element = $element;
    this.$timeout = $timeout;
    this.loggingService = loggingService;

    // Inject Primo's searchStateService into our loggingService
    this.loggingService.setSearchStateService(searchStateService);
    this.loggingService.setPrimoVersion(primoVersion);

    this.pasteEventHandler = function () {
        this.loggingService.searchBarElementPasteEvent();
    }.bind(this);

    this.inputHandler = function () {
        this.loggingService.incrKeypressCount();
    }.bind(this);

    this.loggingService.initSearchBar();
    $document.ready(function () {

        // Note: mainSearchField also maps to the first input field on advanced search
        // this.$scope.$watch('$ctrl.parentCtrl.mainSearchField', (newValue, oldValue) => {
        //     if (newValue != oldValue) {
        //         this.loggingService.incrKeypressCount();
        //     }
        // });

        _this.$scope.$watch('$ctrl.parentCtrl.advancedSearch', function (newValue, oldValue) {
            var parentElement = _this.$element.parent()[0];
            var searchBarElement = parentElement.querySelector('#searchBar');

            // Focus on the search bar, if it exists.
            // Note that, when the language is changed,
            // the search bar is not available yet here.
            // We can watch for the element and then focus on it,
            // but it does not seem to worth it.
            if (searchBarElement && !oldValue) {
                $timeout(function () {
                    return searchBarElement.focus();
                });
            }

            var $inputElems = angular.element(parentElement.querySelectorAll('input'));

            $inputElems.off('paste', _this.pasteEventHandler); // To make sure we don't end up with double handlers
            $inputElems.on('paste', _this.pasteEventHandler);

            $inputElems.off('input', _this.inputHandler); // To make sure we don't end up with double handlers
            $inputElems.on('input', _this.inputHandler);
        });
    });
}

// // Called after this controller's element and its children have been linked.
// $postLink() {
//     // Focus input field on load. Adapted from a version by @muratseyhan
//     // https://github.com/Det-Kongelige-Bibliotek/primo-explore-rex/commit/86432e68e313a43db1f01a3a251652f84952d5a6
//     this.$timeout(() => {
//         let parentElement = this.$element.parent();
//         let searchBarElement = parentElement[0].querySelector('#searchBar');

//         // Focus on the search bar, if it exists.
//         // Note that, when the language is changed,
//         // the search bar is not available yet here.
//         // We can watch for the element and then focus on it,
//         // but it does not seem to worth it.
//         if (searchBarElement) {
//             searchBarElement.focus();

//             searchBarElement.addEventListener('paste', () => {
//                 this.loggingService.searchBarElementPasteEvent();
//             }, {passive: true, capture: true});
//         }
//     }, 0);
// }

// Change placeholder text (needs optimization I think)
// by Alex RS: http://search-test.library.brandeis.edu/primo-explore/search?vid=BRANDTEST
// var myVar = setInterval(function(parentCtrl) {
//     parentCtrl._placeHolderText = calculatePlaceHolderText(parentCtrl._selectedTab);
//     console.log("placeholder changed");
// }, 100, this.parentCtrl);

// setTimeout(function( myIntervalID ) {
//     clearInterval(myIntervalID);
//     console.log("placeholder interval cleared");
// }, 5000, myVar);

// $scope.$watch("$parent.$ctrl._selectedTab", function(newTab, oldTab) {
//     $scope.$parent.$ctrl._placeHolderText = calculatePlaceHolderText(newTab);
// });

// function calculatePlaceHolderText (myTab) {
//     switch (myTab) {
//         case "pci":
//             return "Find articles and other materials from scholarly journals, newspapers, and online collections";
//             break;
//         case "alma":
//             return "Find books, movies, music, serials, etc";
//             break;
//         case "everything":
//             return "Find ALL kinds of library resources (books, movies, journal articles, etc)";
//             break;
//         case "course":
//             return "Find books & media on reserve for your class.";
//             break;
//         default:
//             return "unknown-tab placeholder";
//     }
// }
;

PrmSearchBarAfterController.$inject = ['$scope', '$window', '$element', '$timeout', '$document', '$rootScope', 'loggingService'];

exports.default = {
    // The < symbol denotes one-way bindings which are available since 1.5.
    bindings: { parentCtrl: '<' },
    controller: PrmSearchBarAfterController,
    template: ''
};

},{"lodash/get":93}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PrmSearchResultListAfterController = function PrmSearchResultListAfterController($window, $scope, loggingService) {
    _classCallCheck(this, PrmSearchResultListAfterController);

    var primoVersion = (0, _get2.default)($window.appConfig, 'system-configuration.Primo_Version_Number', 'unknown');
    var searchStateService = this.parentCtrl.searchService.searchStateService;

    // Inject Primo's searchStateService into our loggingService
    loggingService.setSearchStateService(searchStateService);
    loggingService.setPrimoVersion(primoVersion);

    $scope.$watch('$ctrl.parentCtrl.numOfLoadedPages', function (newValue) {
        if (newValue) {
            loggingService.searchPageLoaded(newValue);
        }
    });
};

PrmSearchResultListAfterController.$inject = ['$window', '$scope', 'loggingService'];

exports.default = {
    bindings: { parentCtrl: '<' },
    controller: PrmSearchResultListAfterController,
    template: ''
};

},{"lodash/get":93}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PrmSilentLoginAfterController = function PrmSilentLoginAfterController(loggingService) {
    _classCallCheck(this, PrmSilentLoginAfterController);

    var userSessionManagerService = this.parentCtrl.userSessionManagerService;
    loggingService.setUserSessionManagerService(userSessionManagerService);
};

PrmSilentLoginAfterController.$inject = ['loggingService'];

exports.default = {
    bindings: { parentCtrl: '<' },
    controller: PrmSilentLoginAfterController,
    template: ''
};

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Define the view name here.
var viewName = 'UIO';
exports.default = viewName;

},{}],14:[function(require,module,exports){
var hashClear = require('./_hashClear'),
    hashDelete = require('./_hashDelete'),
    hashGet = require('./_hashGet'),
    hashHas = require('./_hashHas'),
    hashSet = require('./_hashSet');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;

},{"./_hashClear":56,"./_hashDelete":57,"./_hashGet":58,"./_hashHas":59,"./_hashSet":60}],15:[function(require,module,exports){
var listCacheClear = require('./_listCacheClear'),
    listCacheDelete = require('./_listCacheDelete'),
    listCacheGet = require('./_listCacheGet'),
    listCacheHas = require('./_listCacheHas'),
    listCacheSet = require('./_listCacheSet');

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;

},{"./_listCacheClear":66,"./_listCacheDelete":67,"./_listCacheGet":68,"./_listCacheHas":69,"./_listCacheSet":70}],16:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;

},{"./_getNative":52,"./_root":80}],17:[function(require,module,exports){
var mapCacheClear = require('./_mapCacheClear'),
    mapCacheDelete = require('./_mapCacheDelete'),
    mapCacheGet = require('./_mapCacheGet'),
    mapCacheHas = require('./_mapCacheHas'),
    mapCacheSet = require('./_mapCacheSet');

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;

},{"./_mapCacheClear":71,"./_mapCacheDelete":72,"./_mapCacheGet":73,"./_mapCacheHas":74,"./_mapCacheSet":75}],18:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;

},{"./_getNative":52,"./_root":80}],19:[function(require,module,exports){
var MapCache = require('./_MapCache'),
    setCacheAdd = require('./_setCacheAdd'),
    setCacheHas = require('./_setCacheHas');

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;

},{"./_MapCache":17,"./_setCacheAdd":81,"./_setCacheHas":82}],20:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":80}],21:[function(require,module,exports){
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

},{}],22:[function(require,module,exports){
var baseIndexOf = require('./_baseIndexOf');

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;

},{"./_baseIndexOf":34}],23:[function(require,module,exports){
/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;

},{}],24:[function(require,module,exports){
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],25:[function(require,module,exports){
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

},{}],26:[function(require,module,exports){
var baseAssignValue = require('./_baseAssignValue'),
    eq = require('./eq');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;

},{"./_baseAssignValue":28,"./eq":91}],27:[function(require,module,exports){
var eq = require('./eq');

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;

},{"./eq":91}],28:[function(require,module,exports){
var defineProperty = require('./_defineProperty');

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;

},{"./_defineProperty":48}],29:[function(require,module,exports){
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;

},{}],30:[function(require,module,exports){
var arrayPush = require('./_arrayPush'),
    isFlattenable = require('./_isFlattenable');

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

},{"./_arrayPush":25,"./_isFlattenable":61}],31:[function(require,module,exports){
var castPath = require('./_castPath'),
    toKey = require('./_toKey');

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;

},{"./_castPath":45,"./_toKey":88}],32:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":20,"./_getRawTag":53,"./_objectToString":78}],33:[function(require,module,exports){
/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;

},{}],34:[function(require,module,exports){
var baseFindIndex = require('./_baseFindIndex'),
    baseIsNaN = require('./_baseIsNaN'),
    strictIndexOf = require('./_strictIndexOf');

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;

},{"./_baseFindIndex":29,"./_baseIsNaN":36,"./_strictIndexOf":86}],35:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;

},{"./_baseGetTag":32,"./isObjectLike":101}],36:[function(require,module,exports){
/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;

},{}],37:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isMasked = require('./_isMasked'),
    isObject = require('./isObject'),
    toSource = require('./_toSource');

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

},{"./_isMasked":65,"./_toSource":89,"./isFunction":98,"./isObject":100}],38:[function(require,module,exports){
var basePickBy = require('./_basePickBy'),
    hasIn = require('./hasIn');

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, paths) {
  return basePickBy(object, paths, function(value, path) {
    return hasIn(object, path);
  });
}

module.exports = basePick;

},{"./_basePickBy":39,"./hasIn":94}],39:[function(require,module,exports){
var baseGet = require('./_baseGet'),
    baseSet = require('./_baseSet'),
    castPath = require('./_castPath');

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths, predicate) {
  var index = -1,
      length = paths.length,
      result = {};

  while (++index < length) {
    var path = paths[index],
        value = baseGet(object, path);

    if (predicate(value, path)) {
      baseSet(result, castPath(path, object), value);
    }
  }
  return result;
}

module.exports = basePickBy;

},{"./_baseGet":31,"./_baseSet":40,"./_castPath":45}],40:[function(require,module,exports){
var assignValue = require('./_assignValue'),
    castPath = require('./_castPath'),
    isIndex = require('./_isIndex'),
    isObject = require('./isObject'),
    toKey = require('./_toKey');

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {});
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

module.exports = baseSet;

},{"./_assignValue":26,"./_castPath":45,"./_isIndex":62,"./_toKey":88,"./isObject":100}],41:[function(require,module,exports){
var constant = require('./constant'),
    defineProperty = require('./_defineProperty'),
    identity = require('./identity');

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;

},{"./_defineProperty":48,"./constant":90,"./identity":95}],42:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    arrayMap = require('./_arrayMap'),
    isArray = require('./isArray'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;

},{"./_Symbol":20,"./_arrayMap":24,"./isArray":97,"./isSymbol":102}],43:[function(require,module,exports){
var SetCache = require('./_SetCache'),
    arrayIncludes = require('./_arrayIncludes'),
    arrayIncludesWith = require('./_arrayIncludesWith'),
    cacheHas = require('./_cacheHas'),
    createSet = require('./_createSet'),
    setToArray = require('./_setToArray');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;

},{"./_SetCache":19,"./_arrayIncludes":22,"./_arrayIncludesWith":23,"./_cacheHas":44,"./_createSet":47,"./_setToArray":83}],44:[function(require,module,exports){
/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;

},{}],45:[function(require,module,exports){
var isArray = require('./isArray'),
    isKey = require('./_isKey'),
    stringToPath = require('./_stringToPath'),
    toString = require('./toString');

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;

},{"./_isKey":63,"./_stringToPath":87,"./isArray":97,"./toString":106}],46:[function(require,module,exports){
var root = require('./_root');

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;

},{"./_root":80}],47:[function(require,module,exports){
var Set = require('./_Set'),
    noop = require('./noop'),
    setToArray = require('./_setToArray');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set(values);
};

module.exports = createSet;

},{"./_Set":18,"./_setToArray":83,"./noop":104}],48:[function(require,module,exports){
var getNative = require('./_getNative');

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;

},{"./_getNative":52}],49:[function(require,module,exports){
var flatten = require('./flatten'),
    overRest = require('./_overRest'),
    setToString = require('./_setToString');

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

module.exports = flatRest;

},{"./_overRest":79,"./_setToString":84,"./flatten":92}],50:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],51:[function(require,module,exports){
var isKeyable = require('./_isKeyable');

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;

},{"./_isKeyable":64}],52:[function(require,module,exports){
var baseIsNative = require('./_baseIsNative'),
    getValue = require('./_getValue');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

},{"./_baseIsNative":37,"./_getValue":54}],53:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":20}],54:[function(require,module,exports){
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

},{}],55:[function(require,module,exports){
var castPath = require('./_castPath'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isIndex = require('./_isIndex'),
    isLength = require('./isLength'),
    toKey = require('./_toKey');

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;

},{"./_castPath":45,"./_isIndex":62,"./_toKey":88,"./isArguments":96,"./isArray":97,"./isLength":99}],56:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;

},{"./_nativeCreate":77}],57:[function(require,module,exports){
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;

},{}],58:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;

},{"./_nativeCreate":77}],59:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;

},{"./_nativeCreate":77}],60:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;

},{"./_nativeCreate":77}],61:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray');

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;

},{"./_Symbol":20,"./isArguments":96,"./isArray":97}],62:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;

},{}],63:[function(require,module,exports){
var isArray = require('./isArray'),
    isSymbol = require('./isSymbol');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;

},{"./isArray":97,"./isSymbol":102}],64:[function(require,module,exports){
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;

},{}],65:[function(require,module,exports){
var coreJsData = require('./_coreJsData');

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;

},{"./_coreJsData":46}],66:[function(require,module,exports){
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;

},{}],67:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;

},{"./_assocIndexOf":27}],68:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;

},{"./_assocIndexOf":27}],69:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;

},{"./_assocIndexOf":27}],70:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;

},{"./_assocIndexOf":27}],71:[function(require,module,exports){
var Hash = require('./_Hash'),
    ListCache = require('./_ListCache'),
    Map = require('./_Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;

},{"./_Hash":14,"./_ListCache":15,"./_Map":16}],72:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;

},{"./_getMapData":51}],73:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;

},{"./_getMapData":51}],74:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;

},{"./_getMapData":51}],75:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;

},{"./_getMapData":51}],76:[function(require,module,exports){
var memoize = require('./memoize');

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;

},{"./memoize":103}],77:[function(require,module,exports){
var getNative = require('./_getNative');

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;

},{"./_getNative":52}],78:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],79:[function(require,module,exports){
var apply = require('./_apply');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;

},{"./_apply":21}],80:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":50}],81:[function(require,module,exports){
/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;

},{}],82:[function(require,module,exports){
/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;

},{}],83:[function(require,module,exports){
/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;

},{}],84:[function(require,module,exports){
var baseSetToString = require('./_baseSetToString'),
    shortOut = require('./_shortOut');

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;

},{"./_baseSetToString":41,"./_shortOut":85}],85:[function(require,module,exports){
/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;

},{}],86:[function(require,module,exports){
/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;

},{}],87:[function(require,module,exports){
var memoizeCapped = require('./_memoizeCapped');

/** Used to match property names within property paths. */
var reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;

},{"./_memoizeCapped":76}],88:[function(require,module,exports){
var isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;

},{"./isSymbol":102}],89:[function(require,module,exports){
/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;

},{}],90:[function(require,module,exports){
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;

},{}],91:[function(require,module,exports){
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;

},{}],92:[function(require,module,exports){
var baseFlatten = require('./_baseFlatten');

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;

},{"./_baseFlatten":30}],93:[function(require,module,exports){
var baseGet = require('./_baseGet');

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;

},{"./_baseGet":31}],94:[function(require,module,exports){
var baseHasIn = require('./_baseHasIn'),
    hasPath = require('./_hasPath');

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;

},{"./_baseHasIn":33,"./_hasPath":55}],95:[function(require,module,exports){
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],96:[function(require,module,exports){
var baseIsArguments = require('./_baseIsArguments'),
    isObjectLike = require('./isObjectLike');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;

},{"./_baseIsArguments":35,"./isObjectLike":101}],97:[function(require,module,exports){
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],98:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObject = require('./isObject');

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

},{"./_baseGetTag":32,"./isObject":100}],99:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],100:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],101:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],102:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;

},{"./_baseGetTag":32,"./isObjectLike":101}],103:[function(require,module,exports){
var MapCache = require('./_MapCache');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;

},{"./_MapCache":17}],104:[function(require,module,exports){
/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;

},{}],105:[function(require,module,exports){
var basePick = require('./_basePick'),
    flatRest = require('./_flatRest');

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
var pick = flatRest(function(object, paths) {
  return object == null ? {} : basePick(object, paths);
});

module.exports = pick;

},{"./_basePick":38,"./_flatRest":49}],106:[function(require,module,exports){
var baseToString = require('./_baseToString');

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;

},{"./_baseToString":42}],107:[function(require,module,exports){
var baseUniq = require('./_baseUniq');

/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each element
 * is kept. The order of result values is determined by the order they occur
 * in the array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 */
function uniq(array) {
  return (array && array.length) ? baseUniq(array) : [];
}

module.exports = uniq;

},{"./_baseUniq":43}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvbG9nZ2luZy5zZXJ2aWNlLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL2pzL21haW4uanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvcHJtQWN0aW9uTGlzdEFmdGVyLmNvbXBvbmVudC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9qcy9wcm1CcmllZlJlc3VsdENvbnRhaW5lckFmdGVyLmNvbXBvbmVudC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9qcy9wcm1Ccm93c2VTZWFyY2hBZnRlci5jb21wb25lbnQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvcHJtRnVsbFZpZXdBZnRlci5jb21wb25lbnQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvcHJtTm9TZWFyY2hSZXN1bHRBZnRlci5jb21wb25lbnQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvcHJtU2F2ZVRvRmF2b3JpdGVzQnV0dG9uQWZ0ZXIuY29tcG9uZW50LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL2pzL3BybVNlYXJjaEFmdGVyLmNvbXBvbmVudC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9qcy9wcm1TZWFyY2hCYXJBZnRlci5jb21wb25lbnQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvcHJtU2VhcmNoUmVzdWx0TGlzdEFmdGVyLmNvbXBvbmVudC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9qcy9wcm1TaWxlbnRMb2dpbkFmdGVyLmNvbXBvbmVudC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9qcy92aWV3TmFtZS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19IYXNoLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX0xpc3RDYWNoZS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19NYXAuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fTWFwQ2FjaGUuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fU2V0LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1NldENhY2hlLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1N5bWJvbC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19hcHBseS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19hcnJheUluY2x1ZGVzLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5SW5jbHVkZXNXaXRoLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5TWFwLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5UHVzaC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19hc3NpZ25WYWx1ZS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19hc3NvY0luZGV4T2YuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUFzc2lnblZhbHVlLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VGaW5kSW5kZXguanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUZsYXR0ZW4uanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUdldC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VIYXNJbi5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSW5kZXhPZi5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNBcmd1bWVudHMuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzTmFOLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc05hdGl2ZS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlUGljay5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlUGlja0J5LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VTZXQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVNldFRvU3RyaW5nLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VUb1N0cmluZy5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlVW5pcS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19jYWNoZUhhcy5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19jYXN0UGF0aC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19jb3JlSnNEYXRhLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NyZWF0ZVNldC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19kZWZpbmVQcm9wZXJ0eS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19mbGF0UmVzdC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldE1hcERhdGEuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0TmF0aXZlLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRWYWx1ZS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNQYXRoLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hDbGVhci5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoRGVsZXRlLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hHZXQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9faGFzaEhhcy5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoU2V0LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzRmxhdHRlbmFibGUuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNJbmRleC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19pc0tleS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19pc0tleWFibGUuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNNYXNrZWQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlQ2xlYXIuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlRGVsZXRlLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2xpc3RDYWNoZUdldC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19saXN0Q2FjaGVIYXMuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlU2V0LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcENhY2hlQ2xlYXIuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVEZWxldGUuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVHZXQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVIYXMuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVTZXQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWVtb2l6ZUNhcHBlZC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19uYXRpdmVDcmVhdGUuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fb2JqZWN0VG9TdHJpbmcuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fb3ZlclJlc3QuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fcm9vdC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19zZXRDYWNoZUFkZC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19zZXRDYWNoZUhhcy5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19zZXRUb0FycmF5LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3NldFRvU3RyaW5nLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3Nob3J0T3V0LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3N0cmljdEluZGV4T2YuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RyaW5nVG9QYXRoLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3RvS2V5LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3RvU291cmNlLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvY29uc3RhbnQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9lcS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL2ZsYXR0ZW4uanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9nZXQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9oYXNJbi5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL2lkZW50aXR5LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcmd1bWVudHMuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0FycmF5LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNGdW5jdGlvbi5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL2lzTGVuZ3RoLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3QuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL21lbW9pemUuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9ub29wLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvcGljay5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL3RvU3RyaW5nLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvdW5pcS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVNLGM7Ozs7O0FBRUY7Ozs7Ozs7Ozs7QUFVQTs7Ozs4QkFJTTtBQUNGLGdCQUFJLFFBQVEsS0FBWjs7QUFFQSxnQkFBSSxPQUFPLEdBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxTQUFkLENBQVg7QUFDQSxpQkFBSyxDQUFMLElBQVUsYUFBYSxLQUFLLENBQUwsQ0FBdkI7QUFDQSxnQkFBSSxLQUFKLEVBQVcsUUFBUSxHQUFSLENBQVksS0FBWixDQUFrQixJQUFsQixFQUF3QixJQUF4QjtBQUNkOzs7QUFFRCw0QkFBWSxVQUFaLEVBQXdCO0FBQUE7O0FBQUE7O0FBQ3BCLGFBQUssVUFBTCxHQUFrQixVQUFsQjs7QUFFQTtBQUNBLGFBQUssWUFBTCxHQUFvQixJQUFwQjs7QUFFQTtBQUNBO0FBQ0EsYUFBSyxrQkFBTCxHQUEwQixJQUExQjtBQUNBLGFBQUsseUJBQUwsR0FBaUMsSUFBakM7O0FBRUEsYUFBSyxVQUFMLEdBQWtCLElBQWxCOztBQUVBO0FBQ0EsYUFBSyxLQUFMLEdBQWEsRUFBYjs7QUFFQTtBQUNBLGFBQUssSUFBTCxHQUFZLElBQVo7O0FBRUE7QUFDQSxhQUFLLFVBQUwsR0FBa0IsQ0FBbEI7O0FBRUE7QUFDQSxhQUFLLE1BQUwsR0FBYyxLQUFkOztBQUVBO0FBQ0EsYUFB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QUFHWCxjQUFVO0FBSEMsQzs7Ozs7Ozs7QUNWZjtBQUNBLElBQU0sV0FBVyxLQUFqQjtrQkFDZSxROzs7QUNGZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IGdldCBmcm9tICdsb2Rhc2gvZ2V0JztcbmltcG9ydCB1bmlxIGZyb20gJ2xvZGFzaC91bmlxJztcbmltcG9ydCBwaWNrIGZyb20gJ2xvZGFzaC9waWNrJztcblxuY2xhc3MgTG9nZ2luZ1NlcnZpY2Uge1xuXG4gICAgLypcbiAgICAkcm9vdFNjb3BlOiBJUm9vdFNjb3BlU2VydmljZTtcbiAgICBwcmltb1ZlcnNpb246IHN0cmluZztcbiAgICBzZWFyY2hTdGF0ZVNlcnZpY2U6IFNlYXJjaFN0YXRlU2VydmljZTtcbiAgICB0cmFpbDogbGlzdDtcbiAgICBrZXlwcmVzc2VzOiBudW1iZXJcbiAgICBwYXN0ZWQ6IGJvb2xlYW5cbiAgICB0MTogRGF0ZVxuICAgICovXG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICBsb2coKSB7XG4gICAgICAgIGxldCBkZWJ1ZyA9IGZhbHNlO1xuXG4gICAgICAgIGxldCBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICBhcmdzWzBdID0gJ1tzbHVycF0gJyArIGFyZ3NbMF07XG4gICAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2cuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoJHJvb3RTY29wZSkge1xuICAgICAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xuXG4gICAgICAgIC8vIFByaW1vIHZlcnNpb25cbiAgICAgICAgdGhpcy5wcmltb1ZlcnNpb24gPSBudWxsO1xuXG4gICAgICAgIC8vIFVuZm9ydHVuYXRlbHkgbWFueSBvZiB0aGUgUHJpbW8gc2VydmljZXMgYXJlIG5vdCBpbmplY3RhYmxlLCBzbyB3ZSBuZWVkXG4gICAgICAgIC8vIHRvIGdldCB0aGVtIGZyb20gb25lIG9mIHRoZSBjb21wb25lbnRzIHdoZW4gcmVhZHkuXG4gICAgICAgIHRoaXMuc2VhcmNoU3RhdGVTZXJ2aWNlID0gbnVsbDtcbiAgICAgICAgdGhpcy51c2VyU2Vzc2lvbk1hbmFnZXJTZXJ2aWNlID0gbnVsbDtcblxuICAgICAgICB0aGlzLmxhc3RBY3Rpb24gPSBudWxsO1xuXG4gICAgICAgIC8vIE5hdmlnYXRpb24gdHJhaWxcbiAgICAgICAgdGhpcy50cmFpbCA9IFtdO1xuXG4gICAgICAgIC8vIFVzZXIgbGFuZ3VhZ2VcbiAgICAgICAgdGhpcy5sYW5nID0gbnVsbDtcblxuICAgICAgICAvLyBOdW1iZXIgb2Yga2V5cHJlc3NlcyBpbiBtYWluIHNlYXJjaCBmaWVsZC4gVHJhY2tlZCBieSBwcm1TZWFyY2hCYXJBZnRlclxuICAgICAgICB0aGlzLmtleXByZXNzZXMgPSAwO1xuXG4gICAgICAgIC8vIFJlY2VpdmVkIGEgcGFzdGUgZXZlbnQ/IFRyYWNrZWQgYnkgcHJtU2VhcmNoQmFyQWZ0ZXJcbiAgICAgICAgdGhpcy5wYXN0ZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyBTZXJ2ZXIgdXJsXG4gICAgICAgIHRoaXMudXJsID0gJ2h0dHBzOi8vdWItd3d3MDEudWlvLm5vL3NsdXJwLyc7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCAoZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUpID0+IHtcbiAgICAgICAgICAgIHZhciBzYyA9IHtcbiAgICAgICAgICAgICAgICBmcm9tOiBmcm9tU3RhdGUubmFtZSxcbiAgICAgICAgICAgICAgICBmcm9tVGltZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICB0bzogdG9TdGF0ZS5uYW1lLFxuICAgICAgICAgICAgICAgIHRvVGltZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHRvUGFyYW1zLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRvUGFyYW1zLmxhbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhbmcgPSB0b1BhcmFtcy5sYW5nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHQgPSAnJztcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWlsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzYy5mcm9tVGltZSA9IHRoaXMudHJhaWxbdGhpcy50cmFpbC5sZW5ndGggLSAxXS50b1RpbWU7XG4gICAgICAgICAgICAgICAgZHQgPSBgYWZ0ZXIgJHsoc2MudG9UaW1lIC0gc2MuZnJvbVRpbWUpLzEwMDB9IHNlY3NgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50cmFpbC5wdXNoKHNjKTtcbiAgICAgICAgICAgIHRoaXMudDEgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5sb2coYCVjU3RhdGUgY2hhbmdlZCBmcm9tICR7c2MuZnJvbX0gdG8gJHtzYy50b30gJHtkdH1gLCAnYmFja2dyb3VuZDogZ3JlZW47IGNvbG9yOiB3aGl0ZTsgZGlzcGxheTogYmxvY2s7Jyk7XG5cbiAgICAgICAgICAgIC8vIGlmICh0b1N0YXRlLm5hbWUgPT0gJ2V4cGxvcmVNYWluLnNlYXJjaCcpIHtcbiAgICAgICAgICAgIC8vICAgcmVxLnBhcmFtcyA9IHtcbiAgICAgICAgICAgIC8vICAgICBtb2RlOiB0b1BhcmFtcy5tb2RlLCAgLy8gJ2FkdmFuY2VkJyBvciAnPydcbiAgICAgICAgICAgIC8vICAgICBsYW5nOiB0b1BhcmFtcy5sYW5nLFxuICAgICAgICAgICAgLy8gICAgIHF1ZXJ5OiB0b1BhcmFtcy5xdWVyeSxcbiAgICAgICAgICAgIC8vICAgICBzZWFyY2hfc2NvcGU6IHRvUGFyYW1zLnNlYXJjaF9zY29wZSwgIC8vICdkZWZhdWx0JywgJ2V2ZXJ5dGhpbmcnLCAnbG9jYWxfc2NvcGUnIChCw7hrZXIgdmVkIFVpTyksICdiaWJzeXNfaWxzJywgLi5cbiAgICAgICAgICAgIC8vICAgICB0YWI6IHRvUGFyYW1zLnRhYiwgIC8vICdkZWZhdWx0X3RhYicsICdldmVyeXRoaW5nJywgJ2xvY2FsX3VpbycsICdiaWJzeXNfY29uc29ydGlhJyAuLi5cbiAgICAgICAgICAgIC8vICAgICBzb3J0Ynk6IHRvUGFyYW1zLnNvcnRieSwgIC8vIFwicmFua1wiXG5cbiAgICAgICAgICAgIC8vICAgICAvLyBwZmlsdGVyOiBNYXRlcmlhbHR5cGUvc3Byw6VrL3V0Z2l2ZWxzZXNkYXRvXG4gICAgICAgICAgICAvLyAgICAgLy8gQ2FuIGJlIGVpdGhlciBhIHN0cmluZyBvciBhbiBhcnJheSFcbiAgICAgICAgICAgIC8vICAgICAvLyBFeGFtcGxlczpcbiAgICAgICAgICAgIC8vICAgICAvLyAgLSBcInBmaWx0ZXIsZXhhY3QsYm9va3MsQU5EXCJcbiAgICAgICAgICAgIC8vICAgICAvLyAgLSBbXCJsYW5nLGV4YWN0LG5vcixBTkRcIiwgXCJwZmlsdGVyLGV4YWN0LGJvb2tzLEFORFwiLCBcImNyZWF0aW9uZGF0ZSxleGFjdCwxLVlFQVIsQU5EXCJdXG4gICAgICAgICAgICAvLyAgICAgcGZpbHRlcjogdG9QYXJhbXMucGZpbHRlcixcblxuICAgICAgICAgICAgLy8gICAgIC8vIEZhY2V0c1xuICAgICAgICAgICAgLy8gICAgIC8vIENhbiBiZSBlaXRoZXIgYSBzdHJpbmcgb3IgYW4gYXJyYXkhXG4gICAgICAgICAgICAvLyAgICAgLy8gRXhhbXBsZXM6XG4gICAgICAgICAgICAvLyAgICAgLy8gIC0gXCJsb2NhbDQsaW5jbHVkZSxOQlwiXG4gICAgICAgICAgICAvLyAgICAgLy8gIC0gW1wibG9jYWw0LGluY2x1ZGUsTkJcIiwgXCJsb2NhbDEwLGluY2x1ZGUsNjQxLjVcIiwgXCJsb2NhbDE0LGluY2x1ZGUsTWF0b3Bwc2tyaWZ0ZXJcIl1cbiAgICAgICAgICAgIC8vICAgICBmYWNldDogdG9QYXJhbXMuZmFjZXQsXG4gICAgICAgICAgICAvLyAgIH07XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogSW50ZXJuYWwgbWV0aG9kc1xuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgaXNMb2dnZWRJbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZXJTZXNzaW9uTWFuYWdlclNlcnZpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gISF0aGlzLnVzZXJTZXNzaW9uTWFuYWdlclNlcnZpY2UuZ2V0VXNlck5hbWUoKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0VXNlckxhbmd1YWdlKCkge1xuICAgICAgICBpZiAoIXRoaXMudXNlclNlc3Npb25NYW5hZ2VyU2VydmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFuZztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJTZXNzaW9uTWFuYWdlclNlcnZpY2UuZ2V0VXNlckxhbmd1YWdlKCk7XG4gICAgfVxuXG4gICAgc2ltcGxpZnlSZWNvcmQocmVjb3JkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogICAgICAgICAgZ2V0KHJlY29yZCwgJ3BueC5jb250cm9sLnJlY29yZGlkLjAnKSxcbiAgICAgICAgICAgIGlzX2xvY2FsOiAgICBnZXQocmVjb3JkLCAnY29udGV4dCcpID09ICdMJyxcbiAgICAgICAgICAgIGFkZHNfaWQ6ICAgICBnZXQocmVjb3JkLCAncG54LmNvbnRyb2wuYWRkc3JjcmVjb3JkaWQuMCcpLFxuICAgICAgICAgICAgc291cmNlOiAgICAgIGdldChyZWNvcmQsICdwbnguY29udHJvbC5zb3VyY2VzeXN0ZW0uMCcpLFxuICAgICAgICAgICAgZGRjOiAgICAgICAgIHVuaXEoZ2V0KHJlY29yZCwgJ3BueC5mYWNldHMubGZjMTAnLCBbXSkpLFxuICAgICAgICAgICAgaHVtZTogICAgICAgIHVuaXEoZ2V0KHJlY29yZCwgJ3BueC5mYWNldHMubGZjMTQnLCBbXSkpLFxuICAgICAgICAgICAgcmVhbDogICAgICAgIHVuaXEoZ2V0KHJlY29yZCwgJ3BueC5mYWNldHMubGZjMjAnLCBbXSkpLFxuICAgICAgICAgICAgcnNyY3R5cGU6ICAgIGdldChyZWNvcmQsICdwbnguZmFjZXRzLnJzcmN0eXBlJywgW10pLFxuICAgICAgICAgICAgZGlzcHR5cGU6ICAgIGdldChyZWNvcmQsICdwbnguZGlzcGxheS50eXBlLjAnKSxcbiAgICAgICAgICAgIHRpdGxlOiAgICAgICBnZXQocmVjb3JkLCAncG54LmRpc3BsYXkudGl0bGUuMCcpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdHJhY2tFdmVudChhY3Rpb24sIGRhdGEpIHtcbiAgICAgICAgbGV0IHNpemUgPSBKU09OLnN0cmluZ2lmeShkYXRhKS5sZW5ndGg7XG4gICAgICAgIHRoaXMubG9nKGAlY1RyYWNrIFwiJHthY3Rpb259XCIgYWN0aW9uICgke3NpemV9IGJ5dGVzKWAsICdiYWNrZ3JvdW5kOiBncmVlbjsgY29sb3I6IHdoaXRlOyBkaXNwbGF5OiBibG9jazsnKTtcbiAgICAgICAgdGhpcy5sb2coJycsIGRhdGEpO1xuXG4gICAgICAgIGRhdGEubGFuZyA9IHRoaXMuZ2V0VXNlckxhbmd1YWdlKCk7XG4gICAgICAgIGRhdGEubG9nZ2VkX2luID0gdGhpcy5pc0xvZ2dlZEluKCk7XG5cbiAgICAgICAgbGV0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICBsYXN0X2FjdGlvbjogdGhpcy5sYXN0QWN0aW9uLFxuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgc2Vzc2lvbl9pZDogc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnc2x1cnBTZXNzaW9uSWQnKSxcbiAgICAgICAgICAgIHNlc3Npb25fc3RhcnQ6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3NsdXJwU2Vzc2lvblN0YXJ0JyksXG4gICAgICAgICAgICBhY3Rpb25fbm86IHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3NsdXJwQWN0aW9uTm8nKSkgfHwgMSxcbiAgICAgICAgICAgIGhpc3Q6IHdpbmRvdy5oaXN0b3J5Lmxlbmd0aCxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmxhc3RBY3Rpb24gPSBhY3Rpb247XG5cbiAgICAgICAgLy8gRG9uJ3QgdXNlICRodHRwIHNpbmNlIHdlIGRvbid0IHdhbnQgdGhlIFByaW1vIGRlZmF1bHQgaGVhZGVycyBldGMuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKHJlcS5yZWFkeVN0YXRlID09PSBYTUxIdHRwUmVxdWVzdC5ET05FICYmIHJlcS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzID0gSlNPTi5wYXJzZShyZXEucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnc2x1cnBTZXNzaW9uSWQnLCByZXMuc2Vzc2lvbl9pZCk7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3NsdXJwU2Vzc2lvblN0YXJ0JywgcmVzLnNlc3Npb25fc3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdzbHVycEFjdGlvbk5vJywgcmVzLmFjdGlvbl9ubyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlcS5vcGVuKCdQT1NUJywgdGhpcy51cmwpO1xuICAgICAgICAgICAgcmVxLnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0cmFja0Vycm9yKG1zZykge1xuICAgICAgICB0aGlzLmxvZyhgJWMke21zZ31gLCAnYmFja2dyb3VuZDogcmVkOyBjb2xvcjogd2hpdGU7IGRpc3BsYXk6IGJsb2NrOycpO1xuICAgICAgICAvLyBUT0RPOiBBY3R1YWxseSBzZW5kIHNvbWV0aGluZyB0byBzZXJ2ZXJcbiAgICB9XG5cbiAgICB0cmFja1NlYXJjaChzZWFyY2gsIHJlc3VsdCwgcGFnZU5vKSB7XG4gICAgICAgIGlmICghdGhpcy50cmFpbC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoJ091Y2ghJyk7XG4gICAgICAgICAgICAvLyBzb21ldGhpbmcgaXMgd3JvbmdcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdHJhaWxTdGVwID0gdGhpcy50cmFpbFt0aGlzLnRyYWlsLmxlbmd0aCAtIDFdO1xuICAgICAgICBsZXQgZHQgPSBuZXcgRGF0ZSgpIC0gdHJhaWxTdGVwLnRvVGltZTtcbiAgICAgICAgdGhpcy5sb2coYCVjR290IHNlYXJjaCByZXN1bHRzIGFmdGVyIHdhaXRpbmcgJHtkdC8xMDAwLn0gc2Vjc2AsICdiYWNrZ3JvdW5kOiBncmVlbjsgY29sb3I6IHdoaXRlOyBkaXNwbGF5OiBibG9jazsnKTtcbiAgICAgICAgdGhpcy5sb2coJycsIHNlYXJjaCwgcmVzdWx0KTtcblxuICAgICAgICBsZXQgcmVjcyA9IHJlc3VsdC5kYXRhLm1hcCh0aGlzLnNpbXBsaWZ5UmVjb3JkKTtcblxuICAgICAgICBsZXQgZmFjZXRzID0gc2VhcmNoLmZhY2V0cy5tYXAoZmFjZXQgPT4gcGljayhmYWNldCwgW1xuICAgICAgICAgICAgJ25hbWUnLCAgICAgICAgICAgICAgIC8vIGV4OiAnbG9jYWwyMCdcbiAgICAgICAgICAgICd2YWx1ZScsICAgICAgICAgICAgICAvLyBleDogJ0Zpc2tlcidcbiAgICAgICAgICAgICd0eXBlJywgICAgICAgICAgICAgICAvLyBleDogJ2luY2x1ZGUnXG4gICAgICAgICAgICAnbXVsdGlGYWNldEdyb3VwSWQnLCAgLy8gaW50XG4gICAgICAgIF0pKTtcblxuICAgICAgICAvLyAtIE11bHRpcGxlIHF1ZXJ5IHBhcnRzIGFyZSBzcGxpdCBieSBzZW1pY29sb25cbiAgICAgICAgLy8gLSBFYWNoIHBhcnQgY29uc2lzdHMgb2Yge2ZpZWxkfSx7cHJlY2lzaW9ufSx7dGVybX0se29wZXJhdG9yfVxuICAgICAgICAvLyAtIFNlbWljb2xvbnMgYXJlIHN0cmlwcGVkIGZyb20gcXVlcmllcy5cbiAgICAgICAgLy8gLSBDb2xvbnMgYXJlIGluY2x1ZGVkIGFuZCBOT1QgZXNjYXBlZC4gRXhhbXBsZTpcbiAgICAgICAgLy8gICAgICB0aXRsZSxjb250YWlucyxmaXNrZXIsa3JhYmJlcixPUjtjcmVhdG9yLGNvbnRhaW5zLHRvcixOT1Q7YW55LGV4YWN0LGxha3MsQU5EXG4gICAgICAgIC8vIC0gSW4gYWR2YW5jZWQgc2VhcmNoLCB0aGVyZSBpcyBhbHdheXMgYSB0cmFpbGluZyBvcGVyYXRvciwgaW4gc2ltcGxlIHNlYXJjaCBub3QuXG4gICAgICAgIC8vIC0gTWF0ZXJpYWwgdHlwZSwgbGFuZ3VhZ2UgYW5kIGRhdGUgc2VsZWN0ZWQgaW4gYWR2YW5jZWQgc2VhcmNoIGFyZSBpbmNsdWRlZCBhc1xuICAgICAgICAvLyAgIHBhcnQgb2YgdGhlIHF1ZXJ5LCBidXQgcHJlZml4ZWQgd2l0aCBcImZhY2V0X1wiXG5cbiAgICAgICAgbGV0IHF1ZXJ5ID0gW10sIHF1ZXJ5X2ZhY2V0cyA9IFtdO1xuXG4gICAgICAgIHNlYXJjaC5xdWVyeS5zcGxpdCgvOy8pLmZvckVhY2goZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgbGV0IGNvbXAgPSB4LnNwbGl0KC8sLyk7XG4gICAgICAgICAgICBsZXQgcmVzO1xuXG4gICAgICAgICAgICBpZiAoY29tcFtjb21wLmxlbmd0aC0xXS5tYXRjaCgvXig/OkFORHxPUnxOT1QpJC8pKSB7XG4gICAgICAgICAgICAgICAgcmVzID0ge1xuICAgICAgICAgICAgICAgICAgICBvcDogY29tcFtjb21wLmxlbmd0aC0xXSxcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IGNvbXBbMF0sXG4gICAgICAgICAgICAgICAgICAgIHByZWM6IGNvbXBbMV0sXG4gICAgICAgICAgICAgICAgICAgIHRlcm06IGNvbXAuc2xpY2UoMiwgY29tcC5sZW5ndGgtMSkuam9pbignLCcpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgb3A6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBjb21wWzBdLFxuICAgICAgICAgICAgICAgICAgICBwcmVjOiBjb21wWzFdLFxuICAgICAgICAgICAgICAgICAgICB0ZXJtOiBjb21wLnNsaWNlKDIsIGNvbXAubGVuZ3RoKS5qb2luKCcsJyksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXMuZmllbGQubWF0Y2goL15mYWNldF8vKSkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5X2ZhY2V0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IHJlcy5maWVsZCxcbiAgICAgICAgICAgICAgICAgICAgcHJlYzogcmVzLnByZWMsXG4gICAgICAgICAgICAgICAgICAgIHRlcm06IHJlcy50ZXJtLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBxdWVyeS5wdXNoKHJlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSBxdWVyeS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICBxdWVyeVtpXS5vcCA9IHF1ZXJ5W2kgLSAxXS5vcDtcbiAgICAgICAgfVxuICAgICAgICBxdWVyeVswXS5vcCA9IG51bGw7XG5cbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICB0cmFpbFN0ZXA6IHRoaXMudHJhaWwubGVuZ3RoLFxuXG4gICAgICAgICAgICBrZXlwcmVzc2VzOiB0aGlzLmtleXByZXNzZXMsXG4gICAgICAgICAgICBwYXN0ZWQ6IHRoaXMucGFzdGVkLFxuICAgICAgICAgICAgcHJlcFRpbWU6IHRyYWlsU3RlcC50b1RpbWUgLSB0cmFpbFN0ZXAuZnJvbVRpbWUsXG4gICAgICAgICAgICBsb2FkVGltZTogKG5ldyBEYXRlKCkgLSB0cmFpbFN0ZXAudG9UaW1lKSxcbiAgICAgICAgICAgIHZlcnNpb246IHRoaXMucHJpbW9WZXJzaW9uLFxuXG4gICAgICAgICAgICAvLyBTZWFyY2hcbiAgICAgICAgICAgIGFkdmFuY2VkOiBzZWFyY2gubW9kZSA9PSAnYWR2YW5jZWQnLFxuICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgcXVlcnlfZmFjZXRzOiBxdWVyeV9mYWNldHMsXG4gICAgICAgICAgICBzY29wZTogc2VhcmNoLnNjb3BlLCAgICAvLyBUcmVuZ2VyIHZpIGLDpWRlIHNjb3BlIG9nIHRhYj9cbiAgICAgICAgICAgIHNvcnQ6IHNlYXJjaC5zb3J0YnksXG4gICAgICAgICAgICBmYWNldHM6IGZhY2V0cyxcblxuICAgICAgICAgICAgLy8gUmVzdWx0c1xuICAgICAgICAgICAgZmlyc3Q6IHBhcnNlSW50KHJlc3VsdC5pbmZvLmZpcnN0KSxcbiAgICAgICAgICAgIGxhc3Q6IHBhcnNlSW50KHJlc3VsdC5pbmZvLmxhc3QpLFxuICAgICAgICAgICAgdG90YWw6IHBhcnNlSW50KHJlc3VsdC5pbmZvLnRvdGFsKSxcbiAgICAgICAgICAgIHJlc3VsdHM6IHJlY3MubWFwKCh4KSA9PiB4LmlkKSxcbiAgICAgICAgICAgIHBhZ2Vfbm86IHBhZ2VObyxcblxuICAgICAgICAgICAgYWdnczoge1xuICAgICAgICAgICAgICAgIHJlY29yZHM6IHJlY3MubGVuZ3RoLCAgLy8gZ3JlaXQgw6UgaGEgbGV0dCB0aWxnamVuZ2VsaWcgZm9yIMOlIGt1bm5lIHJlZ25lIHByb3NlbnRlclxuICAgICAgICAgICAgICAgIGlzX2xvY2FsOiByZWNzLmZpbHRlcigoeCkgPT4geC5pc19sb2NhbCkubGVuZ3RoLCAgLy8gZm9yIMOlIHNpIG5vZSBvbSBodm9yIG1hbmdlIGF2IHRyZWZmZW5lIHNvbSBlciByZWxldmFudGUgZm9yIGVtbmVzw7hrP1xuICAgICAgICAgICAgICAgIGhhc19kZXdleTogcmVjcy5maWx0ZXIoKHgpID0+IHguZGRjLmxlbmd0aCkubGVuZ3RoLFxuICAgICAgICAgICAgICAgIGhhc19odW1vcmQ6IHJlY3MuZmlsdGVyKCh4KSA9PiB4Lmh1bWUubGVuZ3RoKS5sZW5ndGgsXG4gICAgICAgICAgICAgICAgaGFzX3J0OiByZWNzLmZpbHRlcigoeCkgPT4geC5yZWFsLmxlbmd0aCkubGVuZ3RoLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyB2YXIgc3VtbWFyeSA9IGAke2RhdGEuc2NvcGV9OiR7ZGF0YS5xdWVyeX06IExvYWRlZCAke2RhdGEucmVzdWx0cy5sZW5ndGh9IG9mICR7ZGF0YS50b3RhbH0gcmVzdWx0cywgb2Ygd2hpY2hcbiAgICAgICAgLy8gICAgICR7ZGF0YS5hZ2dzLmlzX2xvY2FsfSBsb2NhbCAobm9uLVBDSSksICR7ZGF0YS5hZ2dzLmhhc19kZXdleX0gZ290IEREQyxcbiAgICAgICAgLy8gICAgICR7ZGF0YS5hZ2dzLmhhc19odW1vcmR9IGdvdCBIdW1vcmQsICR7ZGF0YS5hZ2dzLmhhc19ydH0gZ290IFJlYWxmYWdzdGVybWVyLmA7XG4gICAgICAgIC8vIFRPRE86IE5vdGlmeSBhcyBldmVudD9cblxuICAgICAgICBsZXQgYWN0aW9uID0gJ3NlYXJjaCc7XG4gICAgICAgIGlmIChnZXQoc2VhcmNoLCAnZmFjZXRzLjAubmFtZScpID09ICdmcmJyZ3JvdXBpZCcpIHtcbiAgICAgICAgICAgIGFjdGlvbiA9ICdleHBhbmRfZnJicl9ncm91cCc7XG4gICAgICAgIH0gZWxzZSBpZiAocGFnZU5vID4gMSkge1xuICAgICAgICAgICAgYWN0aW9uID0gJ2NoYW5nZV9wYWdlJztcbiAgICAgICAgfSBlbHNlIGlmIChmYWNldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSAncmVmaW5lbWVudCc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyYWNrRXZlbnQoYWN0aW9uLCBkYXRhKTtcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIEludGVyZmFjZSBmb3IgcHJtU2VhcmNoQmFyQWZ0ZXJcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIC8vIHB1YmxpY1xuICAgIGluaXRTZWFyY2hCYXIoKSB7XG4gICAgICAgIHRoaXMucGFzdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMua2V5cHJlc3NlcyA9IDA7XG4gICAgfVxuXG4gICAgLy8gcHVibGljXG4gICAgaW5jcktleXByZXNzQ291bnQoKSB7XG4gICAgICAgIHRoaXMua2V5cHJlc3NlcysrO1xuICAgIH1cblxuICAgIC8vIHB1YmxpY1xuICAgIHNldFNlYXJjaFN0YXRlU2VydmljZShzZWFyY2hTdGF0ZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hTdGF0ZVNlcnZpY2UgPSBzZWFyY2hTdGF0ZVNlcnZpY2U7XG4gICAgfVxuXG4gICAgLy8gcHVibGljXG4gICAgc2V0VXNlclNlc3Npb25NYW5hZ2VyU2VydmljZSh1c2VyU2Vzc2lvbk1hbmFnZXJTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMudXNlclNlc3Npb25NYW5hZ2VyU2VydmljZSA9IHVzZXJTZXNzaW9uTWFuYWdlclNlcnZpY2U7XG4gICAgfVxuXG4gICAgLy8gcHVibGljXG4gICAgc2V0UHJpbW9WZXJzaW9uKHZlcnNpb24pIHtcbiAgICAgICAgdGhpcy5wcmltb1ZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIH1cblxuICAgIC8vIHB1YmxpY1xuICAgIHNlYXJjaEJhckVsZW1lbnRQYXN0ZUV2ZW50KCkge1xuICAgICAgICB0aGlzLnBhc3RlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBJbnRlcmZhY2UgZm9yIHBybVNlYXJjaFJlc3VsdExpc3RBZnRlclxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIGNhbGxlZCBmcm9tIHBybVNlYXJjaFJlc3VsdExpc3RBZnRlciB3aGVuIGFueSBudW1iZXIgb2YgcGFnZXNcbiAgICAgKiBhcmUgbG9hZGVkLiBUaGlzIGFsc28gaW5kaWNhdGVzIHRoYXQgc2VhcmNoIHJlc3VsdHMgYXJlIHJlYWR5LlxuICAgICAqL1xuICAgIHNlYXJjaFBhZ2VMb2FkZWQocGFnZXMpIHtcblxuICAgICAgICBpZiAoIXRoaXMuc2VhcmNoU3RhdGVTZXJ2aWNlKSB7XG4gICAgICAgICAgICAvLyBTb21ldGhpbmcgaXMgcmVhbGx5IHdyb25nXG4gICAgICAgICAgICB0aGlzLnRyYWNrRXJyb3IoJ3NlYXJjaFN0YXRlU2VydmljZSBub3QgaW5qZWN0ZWQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaFN0YXRlU2VydmljZS5pc1NlYXJjaEluUHJvZ3Jlc3MoKSkge1xuICAgICAgICAgICAgdGhpcy50cmFja0Vycm9yKCdzZWFyY2hTdGF0ZVNlcnZpY2Ugc2VhcmNoIHN0aWxsIGluIHByb2dyZXNzJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2VhcmNoID0gdGhpcy5zZWFyY2hTdGF0ZVNlcnZpY2UuZ2V0U2VhcmNoT2JqZWN0KCk7XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLnNlYXJjaFN0YXRlU2VydmljZS5nZXRSZXN1bHRPYmplY3QoKTtcblxuICAgICAgICBpZiAoIXNlYXJjaCB8fCAhcmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLnRyYWNrRXJyb3IoJ3NlYXJjaE9iamVjdCBvciByZXN1bHRPYmplY3QgaXMgbWlzc2luZycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmFja1NlYXJjaChzZWFyY2gsIHJlc3VsdCwgcGFnZXMpO1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogSW50ZXJmYWNlIGZvciBwcm1Ob1NlYXJjaFJlc3VsdEFmdGVyXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICBub1Jlc3VsdHNQYWdlTG9hZGVkKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2VhcmNoU3RhdGVTZXJ2aWNlKSB7XG4gICAgICAgICAgICAvLyBTb21ldGhpbmcgaXMgcmVhbGx5IHdyb25nXG4gICAgICAgICAgICB0aGlzLnRyYWNrRXJyb3IoJ3NlYXJjaFN0YXRlU2VydmljZSBub3QgaW5qZWN0ZWQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaFN0YXRlU2VydmljZS5pc1NlYXJjaEluUHJvZ3Jlc3MoKSkge1xuICAgICAgICAgICAgdGhpcy50cmFja0Vycm9yKCdzZWFyY2hTdGF0ZVNlcnZpY2Ugc2VhcmNoIHN0aWxsIGluIHByb2dyZXNzJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2VhcmNoID0gdGhpcy5zZWFyY2hTdGF0ZVNlcnZpY2UuZ2V0U2VhcmNoT2JqZWN0KCk7XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLnNlYXJjaFN0YXRlU2VydmljZS5nZXRSZXN1bHRPYmplY3QoKTtcblxuICAgICAgICBpZiAoIXNlYXJjaCB8fCAhcmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLnRyYWNrRXJyb3IoJ3NlYXJjaE9iamVjdCBvciByZXN1bHRPYmplY3QgaXMgbWlzc2luZycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmFja1NlYXJjaChzZWFyY2gsIHJlc3VsdCk7XG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBJbnRlcmZhY2UgZm9yIHBybUZ1bGxWaWV3QWZ0ZXJcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIHRyYWNrVmlld1JlY29yZChyZWNvcmQpIHtcbiAgICAgICAgdGhpcy5sb2coJ1ZpZXcgcmVjb3JkJywgcmVjb3JkKTtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnNpbXBsaWZ5UmVjb3JkKHJlY29yZCk7XG4gICAgICAgIHRoaXMudHJhY2tFdmVudCgndmlld19yZWNvcmQnLCBkYXRhKTtcbiAgICB9XG5cbiAgICBsZWF2ZVZpZXdSZWNvcmQocmVjb3JkKSB7XG4gICAgICAgIHRoaXMubG9nKCdMZWF2ZSByZWNvcmQnLCByZWNvcmQpO1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIGlkOiBnZXQocmVjb3JkLCAncG54LmNvbnRyb2wucmVjb3JkaWQuMCcpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRyYWNrRXZlbnQoJ2xlYXZlX3JlY29yZCcsIGRhdGEpO1xuICAgIH1cblxuICAgIHRyYWNrU2VuZFRvKHNlcnZpY2VOYW1lLCByZWNvcmQpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICBzZXJ2aWNlOiBzZXJ2aWNlTmFtZSxcbiAgICAgICAgICAgIHJlYzogdGhpcy5zaW1wbGlmeVJlY29yZChyZWNvcmQpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRyYWNrRXZlbnQoJ3NlbmRfdG8nLCBkYXRhKTtcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIEludGVyZmFjZSBmb3IgcHJtU2F2ZVRvRmF2b3JpdGVzQnV0dG9uQWZ0ZXJcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIHRyYWNrUGluUmVjb3JkKHJlY29yZCkge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuc2ltcGxpZnlSZWNvcmQocmVjb3JkKTtcbiAgICAgICAgdGhpcy50cmFja0V2ZW50KCdwaW5fcmVjb3JkJywgZGF0YSk7XG4gICAgfVxuXG4gICAgdHJhY2tVbnBpblJlY29yZChyZWNvcmQpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnNpbXBsaWZ5UmVjb3JkKHJlY29yZCk7XG4gICAgICAgIHRoaXMudHJhY2tFdmVudCgndW5waW5fcmVjb3JkJywgZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBJbnRlcmZhY2UgZm9yIHBybVNlYXJjaEFmdGVyXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICB0cmFja0hvbWUoKSB7XG4gICAgICAgIHRoaXMudHJhY2tFdmVudCgnZ290b19ob21lJywge30pO1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogSW50ZXJmYWNlIGZvciBwcm1Ccm93c2VTZWFyY2hBZnRlclxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgdHJhY2tCcm93c2UoZGF0YSkge1xuICAgICAgICB0aGlzLnRyYWNrRXZlbnQoJ2Jyb3dzZScsIGRhdGEpO1xuICAgIH1cblxufVxuXG5Mb2dnaW5nU2VydmljZS4kaW5qZWN0ID0gWyckcm9vdFNjb3BlJ107XG5cbmV4cG9ydCBkZWZhdWx0IExvZ2dpbmdTZXJ2aWNlO1xuIiwiaW1wb3J0IHZpZXdOYW1lIGZyb20gJy4vdmlld05hbWUnO1xuaW1wb3J0IExvZ2dpbmdTZXJ2aWNlIGZyb20gJy4vbG9nZ2luZy5zZXJ2aWNlJztcblxuaW1wb3J0IHBybUFjdGlvbkxpc3RBZnRlciBmcm9tICcuL3BybUFjdGlvbkxpc3RBZnRlci5jb21wb25lbnQnO1xuaW1wb3J0IHBybUJyaWVmUmVzdWx0Q29udGFpbmVyQWZ0ZXIgZnJvbSAnLi9wcm1CcmllZlJlc3VsdENvbnRhaW5lckFmdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgcHJtQnJvd3NlU2VhcmNoQWZ0ZXIgZnJvbSAnLi9wcm1Ccm93c2VTZWFyY2hBZnRlci5jb21wb25lbnQnO1xuaW1wb3J0IHBybUZ1bGxWaWV3QWZ0ZXIgZnJvbSAnLi9wcm1GdWxsVmlld0FmdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgcHJtTm9TZWFyY2hSZXN1bHRBZnRlciBmcm9tICcuL3BybU5vU2VhcmNoUmVzdWx0QWZ0ZXIuY29tcG9uZW50JztcbmltcG9ydCBwcm1TYXZlVG9GYXZvcml0ZXNCdXR0b25BZnRlckNvbXBvbmVudCBmcm9tICcuL3BybVNhdmVUb0Zhdm9yaXRlc0J1dHRvbkFmdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgcHJtU2VhcmNoQWZ0ZXJDb21wb25lbnQgZnJvbSAnLi9wcm1TZWFyY2hBZnRlci5jb21wb25lbnQnO1xuaW1wb3J0IHBybVNlYXJjaEJhckFmdGVyQ29uZmlnIGZyb20gJy4vcHJtU2VhcmNoQmFyQWZ0ZXIuY29tcG9uZW50JztcbmltcG9ydCBwcm1TZWFyY2hSZXN1bHRMaXN0QWZ0ZXIgZnJvbSAnLi9wcm1TZWFyY2hSZXN1bHRMaXN0QWZ0ZXIuY29tcG9uZW50JztcbmltcG9ydCBwcm1TaWxlbnRMb2dpbkFmdGVyQ29tcG9uZW50IGZyb20gJy4vcHJtU2lsZW50TG9naW5BZnRlci5jb21wb25lbnQnO1xuXG5cbmNvbnN0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd2aWV3Q3VzdG9tJywgWydhbmd1bGFyTG9hZCddKTtcblxuYXBwLnNlcnZpY2UoJ2xvZ2dpbmdTZXJ2aWNlJywgTG9nZ2luZ1NlcnZpY2UpO1xuXG4vLyBTZWFyY2hCYXI6IFRoZSBzZWFyY2ggZm9ybSBhdCB0aGUgdG9wIG9mIHRoZSBwYWdlLiBOb3QgcmVsb2FkZWQgb24gbm9ybWFsIHBhZ2UgY2hhbmdlcy5cbmFwcC5jb21wb25lbnQoJ3BybVNlYXJjaEJhckFmdGVyJywgcHJtU2VhcmNoQmFyQWZ0ZXJDb25maWcpO1xuXG4vLyBTZWFyY2hBZnRlcjogRXZlcnl0aGluZyBiZWxvdyB0aGUgc2VhcmNoYmFyLiBSZWxvYWRlZCBvbiBub3JtYWwgcGFnZSBjaGFuZ2VzXG5hcHAuY29tcG9uZW50KCdwcm1TZWFyY2hBZnRlcicsIHBybVNlYXJjaEFmdGVyQ29tcG9uZW50KTtcblxuLy8gQnJvd3NlU2VhcmNoQWZ0ZXI6IEV2ZXJ5dGhpbmcgYmVsb3cgdGhlIHNlYXJjaGJhciBmb3IgYnJvd3NlIHBhZ2VzLiBSZWxvYWRlZCBvbiBub3JtYWwgcGFnZSBjaGFuZ2VzXG5hcHAuY29tcG9uZW50KCdwcm1Ccm93c2VTZWFyY2hBZnRlcicsIHBybUJyb3dzZVNlYXJjaEFmdGVyKTtcblxuLy8gU2VhcmNoUmVzdWx0TGlzdDogVGhlIGxpc3Qgb2Ygc2VhcmNoIHJlc3VsdHMsIHJlcGVhdGVkIGZvciBlYWNoIHNlYXJjaCBwYWdlXG5hcHAuY29tcG9uZW50KCdwcm1TZWFyY2hSZXN1bHRMaXN0QWZ0ZXInLCBwcm1TZWFyY2hSZXN1bHRMaXN0QWZ0ZXIpO1xuXG4vLyBOb1NlYXJjaFJlc3VsdDogSWYgYSBzZWFyY2ggeWllbGRzIHplcm8gcmVzdWx0cywgd2UgZ2V0IHRoaXMgaW5zdGVhZCBvZiBTZWFyY2hSZXN1bHRMaXN0XG5hcHAuY29tcG9uZW50KCdwcm1Ob1NlYXJjaFJlc3VsdEFmdGVyJywgcHJtTm9TZWFyY2hSZXN1bHRBZnRlcik7XG5cbi8vIEJyaWVmUmVzdWx0Q29udGFpbmVyOiBFYWNoIHNlYXJjaCByZXN1bHQgaW4gdGhlIHJlc3VsdHMgbGlzdFxuYXBwLmNvbXBvbmVudCgncHJtQnJpZWZSZXN1bHRDb250YWluZXJBZnRlcicsIHBybUJyaWVmUmVzdWx0Q29udGFpbmVyQWZ0ZXIpO1xuXG4vLyBGdWxsVmlldzogVGhlIGRldGFpbHMgdmlldyBmb3IgYSBzaW5nbGUgcmVjb3JkXG5hcHAuY29tcG9uZW50KCdwcm1GdWxsVmlld0FmdGVyJywgcHJtRnVsbFZpZXdBZnRlcik7XG5cbi8vIEFjdGlvbkxpc3Q6IFRoZSBhY3Rpb24gYnV0dG9uIGJhcjogRS1tYWlsLCBDaXRlLCBQZXJtYWxpbmssIEVuZG5vdGUgZXhwb3J0IGV0Yy5cbmFwcC5jb21wb25lbnQoJ3BybUFjdGlvbkxpc3RBZnRlcicsIHBybUFjdGlvbkxpc3RBZnRlcik7XG5cbi8vIFNhdmVUb0Zhdm9yaXRlc0J1dHRvbjogVGhlIFwicGluIHJlY29yZFwiIGJ1dHRvbiwgdGhpcyBpcyBmb3VuZCBpbiBtdWx0aXBsZSBwbGFjZXNcbmFwcC5jb21wb25lbnQoJ3BybVNhdmVUb0Zhdm9yaXRlc0J1dHRvbkFmdGVyJywgcHJtU2F2ZVRvRmF2b3JpdGVzQnV0dG9uQWZ0ZXJDb21wb25lbnQpO1xuXG4vLyBTaWxlbnRMb2dpbjogQ29tcG9uZW50IG91dHNpZGUgdGhlIHJvb3QgdWlWaWV3LlxuYXBwLmNvbXBvbmVudCgncHJtU2lsZW50TG9naW5BZnRlcicsIHBybVNpbGVudExvZ2luQWZ0ZXJDb21wb25lbnQpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5hcHAucnVuKFsnJHJvb3RTY29wZScsICdsb2dnaW5nU2VydmljZScsICgkcm9vdFNjb3BlLCBsb2dnaW5nU2VydmljZSkgPT4ge1xuICAgIC8vIFdBUk5JTkc6IFRoaXMgbWlnaHQgbm90IGJlIGNhbGxlZCBpZiBQcmltbyBlcnJvcnMuLlxuICAgIC8vIENvbXBvbmVudHMgbWF5IHN0aWxsIGJlIGluaXRpYWxpemVkXG4gICAgJHJvb3RTY29wZS52aWV3TmFtZSA9IHZpZXdOYW1lO1xufV0pO1xuIiwiXG5jbGFzcyBQcm1BY3Rpb25MaXN0QWZ0ZXJDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihsb2dnaW5nU2VydmljZSwgJGRvY3VtZW50LCAkZWxlbWVudCkge1xuICAgICAgICAvLyBOb3RlOiBhY3Rpb24gbGlzdCBjYW4gYmUgcGFydCBvZiByZXN1bHRzIGxpc3QgT1IgcmVjb3JkIHZpZXcuXG4gICAgICAgICRkb2N1bWVudC5yZWFkeSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcGFyZW50RWxlbWVudCA9ICRlbGVtZW50LnBhcmVudCgpWzBdO1xuICAgICAgICAgICAgbGV0IGJ0bnMgPSBhbmd1bGFyLmVsZW1lbnQocGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjc2Nyb2xsQWN0aW9uTGlzdCBidXR0b24nKSk7XG5cbiAgICAgICAgICAgIGlmICghYnRucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvcjogTm8gYWN0aW9uIGJ1dHRvbnMgZm91bmQhJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJ0bnMub24oJ2NsaWNrJywgKGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBzZW5kVG9UeXBlID0gZXZ0LmN1cnJlbnRUYXJnZXQucXVlcnlTZWxlY3RvckFsbCgnLmJ1dHRvbi10ZXh0JylbMF0uZ2V0QXR0cmlidXRlKCd0cmFuc2xhdGUnKTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMucGFyZW50Q3RybC5pdGVtLnNwbGl0KCcuJykucG9wKCk7XG4gICAgICAgICAgICAgICAgbG9nZ2luZ1NlcnZpY2UudHJhY2tTZW5kVG8oc2VuZFRvVHlwZSwgaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5Qcm1BY3Rpb25MaXN0QWZ0ZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJ2xvZ2dpbmdTZXJ2aWNlJywgJyRkb2N1bWVudCcsICckZWxlbWVudCddO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYmluZGluZ3M6IHtwYXJlbnRDdHJsOiAnPCd9LFxuICAgIGNvbnRyb2xsZXI6IFBybUFjdGlvbkxpc3RBZnRlckNvbnRyb2xsZXIsXG4gICAgdGVtcGxhdGU6ICcnLFxufTtcbiIsIlxuY2xhc3MgUHJtQnJpZWZSZXN1bHRDb250YWluZXJBZnRlckNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKCRzY29wZSkge1xuICAgICAgICBsZXQgaXRlbSA9IHRoaXMucGFyZW50Q3RybC5pdGVtO1xuICAgICAgICAvKmNvbnNvbGUubG9nKCdicmllZiByZXN1bHQnLCB0aGlzLnBhcmVudEN0cmwuaXRlbS5wbngpO1xuXG4gICAgICAgIGxldCBzdWJqZWN0cyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5wYXJlbnRDdHJsLml0ZW0ucG54LmJyb3dzZSAmJiB0aGlzLnBhcmVudEN0cmwuaXRlbS5wbnguYnJvd3NlLnN1YmplY3QpIHtcbiAgICAgICAgICAgIHN1YmplY3RzID0gdGhpcy5wYXJlbnRDdHJsLml0ZW0ucG54LmJyb3dzZS5zdWJqZWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgc3ViamVjdHMgPSBzdWJqZWN0cy5tYXAoKHN1YikgPT4ge1xuICAgICAgICAgICAgbGV0IG91dCA9IHt9O1xuICAgICAgICAgICAgc3ViLnJlcGxhY2UoL15cXCRcXCQvLCAnJywgc3ViKS5zcGxpdCgnJCQnKS5mb3JFYWNoKCh4KSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0W3guc3Vic3RyKDAsIDEpXSA9IHguc3Vic3RyKDEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgbm91Ym9tbiA9IHN1YmplY3RzLmZpbHRlcigoc3ViKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3ViLlQgPT0gJ05PVUJPTU4nICYmIHN1Yi5QICE9ICdOJztcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBodW1vcmQgPSBzdWJqZWN0cy5maWx0ZXIoKHN1YikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHN1Yi5UID09ICdIVU1PUkQnICYmIHN1Yi5QICE9ICdOJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmRkYyA9IHRoaXMucGFyZW50Q3RybC5pdGVtLnBueC5kaXNwbGF5LmxkczEwO1xuICAgICAgICAkc2NvcGUuaHVtb3JkID0gaHVtb3JkO1xuICAgICAgICAkc2NvcGUubm91Ym9tbiA9IG5vdWJvbW47XG4gICAgICAgICovXG4gICAgfVxufVxuXG5Qcm1CcmllZlJlc3VsdENvbnRhaW5lckFmdGVyQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnXTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGJpbmRpbmdzOiB7cGFyZW50Q3RybDogJzwnfSxcbiAgICBjb250cm9sbGVyOiBQcm1CcmllZlJlc3VsdENvbnRhaW5lckFmdGVyQ29udHJvbGxlcixcbiAgICAvKlxuICAgIHRlbXBsYXRlOiBgPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IHJpZ2h0OyBmb250LXNpemU6OTAlOyBwYWRkaW5nOjVweDsgY29sb3I6ICMzMzM7IGJhY2tncm91bmQ6ICNlZWU7XCI+XG4gICAgICAgIDxlbT5GbGVyZSBiw7hrZXIgb206PC9lbT5cblxuICAgICAgICA8c3BhbiBuZy1yZXBlYXQ9XCJ4IGluIGRkY1wiPlxuICAgICAgICAgICAgPGEgdWktc3JlZj1cImV4cGxvcmVNYWluLnNlYXJjaCh7cXVlcnk6ICdsc3IxMCxleGFjdCwnICsgeCwgbW9kZTogJ2FkdmFuY2VkJ30pXCI+e3t4fX08L2E+ICZuYnNwO1xuICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgPHNwYW4gbmctaWY9XCJodW1vcmQubGVuZ3RoXCI+XG4gICAgICAgICAgICBIdW1vcmQ6XG4gICAgICAgICAgICA8c3BhbiBuZy1yZXBlYXQ9XCJ4IGluIGh1bW9yZFwiPlxuICAgICAgICAgICAgICAgIDxhIHVpLXNyZWY9XCJleHBsb3JlTWFpbi5zZWFyY2goe3F1ZXJ5OiAnbHNyMTQsZXhhY3QsJyArIHguRCwgbW9kZTogJ2FkdmFuY2VkJ30pXCI+e3t4LkR9fTwvYT4gJm5ic3A7XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cblxuICAgICAgICA8c3BhbiBuZy1pZj1cIm5vdWJvbW4ubGVuZ3RoXCI+XG4gICAgICAgICAgICBSZWFsZmFnc3Rlcm1lcjpcbiAgICAgICAgICAgIDxzcGFuIG5nLXJlcGVhdD1cInggaW4gbm91Ym9tblwiPlxuICAgICAgICAgICAgICAgIDxhIHVpLXNyZWY9XCJleHBsb3JlTWFpbi5zZWFyY2goe3F1ZXJ5OiAnbHNyMjAsZXhhY3QsJyArIHguRCwgbW9kZTogJ2FkdmFuY2VkJ30pXCI+e3t4LkR9fTwvYT4gJm5ic3A7XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5gLCovXG59O1xuIiwiaW1wb3J0IGdldCBmcm9tICdsb2Rhc2gvZ2V0JztcblxuY2xhc3MgUHJtQnJvd3NlU2VhcmNoQWZ0ZXJDb250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgJHdpbmRvdywgJGVsZW1lbnQsICR0aW1lb3V0LCAkZG9jdW1lbnQsICRyb290U2NvcGUsIGxvZ2dpbmdTZXJ2aWNlKSB7XG4gICAgICAgICRkb2N1bWVudC5yZWFkeSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBpbnB1dDogdGhpcy5wYXJlbnRDdHJsLmJyb3dzZVNlYXJjaEJhclNlcnZpY2Uuc2VhcmNoQmFySW5wdXQsXG4gICAgICAgICAgICAgICAgc2NvcGU6IHRoaXMucGFyZW50Q3RybC5icm93c2VTZWFyY2hTZXJ2aWNlLnNlYXJjaGVkU2NvcGUsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbG9nZ2luZ1NlcnZpY2UudHJhY2tCcm93c2UoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuUHJtQnJvd3NlU2VhcmNoQWZ0ZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckd2luZG93JywgJyRlbGVtZW50JywgJyR0aW1lb3V0JywgJyRkb2N1bWVudCcsICckcm9vdFNjb3BlJywgJ2xvZ2dpbmdTZXJ2aWNlJ107XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICAvLyBUaGUgPCBzeW1ib2wgZGVub3RlcyBvbmUtd2F5IGJpbmRpbmdzIHdoaWNoIGFyZSBhdmFpbGFibGUgc2luY2UgMS41LlxuICAgIGJpbmRpbmdzOiB7cGFyZW50Q3RybDogJzwnfSxcbiAgICBjb250cm9sbGVyOiBQcm1Ccm93c2VTZWFyY2hBZnRlckNvbnRyb2xsZXIsXG4gICAgdGVtcGxhdGU6ICcnLFxufTtcbiIsIlxuY2xhc3MgUHJtRnVsbFZpZXdBZnRlckNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGxvZ2dpbmdTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UgPSBsb2dnaW5nU2VydmljZTtcbiAgICAgICAgdGhpcy5pdGVtID0gdGhpcy5wYXJlbnRDdHJsLml0ZW07XG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UudHJhY2tWaWV3UmVjb3JkKHRoaXMuaXRlbSk7XG4gICAgfVxuXG4gICAgJG9uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sZWF2ZVZpZXdSZWNvcmQodGhpcy5pdGVtKTtcbiAgICB9XG59XG5cblBybUZ1bGxWaWV3QWZ0ZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJ2xvZ2dpbmdTZXJ2aWNlJ107XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBiaW5kaW5nczoge3BhcmVudEN0cmw6ICc8J30sXG4gICAgY29udHJvbGxlcjogUHJtRnVsbFZpZXdBZnRlckNvbnRyb2xsZXIsXG4gICAgdGVtcGxhdGU6ICcnLFxufTtcbiIsIi8qKlxuICogQWRvcHRlZCBmcm9tIGEgdmVyc2lvbiBieSBAU2FyYWhadW1cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9TYXJhaFp1bS9wcmltby1leHBsb3JlLWN1c3RvbS1uby1yZXN1bHRzXG4gKi9cblxuY2xhc3MgUHJtTm9TZWFyY2hSZXN1bHRBZnRlckNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGxvZ2dpbmdTZXJ2aWNlKSB7XG4gICAgICAgIGxvZ2dpbmdTZXJ2aWNlLm5vUmVzdWx0c1BhZ2VMb2FkZWQoKTtcblxuICAgICAgICAvLyB2YXIgdm0gPSB0aGlzO1xuICAgICAgICAvLyB2bS5wY2lTZXR0aW5nID0gdm0ucGFyZW50Q3RybC5zZWFyY2hTdGF0ZVNlcnZpY2Uuc2VhcmNoT2JqZWN0LnBjQXZhaWxhYmlsaXR5IHx8ICcnO1xuICAgICAgICAvLyBjb25kb2xlLmxvZyh2bS5wYXJlbnRDdHJsLnNlYXJjaFN0YXRlU2VydmljZS5zZWFyY2hPYmplY3QpO1xuICAgICAgICAvLyB2bS5nZXRTZWFyY2hUZXJtID0gZnVuY3Rpb24gZ2V0U2VhcmNoVGVybSgpIHtcbiAgICAgICAgLy8gICByZXR1cm4gdm0ucGFyZW50Q3RybC50ZXJtO1xuICAgICAgICAvLyB9O1xuICAgIH1cbn1cblxuUHJtTm9TZWFyY2hSZXN1bHRBZnRlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnbG9nZ2luZ1NlcnZpY2UnXTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGJpbmRpbmdzOiB7cGFyZW50Q3RybDogJzwnfSxcbiAgICBjb250cm9sbGVyOiBQcm1Ob1NlYXJjaFJlc3VsdEFmdGVyQ29udHJvbGxlcixcbiAgICB0ZW1wbGF0ZTogJycsXG59O1xuXG4vLyBleHBvcnQgZGVmYXVsdCB7XG4vLyAgIGJpbmRpbmdzOiB7cGFyZW50Q3RybDogJzwnfSxcbi8vICAgY29udHJvbGxlcjogUHJtTm9TZWFyY2hSZXN1bHRBZnRlckNvbnRyb2xsZXIsXG4vLyAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbi8vICAgdGVtcGxhdGU6IGBcbi8vICAgICA8bWQtY2FyZCBjbGFzcz1cImRlZmF1bHQtY2FyZCB6ZXJvLW1hcmdpbiBfbWQgbWQtcHJpbW9FeHBsb3JlLXRoZW1lXCI+XG4vLyAgICAgPG1kLWNhcmQtdGl0bGU+XG4vLyAgICAgICA8bWQtY2FyZC10aXRsZS10ZXh0PlxuLy8gICAgICAgICA8c3BhbiB0cmFuc2xhdGU9XCJcIiBjbGFzcz1cIm1kLWhlYWRsaW5lIG5nLXNjb3BlXCI+Tm8gcmVjb3JkcyBmb3VuZDwvc3Bhbj5cbi8vICAgICAgIDwvbWQtY2FyZC10aXRsZS10ZXh0PlxuLy8gICAgIDwvbWQtY2FyZC10aXRsZT5cbi8vICAgICA8bWQtY2FyZC1jb250ZW50PlxuLy8gICAgICAgPHA+XG4vLyAgICAgICAgIDxzcGFuPlRoZXJlIGFyZSBubyByZXN1bHRzIG1hdGNoaW5nIHlvdXIgc2VhcmNoOjxibG9ja3F1b3RlPlxuLy8gICAgICAgICAgIDxpPnt7JGN0cmwuZ2V0U2VhcmNoVGVybSgpfX08L2k+LjwvYmxvY2txdW90ZT5cbi8vICAgICAgICAgICA8ZGl2IG5nLWlmPVwiJGN0cmwucGNpU2V0dGluZyAhPT0gXFwndHJ1ZVxcJ1wiPlxuLy8gICAgICAgICAgICAgPGEgaHJlZj1cIi9wcmltby1leHBsb3JlL3NlYXJjaD9xdWVyeT1hbnksY29udGFpbnMse3skY3RybC5nZXRTZWFyY2hUZXJtKCl9fSZ0YWI9ZGVmYXVsdF90YWImc2VhcmNoX3Njb3BlPUV2ZXJ5dGhpbmcmdmlkPTAxQlJDX1NPQyZvZmZzZXQ9MCZzb3J0Ynk9cmFuayZwY0F2YWlsYWJpbGl0eT10cnVlXCI+XG4vLyAgICAgICAgICAgICAgIDxiPlRyeSBhZ2FpbiBzZWFyY2hpbmcgaXRlbXMgaGVsZCBhdCBvdGhlciBsaWJyYXJpZXM/PC9iPlxuLy8gICAgICAgICAgICAgPC9hPlxuLy8gICAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgICA8L3NwYW4+XG4vLyAgICAgICA8L3A+XG4vLyAgICAgICA8cD5cbi8vICAgICAgICAgPHNwYW4gdHJhbnNsYXRlPVwiXCIgY2xhc3M9XCJib2xkLXRleHQgbmctc2NvcGVcIj5TdWdnZXN0aW9uczo8L3NwYW4+XG4vLyAgICAgICA8L3A+XG4vLyAgICAgICA8dWw+XG4vLyAgICAgICAgIDxsaSB0cmFuc2xhdGU9XCJcIiBjbGFzcz1cIm5nLXNjb3BlXCI+TWFrZSBzdXJlIHRoYXQgYWxsIHdvcmRzIGFyZSBzcGVsbGVkIGNvcnJlY3RseS48L2xpPlxuLy8gICAgICAgICA8bGkgdHJhbnNsYXRlPVwiXCIgY2xhc3M9XCJuZy1zY29wZVwiPlRyeSBhIGRpZmZlcmVudCBzZWFyY2ggc2NvcGUuPC9saT5cbi8vICAgICAgICAgPGxpIHRyYW5zbGF0ZT1cIlwiIGNsYXNzPVwibmctc2NvcGVcIj5UcnkgZGlmZmVyZW50IHNlYXJjaCB0ZXJtcy48L2xpPlxuLy8gICAgICAgICA8bGkgdHJhbnNsYXRlPVwiXCIgY2xhc3M9XCJuZy1zY29wZVwiPlRyeSBtb3JlIGdlbmVyYWwgc2VhcmNoIHRlcm1zLjwvbGk+XG4vLyAgICAgICAgIDxsaSB0cmFuc2xhdGU9XCJcIiBjbGFzcz1cIm5nLXNjb3BlXCI+VHJ5IGZld2VyIHNlYXJjaCB0ZXJtcy48L2xpPlxuLy8gICAgICAgPC91bD5cbi8vICAgICAgIDxwPlxuLy8gICAgICAgICA8Yj5cbi8vICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9zdG9sYWYub24ud29ybGRjYXQub3JnL3NlYXJjaD9xdWVyeVN0cmluZz1rdzp7eyRjdHJsLmdldFNlYXJjaFRlcm0oKX19JmRhdGFiYXNlTGlzdD0yODNcIj5TZWFyY2ggV29ybGRDYXQ8L2E+XG4vLyAgICAgICAgIDwvYj5cbi8vICAgICAgIDwvcD5cbi8vICAgICAgIDxwPlxuLy8gICAgICAgICA8Yj5cbi8vICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly93d3cuc3RvbGFmLmVkdS9saWJyYXJ5L3Jlc2VhcmNoL3N0dWRlbnRzLmNmbVwiPkNvbnRhY3QgYSBSZXNlYXJjaCBMaWJyYXJpYW4gZm9yIEFzc2lzdGFuY2U8L2E+XG4vLyAgICAgICAgIDwvYj5cbi8vICAgICAgIDwvcD5cbi8vICAgICA8L21kLWNhcmQtY29udGVudD5cbi8vICAgPC9tZC1jYXJkPlxuLy8gICBgXG4vLyB9XG4iLCJcbmNsYXNzIFBybVNhdmVUb0Zhdm9yaXRlc0J1dHRvbkFmdGVyQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3RvcigkdGltZW91dCwgJGVsZW1lbnQsIGxvZ2dpbmdTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlID0gbG9nZ2luZ1NlcnZpY2U7XG4gICAgfVxuXG4gICAgJHBvc3RMaW5rKCkge1xuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGxldCBwYXJlbnRFbGVtZW50ID0gdGhpcy4kZWxlbWVudC5wYXJlbnQoKVswXTtcblxuXG4gICAgICAgICAgICB2YXIgcGluQnRuID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGluLWJ1dHRvbicpLFxuICAgICAgICAgICAgICAgIHVucGluQnRuID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24udW5waW4tYnV0dG9uJyk7XG5cbiAgICAgICAgICAgIC8vIExpbWl0YXRpb246IFRoaXMgd2lsbCBvbmx5IHNhdmUgdGhlIGZpcnN0IGNsaWNrLCBzaW5jZSB0aGVuIHRoZVxuICAgICAgICAgICAgLy8gYnV0dG9uIGlzIHJlcGxhY2VkIHdpdGggYW5vdGhlciBidXR0b24gZWxlbWVudC4gV2UgY291bGQgYWRkIGFcbiAgICAgICAgICAgIC8vIERPTSB3YXRjaGVyLCBidXQgaXQncyBub3Qgd29ydGggaXQgSSB0aGluay5cbiAgICAgICAgICAgIGlmIChwaW5CdG4pIHtcbiAgICAgICAgICAgICAgICBwaW5CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UudHJhY2tQaW5SZWNvcmQodGhpcy5wYXJlbnRDdHJsLml0ZW0pO1xuICAgICAgICAgICAgICAgIH0sIHtwYXNzaXZlOiB0cnVlLCBjYXB0dXJlOiB0cnVlfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHVucGluQnRuKSB7XG4gICAgICAgICAgICAgICAgdW5waW5CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UudHJhY2tVbnBpblJlY29yZCh0aGlzLnBhcmVudEN0cmwuaXRlbSk7XG4gICAgICAgICAgICAgICAgfSwge3Bhc3NpdmU6IHRydWUsIGNhcHR1cmU6IHRydWV9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblBybVNhdmVUb0Zhdm9yaXRlc0J1dHRvbkFmdGVyQ29udHJvbGxlci4kaW5qZWN0ID0gWyckdGltZW91dCcsICckZWxlbWVudCcsICdsb2dnaW5nU2VydmljZSddO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYmluZGluZ3M6IHtwYXJlbnRDdHJsOiAnPCd9LFxuICAgIGNvbnRyb2xsZXI6IFBybVNhdmVUb0Zhdm9yaXRlc0J1dHRvbkFmdGVyQ29udHJvbGxlcixcbiAgICB0ZW1wbGF0ZTogJycsXG59O1xuIiwiY2xhc3MgUHJtU2VhcmNoQWZ0ZXJDb250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgJGNvbXBpbGUsICR0aW1lb3V0LCAkZG9jdW1lbnQsIGxvZ2dpbmdTZXJ2aWNlKSB7XG4gICAgICAgICRkb2N1bWVudC5yZWFkeSgoKSA9PiB7XG4gICAgICAgICAgICAvLyBOb3RlOiBBdCB0aGlzIHBvaW50LCB0aGUgZnJvbnRwYWdlIEhUTUwgdGVtcGxhdGUgbWlnaHQgbm90IHlldCBiZSByZWFkeS5cbiAgICAgICAgICAgIC8vIFdlIHNlZSB0aGlzIHByb2JsZW0gZXNwZWNpYWxseSBpbiBGaXJlZm94IGZvciBzb21lIHJlYXNvbi4gVW50aWwgd2UgZmluZCBhIGJldHRlclxuICAgICAgICAgICAgLy8gd2F5IHRvIGRldGVjdCB3aGVuIHRoZSB0ZW1wbGF0ZSBpcyBsb2FkZWQsIHdlIHVzZSBhIHRpbWVvdXQgb2YgMTAwIG1zZWNzLlxuICAgICAgICAgICAgJHRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBmb290ZXIgPSBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVpby1mb290ZXInKSksXG4gICAgICAgICAgICAgICAgICAgIHBybVNlYXJjaEFmdGVyRWwgPSBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncHJtLXNlYXJjaC1hZnRlcicpKTtcblxuICAgICAgICAgICAgICAgIGlmIChmb290ZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGFyZSBvbiB0aGUgZnJvbnQgcGFnZS4gTW92ZSBmb290ZXIgdG8gb3VyIHNjb3BlIGFuZCBtYWtlIGl0IHZpc2libGVcbiAgICAgICAgICAgICAgICAgICAgcHJtU2VhcmNoQWZ0ZXJFbC5hcHBlbmQoZm9vdGVyLmRldGFjaCgpLmFkZENsYXNzKCd2aXNpYmxlJykpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZm5MaW5rID0gJGNvbXBpbGUoZm9vdGVyKTsgICAgICAvLyByZXR1cm5zIGEgTGluayBmdW5jdGlvbiB1c2VkIHRvIGJpbmQgdGVtcGxhdGUgdG8gdGhlIHNjb3BlXG4gICAgICAgICAgICAgICAgICAgIGZuTGluaygkc2NvcGUpOyAgICAgICAgICAgICAgICAgICAgIC8vIEJpbmQgc2NvcGUgdG8gdGhlIHRlbXBsYXRlXG5cbiAgICAgICAgICAgICAgICAgICAgbG9nZ2luZ1NlcnZpY2UudHJhY2tIb21lKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5Qcm1TZWFyY2hBZnRlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRjb21waWxlJywgJyR0aW1lb3V0JywgJyRkb2N1bWVudCcsICdsb2dnaW5nU2VydmljZSddO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYmluZGluZ3M6IHtwYXJlbnRDdHJsOiAnPCd9LFxuICAgIGNvbnRyb2xsZXI6IFBybVNlYXJjaEFmdGVyQ29udHJvbGxlcixcbiAgICB0ZW1wbGF0ZTogJycsXG59O1xuIiwiaW1wb3J0IGdldCBmcm9tICdsb2Rhc2gvZ2V0JztcblxuY2xhc3MgUHJtU2VhcmNoQmFyQWZ0ZXJDb250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgJHdpbmRvdywgJGVsZW1lbnQsICR0aW1lb3V0LCAkZG9jdW1lbnQsICRyb290U2NvcGUsIGxvZ2dpbmdTZXJ2aWNlKSB7XG5cbiAgICAgICAgbGV0IHByaW1vVmVyc2lvbiA9IGdldCgkd2luZG93LmFwcENvbmZpZywgJ3N5c3RlbS1jb25maWd1cmF0aW9uLlByaW1vX1ZlcnNpb25fTnVtYmVyJywgJ3Vua25vd24nKTtcbiAgICAgICAgbGV0IHNlYXJjaFN0YXRlU2VydmljZSA9IHRoaXMucGFyZW50Q3RybC5zZWFyY2hTZXJ2aWNlLnNlYXJjaFN0YXRlU2VydmljZTtcblxuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UgPSBsb2dnaW5nU2VydmljZTtcblxuICAgICAgICAvLyBJbmplY3QgUHJpbW8ncyBzZWFyY2hTdGF0ZVNlcnZpY2UgaW50byBvdXIgbG9nZ2luZ1NlcnZpY2VcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5zZXRTZWFyY2hTdGF0ZVNlcnZpY2Uoc2VhcmNoU3RhdGVTZXJ2aWNlKTtcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5zZXRQcmltb1ZlcnNpb24ocHJpbW9WZXJzaW9uKTtcblxuICAgICAgICB0aGlzLnBhc3RlRXZlbnRIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLnNlYXJjaEJhckVsZW1lbnRQYXN0ZUV2ZW50KCk7XG4gICAgICAgIH0uYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmlucHV0SGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5pbmNyS2V5cHJlc3NDb3VudCgpO1xuICAgICAgICB9LmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5pbml0U2VhcmNoQmFyKCk7XG4gICAgICAgICRkb2N1bWVudC5yZWFkeSgoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIE5vdGU6IG1haW5TZWFyY2hGaWVsZCBhbHNvIG1hcHMgdG8gdGhlIGZpcnN0IGlucHV0IGZpZWxkIG9uIGFkdmFuY2VkIHNlYXJjaFxuICAgICAgICAgICAgLy8gdGhpcy4kc2NvcGUuJHdhdGNoKCckY3RybC5wYXJlbnRDdHJsLm1haW5TZWFyY2hGaWVsZCcsIChuZXdWYWx1ZSwgb2xkVmFsdWUpID0+IHtcbiAgICAgICAgICAgIC8vICAgICBpZiAobmV3VmFsdWUgIT0gb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5pbmNyS2V5cHJlc3NDb3VudCgpO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH0pO1xuXG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kd2F0Y2goJyRjdHJsLnBhcmVudEN0cmwuYWR2YW5jZWRTZWFyY2gnLCAobmV3VmFsdWUsIG9sZFZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudEVsZW1lbnQgPSB0aGlzLiRlbGVtZW50LnBhcmVudCgpWzBdO1xuICAgICAgICAgICAgICAgIGxldCBzZWFyY2hCYXJFbGVtZW50ID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoQmFyJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBGb2N1cyBvbiB0aGUgc2VhcmNoIGJhciwgaWYgaXQgZXhpc3RzLlxuICAgICAgICAgICAgICAgIC8vIE5vdGUgdGhhdCwgd2hlbiB0aGUgbGFuZ3VhZ2UgaXMgY2hhbmdlZCxcbiAgICAgICAgICAgICAgICAvLyB0aGUgc2VhcmNoIGJhciBpcyBub3QgYXZhaWxhYmxlIHlldCBoZXJlLlxuICAgICAgICAgICAgICAgIC8vIFdlIGNhbiB3YXRjaCBmb3IgdGhlIGVsZW1lbnQgYW5kIHRoZW4gZm9jdXMgb24gaXQsXG4gICAgICAgICAgICAgICAgLy8gYnV0IGl0IGRvZXMgbm90IHNlZW0gdG8gd29ydGggaXQuXG4gICAgICAgICAgICAgICAgaWYgKHNlYXJjaEJhckVsZW1lbnQgJiYgIW9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KCgpID0+IHNlYXJjaEJhckVsZW1lbnQuZm9jdXMoKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0ICRpbnB1dEVsZW1zID0gYW5ndWxhci5lbGVtZW50KHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKSk7XG5cbiAgICAgICAgICAgICAgICAkaW5wdXRFbGVtcy5vZmYoJ3Bhc3RlJywgdGhpcy5wYXN0ZUV2ZW50SGFuZGxlcik7IC8vIFRvIG1ha2Ugc3VyZSB3ZSBkb24ndCBlbmQgdXAgd2l0aCBkb3VibGUgaGFuZGxlcnNcbiAgICAgICAgICAgICAgICAkaW5wdXRFbGVtcy5vbigncGFzdGUnLCB0aGlzLnBhc3RlRXZlbnRIYW5kbGVyKTtcblxuICAgICAgICAgICAgICAgICRpbnB1dEVsZW1zLm9mZignaW5wdXQnLCB0aGlzLmlucHV0SGFuZGxlcik7ICAvLyBUbyBtYWtlIHN1cmUgd2UgZG9uJ3QgZW5kIHVwIHdpdGggZG91YmxlIGhhbmRsZXJzXG4gICAgICAgICAgICAgICAgJGlucHV0RWxlbXMub24oJ2lucHV0JywgdGhpcy5pbnB1dEhhbmRsZXIpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gLy8gQ2FsbGVkIGFmdGVyIHRoaXMgY29udHJvbGxlcidzIGVsZW1lbnQgYW5kIGl0cyBjaGlsZHJlbiBoYXZlIGJlZW4gbGlua2VkLlxuICAgIC8vICRwb3N0TGluaygpIHtcbiAgICAvLyAgICAgLy8gRm9jdXMgaW5wdXQgZmllbGQgb24gbG9hZC4gQWRhcHRlZCBmcm9tIGEgdmVyc2lvbiBieSBAbXVyYXRzZXloYW5cbiAgICAvLyAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0RldC1Lb25nZWxpZ2UtQmlibGlvdGVrL3ByaW1vLWV4cGxvcmUtcmV4L2NvbW1pdC84NjQzMmU2OGUzMTNhNDNkYjFmMDFhM2EyNTE2NTJmODQ5NTJkNWE2XG4gICAgLy8gICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xuICAgIC8vICAgICAgICAgbGV0IHBhcmVudEVsZW1lbnQgPSB0aGlzLiRlbGVtZW50LnBhcmVudCgpO1xuICAgIC8vICAgICAgICAgbGV0IHNlYXJjaEJhckVsZW1lbnQgPSBwYXJlbnRFbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2hCYXInKTtcblxuICAgIC8vICAgICAgICAgLy8gRm9jdXMgb24gdGhlIHNlYXJjaCBiYXIsIGlmIGl0IGV4aXN0cy5cbiAgICAvLyAgICAgICAgIC8vIE5vdGUgdGhhdCwgd2hlbiB0aGUgbGFuZ3VhZ2UgaXMgY2hhbmdlZCxcbiAgICAvLyAgICAgICAgIC8vIHRoZSBzZWFyY2ggYmFyIGlzIG5vdCBhdmFpbGFibGUgeWV0IGhlcmUuXG4gICAgLy8gICAgICAgICAvLyBXZSBjYW4gd2F0Y2ggZm9yIHRoZSBlbGVtZW50IGFuZCB0aGVuIGZvY3VzIG9uIGl0LFxuICAgIC8vICAgICAgICAgLy8gYnV0IGl0IGRvZXMgbm90IHNlZW0gdG8gd29ydGggaXQuXG4gICAgLy8gICAgICAgICBpZiAoc2VhcmNoQmFyRWxlbWVudCkge1xuICAgIC8vICAgICAgICAgICAgIHNlYXJjaEJhckVsZW1lbnQuZm9jdXMoKTtcblxuICAgIC8vICAgICAgICAgICAgIHNlYXJjaEJhckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncGFzdGUnLCAoKSA9PiB7XG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2Uuc2VhcmNoQmFyRWxlbWVudFBhc3RlRXZlbnQoKTtcbiAgICAvLyAgICAgICAgICAgICB9LCB7cGFzc2l2ZTogdHJ1ZSwgY2FwdHVyZTogdHJ1ZX0pO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9LCAwKTtcbiAgICAvLyB9XG5cbiAgICAvLyBDaGFuZ2UgcGxhY2Vob2xkZXIgdGV4dCAobmVlZHMgb3B0aW1pemF0aW9uIEkgdGhpbmspXG4gICAgLy8gYnkgQWxleCBSUzogaHR0cDovL3NlYXJjaC10ZXN0LmxpYnJhcnkuYnJhbmRlaXMuZWR1L3ByaW1vLWV4cGxvcmUvc2VhcmNoP3ZpZD1CUkFORFRFU1RcbiAgICAvLyB2YXIgbXlWYXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbihwYXJlbnRDdHJsKSB7XG4gICAgLy8gICAgIHBhcmVudEN0cmwuX3BsYWNlSG9sZGVyVGV4dCA9IGNhbGN1bGF0ZVBsYWNlSG9sZGVyVGV4dChwYXJlbnRDdHJsLl9zZWxlY3RlZFRhYik7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwicGxhY2Vob2xkZXIgY2hhbmdlZFwiKTtcbiAgICAvLyB9LCAxMDAsIHRoaXMucGFyZW50Q3RybCk7XG5cbiAgICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCBteUludGVydmFsSUQgKSB7XG4gICAgLy8gICAgIGNsZWFySW50ZXJ2YWwobXlJbnRlcnZhbElEKTtcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJwbGFjZWhvbGRlciBpbnRlcnZhbCBjbGVhcmVkXCIpO1xuICAgIC8vIH0sIDUwMDAsIG15VmFyKTtcblxuICAgIC8vICRzY29wZS4kd2F0Y2goXCIkcGFyZW50LiRjdHJsLl9zZWxlY3RlZFRhYlwiLCBmdW5jdGlvbihuZXdUYWIsIG9sZFRhYikge1xuICAgIC8vICAgICAkc2NvcGUuJHBhcmVudC4kY3RybC5fcGxhY2VIb2xkZXJUZXh0ID0gY2FsY3VsYXRlUGxhY2VIb2xkZXJUZXh0KG5ld1RhYik7XG4gICAgLy8gfSk7XG5cbiAgICAvLyBmdW5jdGlvbiBjYWxjdWxhdGVQbGFjZUhvbGRlclRleHQgKG15VGFiKSB7XG4gICAgLy8gICAgIHN3aXRjaCAobXlUYWIpIHtcbiAgICAvLyAgICAgICAgIGNhc2UgXCJwY2lcIjpcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gXCJGaW5kIGFydGljbGVzIGFuZCBvdGhlciBtYXRlcmlhbHMgZnJvbSBzY2hvbGFybHkgam91cm5hbHMsIG5ld3NwYXBlcnMsIGFuZCBvbmxpbmUgY29sbGVjdGlvbnNcIjtcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgICAgIGNhc2UgXCJhbG1hXCI6XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIFwiRmluZCBib29rcywgbW92aWVzLCBtdXNpYywgc2VyaWFscywgZXRjXCI7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICBjYXNlIFwiZXZlcnl0aGluZ1wiOlxuICAgIC8vICAgICAgICAgICAgIHJldHVybiBcIkZpbmQgQUxMIGtpbmRzIG9mIGxpYnJhcnkgcmVzb3VyY2VzIChib29rcywgbW92aWVzLCBqb3VybmFsIGFydGljbGVzLCBldGMpXCI7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICBjYXNlIFwiY291cnNlXCI6XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIFwiRmluZCBib29rcyAmIG1lZGlhIG9uIHJlc2VydmUgZm9yIHlvdXIgY2xhc3MuXCI7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICBkZWZhdWx0OlxuICAgIC8vICAgICAgICAgICAgIHJldHVybiBcInVua25vd24tdGFiIHBsYWNlaG9sZGVyXCI7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG59XG5cblBybVNlYXJjaEJhckFmdGVyQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJHdpbmRvdycsICckZWxlbWVudCcsICckdGltZW91dCcsICckZG9jdW1lbnQnLCAnJHJvb3RTY29wZScsICdsb2dnaW5nU2VydmljZSddO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgLy8gVGhlIDwgc3ltYm9sIGRlbm90ZXMgb25lLXdheSBiaW5kaW5ncyB3aGljaCBhcmUgYXZhaWxhYmxlIHNpbmNlIDEuNS5cbiAgICBiaW5kaW5nczoge3BhcmVudEN0cmw6ICc8J30sXG4gICAgY29udHJvbGxlcjogUHJtU2VhcmNoQmFyQWZ0ZXJDb250cm9sbGVyLFxuICAgIHRlbXBsYXRlOiAnJyxcbn07XG4iLCJpbXBvcnQgZ2V0IGZyb20gJ2xvZGFzaC9nZXQnO1xuXG5jbGFzcyBQcm1TZWFyY2hSZXN1bHRMaXN0QWZ0ZXJDb250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCR3aW5kb3csICRzY29wZSwgbG9nZ2luZ1NlcnZpY2UpIHtcblxuICAgICAgICBsZXQgcHJpbW9WZXJzaW9uID0gZ2V0KCR3aW5kb3cuYXBwQ29uZmlnLCAnc3lzdGVtLWNvbmZpZ3VyYXRpb24uUHJpbW9fVmVyc2lvbl9OdW1iZXInLCAndW5rbm93bicpO1xuICAgICAgICBsZXQgc2VhcmNoU3RhdGVTZXJ2aWNlID0gdGhpcy5wYXJlbnRDdHJsLnNlYXJjaFNlcnZpY2Uuc2VhcmNoU3RhdGVTZXJ2aWNlO1xuXG4gICAgICAgIC8vIEluamVjdCBQcmltbydzIHNlYXJjaFN0YXRlU2VydmljZSBpbnRvIG91ciBsb2dnaW5nU2VydmljZVxuICAgICAgICBsb2dnaW5nU2VydmljZS5zZXRTZWFyY2hTdGF0ZVNlcnZpY2Uoc2VhcmNoU3RhdGVTZXJ2aWNlKTtcbiAgICAgICAgbG9nZ2luZ1NlcnZpY2Uuc2V0UHJpbW9WZXJzaW9uKHByaW1vVmVyc2lvbik7XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnJGN0cmwucGFyZW50Q3RybC5udW1PZkxvYWRlZFBhZ2VzJywgKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsb2dnaW5nU2VydmljZS5zZWFyY2hQYWdlTG9hZGVkKG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5Qcm1TZWFyY2hSZXN1bHRMaXN0QWZ0ZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyR3aW5kb3cnLCAnJHNjb3BlJywgJ2xvZ2dpbmdTZXJ2aWNlJ107XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBiaW5kaW5nczoge3BhcmVudEN0cmw6ICc8J30sXG4gICAgY29udHJvbGxlcjogUHJtU2VhcmNoUmVzdWx0TGlzdEFmdGVyQ29udHJvbGxlcixcbiAgICB0ZW1wbGF0ZTogJycsXG59O1xuIiwiXG5jbGFzcyBQcm1TaWxlbnRMb2dpbkFmdGVyQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IobG9nZ2luZ1NlcnZpY2UpIHtcbiAgICAgICAgbGV0IHVzZXJTZXNzaW9uTWFuYWdlclNlcnZpY2UgPSB0aGlzLnBhcmVudEN0cmwudXNlclNlc3Npb25NYW5hZ2VyU2VydmljZTtcbiAgICAgICAgbG9nZ2luZ1NlcnZpY2Uuc2V0VXNlclNlc3Npb25NYW5hZ2VyU2VydmljZSh1c2VyU2Vzc2lvbk1hbmFnZXJTZXJ2aWNlKTtcbiAgICB9XG59XG5cblBybVNpbGVudExvZ2luQWZ0ZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJ2xvZ2dpbmdTZXJ2aWNlJ107XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBiaW5kaW5nczoge3BhcmVudEN0cmw6ICc8J30sXG4gICAgY29udHJvbGxlcjogUHJtU2lsZW50TG9naW5BZnRlckNvbnRyb2xsZXIsXG4gICAgdGVtcGxhdGU6ICcnLFxufTtcbiIsIi8vIERlZmluZSB0aGUgdmlldyBuYW1lIGhlcmUuXG5jb25zdCB2aWV3TmFtZSA9ICdVSU8nO1xuZXhwb3J0IGRlZmF1bHQgdmlld05hbWU7XG4iLCJ2YXIgaGFzaENsZWFyID0gcmVxdWlyZSgnLi9faGFzaENsZWFyJyksXG4gICAgaGFzaERlbGV0ZSA9IHJlcXVpcmUoJy4vX2hhc2hEZWxldGUnKSxcbiAgICBoYXNoR2V0ID0gcmVxdWlyZSgnLi9faGFzaEdldCcpLFxuICAgIGhhc2hIYXMgPSByZXF1aXJlKCcuL19oYXNoSGFzJyksXG4gICAgaGFzaFNldCA9IHJlcXVpcmUoJy4vX2hhc2hTZXQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgSGFzaGAuXG5IYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbkhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG5IYXNoLnByb3RvdHlwZS5nZXQgPSBoYXNoR2V0O1xuSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbkhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gSGFzaDtcbiIsInZhciBsaXN0Q2FjaGVDbGVhciA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZUNsZWFyJyksXG4gICAgbGlzdENhY2hlRGVsZXRlID0gcmVxdWlyZSgnLi9fbGlzdENhY2hlRGVsZXRlJyksXG4gICAgbGlzdENhY2hlR2V0ID0gcmVxdWlyZSgnLi9fbGlzdENhY2hlR2V0JyksXG4gICAgbGlzdENhY2hlSGFzID0gcmVxdWlyZSgnLi9fbGlzdENhY2hlSGFzJyksXG4gICAgbGlzdENhY2hlU2V0ID0gcmVxdWlyZSgnLi9fbGlzdENhY2hlU2V0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBsaXN0IGNhY2hlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTGlzdENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID09IG51bGwgPyAwIDogZW50cmllcy5sZW5ndGg7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxubW9kdWxlLmV4cG9ydHMgPSBMaXN0Q2FjaGU7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwO1xuIiwidmFyIG1hcENhY2hlQ2xlYXIgPSByZXF1aXJlKCcuL19tYXBDYWNoZUNsZWFyJyksXG4gICAgbWFwQ2FjaGVEZWxldGUgPSByZXF1aXJlKCcuL19tYXBDYWNoZURlbGV0ZScpLFxuICAgIG1hcENhY2hlR2V0ID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVHZXQnKSxcbiAgICBtYXBDYWNoZUhhcyA9IHJlcXVpcmUoJy4vX21hcENhY2hlSGFzJyksXG4gICAgbWFwQ2FjaGVTZXQgPSByZXF1aXJlKCcuL19tYXBDYWNoZVNldCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxubW9kdWxlLmV4cG9ydHMgPSBNYXBDYWNoZTtcbiIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgU2V0ID0gZ2V0TmF0aXZlKHJvb3QsICdTZXQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZXQ7XG4iLCJ2YXIgTWFwQ2FjaGUgPSByZXF1aXJlKCcuL19NYXBDYWNoZScpLFxuICAgIHNldENhY2hlQWRkID0gcmVxdWlyZSgnLi9fc2V0Q2FjaGVBZGQnKSxcbiAgICBzZXRDYWNoZUhhcyA9IHJlcXVpcmUoJy4vX3NldENhY2hlSGFzJyk7XG5cbi8qKlxuICpcbiAqIENyZWF0ZXMgYW4gYXJyYXkgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIHVuaXF1ZSB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU2V0Q2FjaGUodmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzID09IG51bGwgPyAwIDogdmFsdWVzLmxlbmd0aDtcblxuICB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHRoaXMuYWRkKHZhbHVlc1tpbmRleF0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTZXRDYWNoZWAuXG5TZXRDYWNoZS5wcm90b3R5cGUuYWRkID0gU2V0Q2FjaGUucHJvdG90eXBlLnB1c2ggPSBzZXRDYWNoZUFkZDtcblNldENhY2hlLnByb3RvdHlwZS5oYXMgPSBzZXRDYWNoZUhhcztcblxubW9kdWxlLmV4cG9ydHMgPSBTZXRDYWNoZTtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxubW9kdWxlLmV4cG9ydHMgPSBTeW1ib2w7XG4iLCIvKipcbiAqIEEgZmFzdGVyIGFsdGVybmF0aXZlIHRvIGBGdW5jdGlvbiNhcHBseWAsIHRoaXMgZnVuY3Rpb24gaW52b2tlcyBgZnVuY2BcbiAqIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIGB0aGlzQXJnYCBhbmQgdGhlIGFyZ3VtZW50cyBvZiBgYXJnc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGludm9rZS5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtBcnJheX0gYXJncyBUaGUgYXJndW1lbnRzIHRvIGludm9rZSBgZnVuY2Agd2l0aC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXN1bHQgb2YgYGZ1bmNgLlxuICovXG5mdW5jdGlvbiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKSB7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZyk7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXBwbHk7XG4iLCJ2YXIgYmFzZUluZGV4T2YgPSByZXF1aXJlKCcuL19iYXNlSW5kZXhPZicpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5pbmNsdWRlc2AgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBzcGVjaWZ5aW5nIGFuIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB0YXJnZXQgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHRhcmdldGAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlJbmNsdWRlcyhhcnJheSwgdmFsdWUpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiYgYmFzZUluZGV4T2YoYXJyYXksIHZhbHVlLCAwKSA+IC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5SW5jbHVkZXM7XG4iLCIvKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZSBgYXJyYXlJbmNsdWRlc2AgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBhIGNvbXBhcmF0b3IuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHRhcmdldCBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBhcmF0b3IgVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdGFyZ2V0YCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheUluY2x1ZGVzV2l0aChhcnJheSwgdmFsdWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChjb21wYXJhdG9yKHZhbHVlLCBhcnJheVtpbmRleF0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5SW5jbHVkZXNXaXRoO1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ubWFwYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBtYXBwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TWFwKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheU1hcDtcbiIsIi8qKlxuICogQXBwZW5kcyB0aGUgZWxlbWVudHMgb2YgYHZhbHVlc2AgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFwcGVuZC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheVB1c2goYXJyYXksIHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGgsXG4gICAgICBvZmZzZXQgPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtvZmZzZXQgKyBpbmRleF0gPSB2YWx1ZXNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheVB1c2g7XG4iLCJ2YXIgYmFzZUFzc2lnblZhbHVlID0gcmVxdWlyZSgnLi9fYmFzZUFzc2lnblZhbHVlJyksXG4gICAgZXEgPSByZXF1aXJlKCcuL2VxJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQXNzaWducyBgdmFsdWVgIHRvIGBrZXlgIG9mIGBvYmplY3RgIGlmIHRoZSBleGlzdGluZyB2YWx1ZSBpcyBub3QgZXF1aXZhbGVudFxuICogdXNpbmcgW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV07XG4gIGlmICghKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGVxKG9ialZhbHVlLCB2YWx1ZSkpIHx8XG4gICAgICAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgIGJhc2VBc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduVmFsdWU7XG4iLCJ2YXIgZXEgPSByZXF1aXJlKCcuL2VxJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGBrZXlgIGlzIGZvdW5kIGluIGBhcnJheWAgb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0ga2V5IFRoZSBrZXkgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGFzc29jSW5kZXhPZihhcnJheSwga2V5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChlcShhcnJheVtsZW5ndGhdWzBdLCBrZXkpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzb2NJbmRleE9mO1xuIiwidmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fZGVmaW5lUHJvcGVydHknKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYXNzaWduVmFsdWVgIGFuZCBgYXNzaWduTWVyZ2VWYWx1ZWAgd2l0aG91dFxuICogdmFsdWUgY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VBc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSA9PSAnX19wcm90b19fJyAmJiBkZWZpbmVQcm9wZXJ0eSkge1xuICAgIGRlZmluZVByb3BlcnR5KG9iamVjdCwga2V5LCB7XG4gICAgICAnY29uZmlndXJhYmxlJzogdHJ1ZSxcbiAgICAgICdlbnVtZXJhYmxlJzogdHJ1ZSxcbiAgICAgICd2YWx1ZSc6IHZhbHVlLFxuICAgICAgJ3dyaXRhYmxlJzogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQXNzaWduVmFsdWU7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZpbmRJbmRleGAgYW5kIGBfLmZpbmRMYXN0SW5kZXhgIHdpdGhvdXRcbiAqIHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlLCBmcm9tSW5kZXgsIGZyb21SaWdodCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaW5kZXggPSBmcm9tSW5kZXggKyAoZnJvbVJpZ2h0ID8gMSA6IC0xKTtcblxuICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRmluZEluZGV4O1xuIiwidmFyIGFycmF5UHVzaCA9IHJlcXVpcmUoJy4vX2FycmF5UHVzaCcpLFxuICAgIGlzRmxhdHRlbmFibGUgPSByZXF1aXJlKCcuL19pc0ZsYXR0ZW5hYmxlJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmxhdHRlbmAgd2l0aCBzdXBwb3J0IGZvciByZXN0cmljdGluZyBmbGF0dGVuaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gZmxhdHRlbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkZXB0aCBUaGUgbWF4aW11bSByZWN1cnNpb24gZGVwdGguXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtwcmVkaWNhdGU9aXNGbGF0dGVuYWJsZV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzU3RyaWN0XSBSZXN0cmljdCB0byB2YWx1ZXMgdGhhdCBwYXNzIGBwcmVkaWNhdGVgIGNoZWNrcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtyZXN1bHQ9W11dIFRoZSBpbml0aWFsIHJlc3VsdCB2YWx1ZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZsYXR0ZW5lZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZUZsYXR0ZW4oYXJyYXksIGRlcHRoLCBwcmVkaWNhdGUsIGlzU3RyaWN0LCByZXN1bHQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgcHJlZGljYXRlIHx8IChwcmVkaWNhdGUgPSBpc0ZsYXR0ZW5hYmxlKTtcbiAgcmVzdWx0IHx8IChyZXN1bHQgPSBbXSk7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgaWYgKGRlcHRoID4gMCAmJiBwcmVkaWNhdGUodmFsdWUpKSB7XG4gICAgICBpZiAoZGVwdGggPiAxKSB7XG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGZsYXR0ZW4gYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICAgIGJhc2VGbGF0dGVuKHZhbHVlLCBkZXB0aCAtIDEsIHByZWRpY2F0ZSwgaXNTdHJpY3QsIHJlc3VsdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheVB1c2gocmVzdWx0LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghaXNTdHJpY3QpIHtcbiAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGbGF0dGVuO1xuIiwidmFyIGNhc3RQYXRoID0gcmVxdWlyZSgnLi9fY2FzdFBhdGgnKSxcbiAgICB0b0tleSA9IHJlcXVpcmUoJy4vX3RvS2V5Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZ2V0YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZmF1bHQgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0KG9iamVjdCwgcGF0aCkge1xuICBwYXRoID0gY2FzdFBhdGgocGF0aCwgb2JqZWN0KTtcblxuICB2YXIgaW5kZXggPSAwLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGg7XG5cbiAgd2hpbGUgKG9iamVjdCAhPSBudWxsICYmIGluZGV4IDwgbGVuZ3RoKSB7XG4gICAgb2JqZWN0ID0gb2JqZWN0W3RvS2V5KHBhdGhbaW5kZXgrK10pXTtcbiAgfVxuICByZXR1cm4gKGluZGV4ICYmIGluZGV4ID09IGxlbmd0aCkgPyBvYmplY3QgOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUdldDtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBnZXRSYXdUYWcgPSByZXF1aXJlKCcuL19nZXRSYXdUYWcnKSxcbiAgICBvYmplY3RUb1N0cmluZyA9IHJlcXVpcmUoJy4vX29iamVjdFRvU3RyaW5nJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmhhc0luYCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IGtleSBUaGUga2V5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSGFzSW4ob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIGtleSBpbiBPYmplY3Qob2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSGFzSW47XG4iLCJ2YXIgYmFzZUZpbmRJbmRleCA9IHJlcXVpcmUoJy4vX2Jhc2VGaW5kSW5kZXgnKSxcbiAgICBiYXNlSXNOYU4gPSByZXF1aXJlKCcuL19iYXNlSXNOYU4nKSxcbiAgICBzdHJpY3RJbmRleE9mID0gcmVxdWlyZSgnLi9fc3RyaWN0SW5kZXhPZicpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmluZGV4T2ZgIHdpdGhvdXQgYGZyb21JbmRleGAgYm91bmRzIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBiYXNlSW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleCkge1xuICByZXR1cm4gdmFsdWUgPT09IHZhbHVlXG4gICAgPyBzdHJpY3RJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KVxuICAgIDogYmFzZUZpbmRJbmRleChhcnJheSwgYmFzZUlzTmFOLCBmcm9tSW5kZXgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJbmRleE9mO1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0FyZ3VtZW50c2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICovXG5mdW5jdGlvbiBiYXNlSXNBcmd1bWVudHModmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gYXJnc1RhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNBcmd1bWVudHM7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmFOYCB3aXRob3V0IHN1cHBvcnQgZm9yIG51bWJlciBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGBOYU5gLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc05hTjtcbiIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNNYXNrZWQgPSByZXF1aXJlKCcuL19pc01hc2tlZCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIHRvU291cmNlID0gcmVxdWlyZSgnLi9fdG9Tb3VyY2UnKTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSBpc0Z1bmN0aW9uKHZhbHVlKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNOYXRpdmU7XG4iLCJ2YXIgYmFzZVBpY2tCeSA9IHJlcXVpcmUoJy4vX2Jhc2VQaWNrQnknKSxcbiAgICBoYXNJbiA9IHJlcXVpcmUoJy4vaGFzSW4nKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5waWNrYCB3aXRob3V0IHN1cHBvcnQgZm9yIGluZGl2aWR1YWxcbiAqIHByb3BlcnR5IGlkZW50aWZpZXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmdbXX0gcGF0aHMgVGhlIHByb3BlcnR5IHBhdGhzIHRvIHBpY2suXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlUGljayhvYmplY3QsIHBhdGhzKSB7XG4gIHJldHVybiBiYXNlUGlja0J5KG9iamVjdCwgcGF0aHMsIGZ1bmN0aW9uKHZhbHVlLCBwYXRoKSB7XG4gICAgcmV0dXJuIGhhc0luKG9iamVjdCwgcGF0aCk7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VQaWNrO1xuIiwidmFyIGJhc2VHZXQgPSByZXF1aXJlKCcuL19iYXNlR2V0JyksXG4gICAgYmFzZVNldCA9IHJlcXVpcmUoJy4vX2Jhc2VTZXQnKSxcbiAgICBjYXN0UGF0aCA9IHJlcXVpcmUoJy4vX2Nhc3RQYXRoJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgIGBfLnBpY2tCeWAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmdbXX0gcGF0aHMgVGhlIHByb3BlcnR5IHBhdGhzIHRvIHBpY2suXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIHByb3BlcnR5LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYmFzZVBpY2tCeShvYmplY3QsIHBhdGhzLCBwcmVkaWNhdGUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwYXRocy5sZW5ndGgsXG4gICAgICByZXN1bHQgPSB7fTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBwYXRoID0gcGF0aHNbaW5kZXhdLFxuICAgICAgICB2YWx1ZSA9IGJhc2VHZXQob2JqZWN0LCBwYXRoKTtcblxuICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIHBhdGgpKSB7XG4gICAgICBiYXNlU2V0KHJlc3VsdCwgY2FzdFBhdGgocGF0aCwgb2JqZWN0KSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VQaWNrQnk7XG4iLCJ2YXIgYXNzaWduVmFsdWUgPSByZXF1aXJlKCcuL19hc3NpZ25WYWx1ZScpLFxuICAgIGNhc3RQYXRoID0gcmVxdWlyZSgnLi9fY2FzdFBhdGgnKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9faXNJbmRleCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIHRvS2V5ID0gcmVxdWlyZSgnLi9fdG9LZXknKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5zZXRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIHBhdGggY3JlYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlU2V0KG9iamVjdCwgcGF0aCwgdmFsdWUsIGN1c3RvbWl6ZXIpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICBwYXRoID0gY2FzdFBhdGgocGF0aCwgb2JqZWN0KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoLFxuICAgICAgbGFzdEluZGV4ID0gbGVuZ3RoIC0gMSxcbiAgICAgIG5lc3RlZCA9IG9iamVjdDtcblxuICB3aGlsZSAobmVzdGVkICE9IG51bGwgJiYgKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSB0b0tleShwYXRoW2luZGV4XSksXG4gICAgICAgIG5ld1ZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAoaW5kZXggIT0gbGFzdEluZGV4KSB7XG4gICAgICB2YXIgb2JqVmFsdWUgPSBuZXN0ZWRba2V5XTtcbiAgICAgIG5ld1ZhbHVlID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIob2JqVmFsdWUsIGtleSwgbmVzdGVkKSA6IHVuZGVmaW5lZDtcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gaXNPYmplY3Qob2JqVmFsdWUpXG4gICAgICAgICAgPyBvYmpWYWx1ZVxuICAgICAgICAgIDogKGlzSW5kZXgocGF0aFtpbmRleCArIDFdKSA/IFtdIDoge30pO1xuICAgICAgfVxuICAgIH1cbiAgICBhc3NpZ25WYWx1ZShuZXN0ZWQsIGtleSwgbmV3VmFsdWUpO1xuICAgIG5lc3RlZCA9IG5lc3RlZFtrZXldO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVNldDtcbiIsInZhciBjb25zdGFudCA9IHJlcXVpcmUoJy4vY29uc3RhbnQnKSxcbiAgICBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2RlZmluZVByb3BlcnR5JyksXG4gICAgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYHNldFRvU3RyaW5nYCB3aXRob3V0IHN1cHBvcnQgZm9yIGhvdCBsb29wIHNob3J0aW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdHJpbmcgVGhlIGB0b1N0cmluZ2AgcmVzdWx0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGBmdW5jYC5cbiAqL1xudmFyIGJhc2VTZXRUb1N0cmluZyA9ICFkZWZpbmVQcm9wZXJ0eSA/IGlkZW50aXR5IDogZnVuY3Rpb24oZnVuYywgc3RyaW5nKSB7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eShmdW5jLCAndG9TdHJpbmcnLCB7XG4gICAgJ2NvbmZpZ3VyYWJsZSc6IHRydWUsXG4gICAgJ2VudW1lcmFibGUnOiBmYWxzZSxcbiAgICAndmFsdWUnOiBjb25zdGFudChzdHJpbmcpLFxuICAgICd3cml0YWJsZSc6IHRydWVcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VTZXRUb1N0cmluZztcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBhcnJheU1hcCA9IHJlcXVpcmUoJy4vX2FycmF5TWFwJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnRvU3RyaW5nIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRvU3RyaW5nYCB3aGljaCBkb2Vzbid0IGNvbnZlcnQgbnVsbGlzaFxuICogdmFsdWVzIHRvIGVtcHR5IHN0cmluZ3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICAvLyBFeGl0IGVhcmx5IGZvciBzdHJpbmdzIHRvIGF2b2lkIGEgcGVyZm9ybWFuY2UgaGl0IGluIHNvbWUgZW52aXJvbm1lbnRzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbnZlcnQgdmFsdWVzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgcmV0dXJuIGFycmF5TWFwKHZhbHVlLCBiYXNlVG9TdHJpbmcpICsgJyc7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBzeW1ib2xUb1N0cmluZyA/IHN5bWJvbFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VUb1N0cmluZztcbiIsInZhciBTZXRDYWNoZSA9IHJlcXVpcmUoJy4vX1NldENhY2hlJyksXG4gICAgYXJyYXlJbmNsdWRlcyA9IHJlcXVpcmUoJy4vX2FycmF5SW5jbHVkZXMnKSxcbiAgICBhcnJheUluY2x1ZGVzV2l0aCA9IHJlcXVpcmUoJy4vX2FycmF5SW5jbHVkZXNXaXRoJyksXG4gICAgY2FjaGVIYXMgPSByZXF1aXJlKCcuL19jYWNoZUhhcycpLFxuICAgIGNyZWF0ZVNldCA9IHJlcXVpcmUoJy4vX2NyZWF0ZVNldCcpLFxuICAgIHNldFRvQXJyYXkgPSByZXF1aXJlKCcuL19zZXRUb0FycmF5Jyk7XG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5pcUJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlXSBUaGUgaXRlcmF0ZWUgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb21wYXJhdG9yXSBUaGUgY29tcGFyYXRvciBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlIGZyZWUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmlxKGFycmF5LCBpdGVyYXRlZSwgY29tcGFyYXRvcikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGluY2x1ZGVzID0gYXJyYXlJbmNsdWRlcyxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGlzQ29tbW9uID0gdHJ1ZSxcbiAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgc2VlbiA9IHJlc3VsdDtcblxuICBpZiAoY29tcGFyYXRvcikge1xuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgaW5jbHVkZXMgPSBhcnJheUluY2x1ZGVzV2l0aDtcbiAgfVxuICBlbHNlIGlmIChsZW5ndGggPj0gTEFSR0VfQVJSQVlfU0laRSkge1xuICAgIHZhciBzZXQgPSBpdGVyYXRlZSA/IG51bGwgOiBjcmVhdGVTZXQoYXJyYXkpO1xuICAgIGlmIChzZXQpIHtcbiAgICAgIHJldHVybiBzZXRUb0FycmF5KHNldCk7XG4gICAgfVxuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgaW5jbHVkZXMgPSBjYWNoZUhhcztcbiAgICBzZWVuID0gbmV3IFNldENhY2hlO1xuICB9XG4gIGVsc2Uge1xuICAgIHNlZW4gPSBpdGVyYXRlZSA/IFtdIDogcmVzdWx0O1xuICB9XG4gIG91dGVyOlxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSA/IGl0ZXJhdGVlKHZhbHVlKSA6IHZhbHVlO1xuXG4gICAgdmFsdWUgPSAoY29tcGFyYXRvciB8fCB2YWx1ZSAhPT0gMCkgPyB2YWx1ZSA6IDA7XG4gICAgaWYgKGlzQ29tbW9uICYmIGNvbXB1dGVkID09PSBjb21wdXRlZCkge1xuICAgICAgdmFyIHNlZW5JbmRleCA9IHNlZW4ubGVuZ3RoO1xuICAgICAgd2hpbGUgKHNlZW5JbmRleC0tKSB7XG4gICAgICAgIGlmIChzZWVuW3NlZW5JbmRleF0gPT09IGNvbXB1dGVkKSB7XG4gICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpdGVyYXRlZSkge1xuICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmICghaW5jbHVkZXMoc2VlbiwgY29tcHV0ZWQsIGNvbXBhcmF0b3IpKSB7XG4gICAgICBpZiAoc2VlbiAhPT0gcmVzdWx0KSB7XG4gICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVVuaXE7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBhIGBjYWNoZWAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGNhY2hlIFRoZSBjYWNoZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBjYWNoZUhhcyhjYWNoZSwga2V5KSB7XG4gIHJldHVybiBjYWNoZS5oYXMoa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYWNoZUhhcztcbiIsInZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNLZXkgPSByZXF1aXJlKCcuL19pc0tleScpLFxuICAgIHN0cmluZ1RvUGF0aCA9IHJlcXVpcmUoJy4vX3N0cmluZ1RvUGF0aCcpLFxuICAgIHRvU3RyaW5nID0gcmVxdWlyZSgnLi90b1N0cmluZycpO1xuXG4vKipcbiAqIENhc3RzIGB2YWx1ZWAgdG8gYSBwYXRoIGFycmF5IGlmIGl0J3Mgbm90IG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5IGtleXMgb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNhc3QgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2FzdFBhdGgodmFsdWUsIG9iamVjdCkge1xuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIGlzS2V5KHZhbHVlLCBvYmplY3QpID8gW3ZhbHVlXSA6IHN0cmluZ1RvUGF0aCh0b1N0cmluZyh2YWx1ZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhc3RQYXRoO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvdmVycmVhY2hpbmcgY29yZS1qcyBzaGltcy4gKi9cbnZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbm1vZHVsZS5leHBvcnRzID0gY29yZUpzRGF0YTtcbiIsInZhciBTZXQgPSByZXF1aXJlKCcuL19TZXQnKSxcbiAgICBub29wID0gcmVxdWlyZSgnLi9ub29wJyksXG4gICAgc2V0VG9BcnJheSA9IHJlcXVpcmUoJy4vX3NldFRvQXJyYXknKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgc2V0IG9iamVjdCBvZiBgdmFsdWVzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gYWRkIHRvIHRoZSBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgc2V0LlxuICovXG52YXIgY3JlYXRlU2V0ID0gIShTZXQgJiYgKDEgLyBzZXRUb0FycmF5KG5ldyBTZXQoWywtMF0pKVsxXSkgPT0gSU5GSU5JVFkpID8gbm9vcCA6IGZ1bmN0aW9uKHZhbHVlcykge1xuICByZXR1cm4gbmV3IFNldCh2YWx1ZXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVTZXQ7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyk7XG5cbnZhciBkZWZpbmVQcm9wZXJ0eSA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICB2YXIgZnVuYyA9IGdldE5hdGl2ZShPYmplY3QsICdkZWZpbmVQcm9wZXJ0eScpO1xuICAgIGZ1bmMoe30sICcnLCB7fSk7XG4gICAgcmV0dXJuIGZ1bmM7XG4gIH0gY2F0Y2ggKGUpIHt9XG59KCkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmluZVByb3BlcnR5O1xuIiwidmFyIGZsYXR0ZW4gPSByZXF1aXJlKCcuL2ZsYXR0ZW4nKSxcbiAgICBvdmVyUmVzdCA9IHJlcXVpcmUoJy4vX292ZXJSZXN0JyksXG4gICAgc2V0VG9TdHJpbmcgPSByZXF1aXJlKCcuL19zZXRUb1N0cmluZycpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZVJlc3RgIHdoaWNoIGZsYXR0ZW5zIHRoZSByZXN0IGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGZsYXRSZXN0KGZ1bmMpIHtcbiAgcmV0dXJuIHNldFRvU3RyaW5nKG92ZXJSZXN0KGZ1bmMsIHVuZGVmaW5lZCwgZmxhdHRlbiksIGZ1bmMgKyAnJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmxhdFJlc3Q7XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZyZWVHbG9iYWw7XG4iLCJ2YXIgaXNLZXlhYmxlID0gcmVxdWlyZSgnLi9faXNLZXlhYmxlJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRNYXBEYXRhO1xuIiwidmFyIGJhc2VJc05hdGl2ZSA9IHJlcXVpcmUoJy4vX2Jhc2VJc05hdGl2ZScpLFxuICAgIGdldFZhbHVlID0gcmVxdWlyZSgnLi9fZ2V0VmFsdWUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXROYXRpdmU7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSYXdUYWc7XG4iLCIvKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRWYWx1ZTtcbiIsInZhciBjYXN0UGF0aCA9IHJlcXVpcmUoJy4vX2Nhc3RQYXRoJyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuL19pc0luZGV4JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgdG9LZXkgPSByZXF1aXJlKCcuL190b0tleScpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgcGF0aGAgZXhpc3RzIG9uIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBjaGVjay5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhc0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrIHByb3BlcnRpZXMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHBhdGhgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNQYXRoKG9iamVjdCwgcGF0aCwgaGFzRnVuYykge1xuICBwYXRoID0gY2FzdFBhdGgocGF0aCwgb2JqZWN0KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gZmFsc2U7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gdG9LZXkocGF0aFtpbmRleF0pO1xuICAgIGlmICghKHJlc3VsdCA9IG9iamVjdCAhPSBudWxsICYmIGhhc0Z1bmMob2JqZWN0LCBrZXkpKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIG9iamVjdCA9IG9iamVjdFtrZXldO1xuICB9XG4gIGlmIChyZXN1bHQgfHwgKytpbmRleCAhPSBsZW5ndGgpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGxlbmd0aCA9IG9iamVjdCA9PSBudWxsID8gMCA6IG9iamVjdC5sZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNQYXRoO1xuIiwidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgSGFzaFxuICovXG5mdW5jdGlvbiBoYXNoQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuYXRpdmVDcmVhdGUgPyBuYXRpdmVDcmVhdGUobnVsbCkgOiB7fTtcbiAgdGhpcy5zaXplID0gMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoQ2xlYXI7XG4iLCIvKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgdmFyIHJlc3VsdCA9IHRoaXMuaGFzKGtleSkgJiYgZGVsZXRlIHRoaXMuX19kYXRhX19ba2V5XTtcbiAgdGhpcy5zaXplIC09IHJlc3VsdCA/IDEgOiAwO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hEZWxldGU7XG4iLCJ2YXIgbmF0aXZlQ3JlYXRlID0gcmVxdWlyZSgnLi9fbmF0aXZlQ3JlYXRlJyk7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGhhc2hHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSA/IGRhdGFba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoR2V0O1xuIiwidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IChkYXRhW2tleV0gIT09IHVuZGVmaW5lZCkgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaEhhcztcbiIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICB0aGlzLnNpemUgKz0gdGhpcy5oYXMoa2V5KSA/IDAgOiAxO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaFNldDtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHNwcmVhZGFibGVTeW1ib2wgPSBTeW1ib2wgPyBTeW1ib2wuaXNDb25jYXRTcHJlYWRhYmxlIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgZmxhdHRlbmFibGUgYGFyZ3VtZW50c2Agb2JqZWN0IG9yIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGZsYXR0ZW5hYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzRmxhdHRlbmFibGUodmFsdWUpIHtcbiAgcmV0dXJuIGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSB8fFxuICAgICEhKHNwcmVhZGFibGVTeW1ib2wgJiYgdmFsdWUgJiYgdmFsdWVbc3ByZWFkYWJsZVN5bWJvbF0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRmxhdHRlbmFibGU7XG4iLCIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSAmJlxuICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0luZGV4O1xuIiwidmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlSXNEZWVwUHJvcCA9IC9cXC58XFxbKD86W15bXFxdXSp8KFtcIiddKSg/Oig/IVxcMSlbXlxcXFxdfFxcXFwuKSo/XFwxKVxcXS8sXG4gICAgcmVJc1BsYWluUHJvcCA9IC9eXFx3KiQvO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSBhbmQgbm90IGEgcHJvcGVydHkgcGF0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeSBrZXlzIG9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5KHZhbHVlLCBvYmplY3QpIHtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nIHx8XG4gICAgICB2YWx1ZSA9PSBudWxsIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiByZUlzUGxhaW5Qcm9wLnRlc3QodmFsdWUpIHx8ICFyZUlzRGVlcFByb3AudGVzdCh2YWx1ZSkgfHxcbiAgICAob2JqZWN0ICE9IG51bGwgJiYgdmFsdWUgaW4gT2JqZWN0KG9iamVjdCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzS2V5O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzS2V5YWJsZTtcbiIsInZhciBjb3JlSnNEYXRhID0gcmVxdWlyZSgnLi9fY29yZUpzRGF0YScpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTWFza2VkO1xuIiwiLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RDYWNoZUNsZWFyO1xuIiwidmFyIGFzc29jSW5kZXhPZiA9IHJlcXVpcmUoJy4vX2Fzc29jSW5kZXhPZicpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBkYXRhLmxlbmd0aCAtIDE7XG4gIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICBkYXRhLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNwbGljZS5jYWxsKGRhdGEsIGluZGV4LCAxKTtcbiAgfVxuICAtLXRoaXMuc2l6ZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdENhY2hlRGVsZXRlO1xuIiwidmFyIGFzc29jSW5kZXhPZiA9IHJlcXVpcmUoJy4vX2Fzc29jSW5kZXhPZicpO1xuXG4vKipcbiAqIEdldHMgdGhlIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IGRhdGFbaW5kZXhdWzFdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RDYWNoZUdldDtcbiIsInZhciBhc3NvY0luZGV4T2YgPSByZXF1aXJlKCcuL19hc3NvY0luZGV4T2YnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGFzc29jSW5kZXhPZih0aGlzLl9fZGF0YV9fLCBrZXkpID4gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdENhY2hlSGFzO1xuIiwidmFyIGFzc29jSW5kZXhPZiA9IHJlcXVpcmUoJy4vX2Fzc29jSW5kZXhPZicpO1xuXG4vKipcbiAqIFNldHMgdGhlIGxpc3QgY2FjaGUgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgICsrdGhpcy5zaXplO1xuICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGFbaW5kZXhdWzFdID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdENhY2hlU2V0O1xuIiwidmFyIEhhc2ggPSByZXF1aXJlKCcuL19IYXNoJyksXG4gICAgTGlzdENhY2hlID0gcmVxdWlyZSgnLi9fTGlzdENhY2hlJyksXG4gICAgTWFwID0gcmVxdWlyZSgnLi9fTWFwJyk7XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuc2l6ZSA9IDA7XG4gIHRoaXMuX19kYXRhX18gPSB7XG4gICAgJ2hhc2gnOiBuZXcgSGFzaCxcbiAgICAnbWFwJzogbmV3IChNYXAgfHwgTGlzdENhY2hlKSxcbiAgICAnc3RyaW5nJzogbmV3IEhhc2hcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBDYWNoZUNsZWFyO1xuIiwidmFyIGdldE1hcERhdGEgPSByZXF1aXJlKCcuL19nZXRNYXBEYXRhJyk7XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIHJlc3VsdCA9IGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbiAgdGhpcy5zaXplIC09IHJlc3VsdCA/IDEgOiAwO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlRGVsZXRlO1xuIiwidmFyIGdldE1hcERhdGEgPSByZXF1aXJlKCcuL19nZXRNYXBEYXRhJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUdldChrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBDYWNoZUdldDtcbiIsInZhciBnZXRNYXBEYXRhID0gcmVxdWlyZSgnLi9fZ2V0TWFwRGF0YScpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlSGFzO1xuIiwidmFyIGdldE1hcERhdGEgPSByZXF1aXJlKCcuL19nZXRNYXBEYXRhJyk7XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IGdldE1hcERhdGEodGhpcywga2V5KSxcbiAgICAgIHNpemUgPSBkYXRhLnNpemU7XG5cbiAgZGF0YS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHRoaXMuc2l6ZSArPSBkYXRhLnNpemUgPT0gc2l6ZSA/IDAgOiAxO1xuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBDYWNoZVNldDtcbiIsInZhciBtZW1vaXplID0gcmVxdWlyZSgnLi9tZW1vaXplJyk7XG5cbi8qKiBVc2VkIGFzIHRoZSBtYXhpbXVtIG1lbW9pemUgY2FjaGUgc2l6ZS4gKi9cbnZhciBNQVhfTUVNT0laRV9TSVpFID0gNTAwO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5tZW1vaXplYCB3aGljaCBjbGVhcnMgdGhlIG1lbW9pemVkIGZ1bmN0aW9uJ3NcbiAqIGNhY2hlIHdoZW4gaXQgZXhjZWVkcyBgTUFYX01FTU9JWkVfU0laRWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGhhdmUgaXRzIG91dHB1dCBtZW1vaXplZC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IG1lbW9pemVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBtZW1vaXplQ2FwcGVkKGZ1bmMpIHtcbiAgdmFyIHJlc3VsdCA9IG1lbW9pemUoZnVuYywgZnVuY3Rpb24oa2V5KSB7XG4gICAgaWYgKGNhY2hlLnNpemUgPT09IE1BWF9NRU1PSVpFX1NJWkUpIHtcbiAgICAgIGNhY2hlLmNsZWFyKCk7XG4gICAgfVxuICAgIHJldHVybiBrZXk7XG4gIH0pO1xuXG4gIHZhciBjYWNoZSA9IHJlc3VsdC5jYWNoZTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtZW1vaXplQ2FwcGVkO1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdGl2ZUNyZWF0ZTtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9iamVjdFRvU3RyaW5nO1xuIiwidmFyIGFwcGx5ID0gcmVxdWlyZSgnLi9fYXBwbHknKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZVJlc3RgIHdoaWNoIHRyYW5zZm9ybXMgdGhlIHJlc3QgYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIHJlc3QgYXJyYXkgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJSZXN0KGZ1bmMsIHN0YXJ0LCB0cmFuc2Zvcm0pIHtcbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogc3RhcnQsIDApO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgYXJyYXkgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGFycmF5W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIGluZGV4ID0gLTE7XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBzdGFydCkge1xuICAgICAgb3RoZXJBcmdzW2luZGV4XSA9IGFyZ3NbaW5kZXhdO1xuICAgIH1cbiAgICBvdGhlckFyZ3Nbc3RhcnRdID0gdHJhbnNmb3JtKGFycmF5KTtcbiAgICByZXR1cm4gYXBwbHkoZnVuYywgdGhpcywgb3RoZXJBcmdzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvdmVyUmVzdDtcbiIsInZhciBmcmVlR2xvYmFsID0gcmVxdWlyZSgnLi9fZnJlZUdsb2JhbCcpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm9vdDtcbiIsIi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBhZGRcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQGFsaWFzIHB1c2hcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhY2hlLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlQWRkKHZhbHVlKSB7XG4gIHRoaXMuX19kYXRhX18uc2V0KHZhbHVlLCBIQVNIX1VOREVGSU5FRCk7XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldENhY2hlQWRkO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBpbiB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUhhcyh2YWx1ZSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXModmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldENhY2hlSGFzO1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRUb0FycmF5O1xuIiwidmFyIGJhc2VTZXRUb1N0cmluZyA9IHJlcXVpcmUoJy4vX2Jhc2VTZXRUb1N0cmluZycpLFxuICAgIHNob3J0T3V0ID0gcmVxdWlyZSgnLi9fc2hvcnRPdXQnKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBgdG9TdHJpbmdgIG1ldGhvZCBvZiBgZnVuY2AgdG8gcmV0dXJuIGBzdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdHJpbmcgVGhlIGB0b1N0cmluZ2AgcmVzdWx0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGBmdW5jYC5cbiAqL1xudmFyIHNldFRvU3RyaW5nID0gc2hvcnRPdXQoYmFzZVNldFRvU3RyaW5nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZXRUb1N0cmluZztcbiIsIi8qKiBVc2VkIHRvIGRldGVjdCBob3QgZnVuY3Rpb25zIGJ5IG51bWJlciBvZiBjYWxscyB3aXRoaW4gYSBzcGFuIG9mIG1pbGxpc2Vjb25kcy4gKi9cbnZhciBIT1RfQ09VTlQgPSA4MDAsXG4gICAgSE9UX1NQQU4gPSAxNjtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU5vdyA9IERhdGUubm93O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0J2xsIHNob3J0IG91dCBhbmQgaW52b2tlIGBpZGVudGl0eWAgaW5zdGVhZFxuICogb2YgYGZ1bmNgIHdoZW4gaXQncyBjYWxsZWQgYEhPVF9DT1VOVGAgb3IgbW9yZSB0aW1lcyBpbiBgSE9UX1NQQU5gXG4gKiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHJlc3RyaWN0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc2hvcnRhYmxlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBzaG9ydE91dChmdW5jKSB7XG4gIHZhciBjb3VudCA9IDAsXG4gICAgICBsYXN0Q2FsbGVkID0gMDtcblxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0YW1wID0gbmF0aXZlTm93KCksXG4gICAgICAgIHJlbWFpbmluZyA9IEhPVF9TUEFOIC0gKHN0YW1wIC0gbGFzdENhbGxlZCk7XG5cbiAgICBsYXN0Q2FsbGVkID0gc3RhbXA7XG4gICAgaWYgKHJlbWFpbmluZyA+IDApIHtcbiAgICAgIGlmICgrK2NvdW50ID49IEhPVF9DT1VOVCkge1xuICAgICAgICByZXR1cm4gYXJndW1lbnRzWzBdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb3VudCA9IDA7XG4gICAgfVxuICAgIHJldHVybiBmdW5jLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG9ydE91dDtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmluZGV4T2ZgIHdoaWNoIHBlcmZvcm1zIHN0cmljdCBlcXVhbGl0eVxuICogY29tcGFyaXNvbnMgb2YgdmFsdWVzLCBpLmUuIGA9PT1gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIHN0cmljdEluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpIHtcbiAgdmFyIGluZGV4ID0gZnJvbUluZGV4IC0gMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChhcnJheVtpbmRleF0gPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHJpY3RJbmRleE9mO1xuIiwidmFyIG1lbW9pemVDYXBwZWQgPSByZXF1aXJlKCcuL19tZW1vaXplQ2FwcGVkJyk7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIHByb3BlcnR5IG5hbWVzIHdpdGhpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUxlYWRpbmdEb3QgPSAvXlxcLi8sXG4gICAgcmVQcm9wTmFtZSA9IC9bXi5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXFxcXXxcXFxcLikqPylcXDIpXFxdfCg/PSg/OlxcLnxcXFtcXF0pKD86XFwufFxcW1xcXXwkKSkvZztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVFc2NhcGVDaGFyID0gL1xcXFwoXFxcXCk/L2c7XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG8gYSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xudmFyIHN0cmluZ1RvUGF0aCA9IG1lbW9pemVDYXBwZWQoZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKHJlTGVhZGluZ0RvdC50ZXN0KHN0cmluZykpIHtcbiAgICByZXN1bHQucHVzaCgnJyk7XG4gIH1cbiAgc3RyaW5nLnJlcGxhY2UocmVQcm9wTmFtZSwgZnVuY3Rpb24obWF0Y2gsIG51bWJlciwgcXVvdGUsIHN0cmluZykge1xuICAgIHJlc3VsdC5wdXNoKHF1b3RlID8gc3RyaW5nLnJlcGxhY2UocmVFc2NhcGVDaGFyLCAnJDEnKSA6IChudW1iZXIgfHwgbWF0Y2gpKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBzdHJpbmdUb1BhdGg7XG4iLCJ2YXIgaXNTeW1ib2wgPSByZXF1aXJlKCcuL2lzU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBrZXkgaWYgaXQncyBub3QgYSBzdHJpbmcgb3Igc3ltYm9sLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge3N0cmluZ3xzeW1ib2x9IFJldHVybnMgdGhlIGtleS5cbiAqL1xuZnVuY3Rpb24gdG9LZXkodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvS2V5O1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvU291cmNlO1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGB2YWx1ZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHJldHVybiBmcm9tIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjb25zdGFudCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdHMgPSBfLnRpbWVzKDIsIF8uY29uc3RhbnQoeyAnYSc6IDEgfSkpO1xuICpcbiAqIGNvbnNvbGUubG9nKG9iamVjdHMpO1xuICogLy8gPT4gW3sgJ2EnOiAxIH0sIHsgJ2EnOiAxIH1dXG4gKlxuICogY29uc29sZS5sb2cob2JqZWN0c1swXSA9PT0gb2JqZWN0c1sxXSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGNvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29uc3RhbnQ7XG4iLCIvKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlcTtcbiIsInZhciBiYXNlRmxhdHRlbiA9IHJlcXVpcmUoJy4vX2Jhc2VGbGF0dGVuJyk7XG5cbi8qKlxuICogRmxhdHRlbnMgYGFycmF5YCBhIHNpbmdsZSBsZXZlbCBkZWVwLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGZsYXR0ZW4uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBmbGF0dGVuZWQgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZmxhdHRlbihbMSwgWzIsIFszLCBbNF1dLCA1XV0pO1xuICogLy8gPT4gWzEsIDIsIFszLCBbNF1dLCA1XVxuICovXG5mdW5jdGlvbiBmbGF0dGVuKGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcbiAgcmV0dXJuIGxlbmd0aCA/IGJhc2VGbGF0dGVuKGFycmF5LCAxKSA6IFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZsYXR0ZW47XG4iLCJ2YXIgYmFzZUdldCA9IHJlcXVpcmUoJy4vX2Jhc2VHZXQnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBgcGF0aGAgb2YgYG9iamVjdGAuIElmIHRoZSByZXNvbHZlZCB2YWx1ZSBpc1xuICogYHVuZGVmaW5lZGAsIHRoZSBgZGVmYXVsdFZhbHVlYCBpcyByZXR1cm5lZCBpbiBpdHMgcGxhY2UuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjcuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gW2RlZmF1bHRWYWx1ZV0gVGhlIHZhbHVlIHJldHVybmVkIGZvciBgdW5kZWZpbmVkYCByZXNvbHZlZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogW3sgJ2InOiB7ICdjJzogMyB9IH1dIH07XG4gKlxuICogXy5nZXQob2JqZWN0LCAnYVswXS5iLmMnKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsIFsnYScsICcwJywgJ2InLCAnYyddKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsICdhLmIuYycsICdkZWZhdWx0Jyk7XG4gKiAvLyA9PiAnZGVmYXVsdCdcbiAqL1xuZnVuY3Rpb24gZ2V0KG9iamVjdCwgcGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gIHZhciByZXN1bHQgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IGJhc2VHZXQob2JqZWN0LCBwYXRoKTtcbiAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdFZhbHVlIDogcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldDtcbiIsInZhciBiYXNlSGFzSW4gPSByZXF1aXJlKCcuL19iYXNlSGFzSW4nKSxcbiAgICBoYXNQYXRoID0gcmVxdWlyZSgnLi9faGFzUGF0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgcGF0aGAgaXMgYSBkaXJlY3Qgb3IgaW5oZXJpdGVkIHByb3BlcnR5IG9mIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBwYXRoYCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IF8uY3JlYXRlKHsgJ2EnOiBfLmNyZWF0ZSh7ICdiJzogMiB9KSB9KTtcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgJ2EuYicpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCBbJ2EnLCAnYiddKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgJ2InKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGhhc0luKG9iamVjdCwgcGF0aCkge1xuICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYgaGFzUGF0aChvYmplY3QsIHBhdGgsIGJhc2VIYXNJbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzSW47XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IGl0IHJlY2VpdmVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICpcbiAqIGNvbnNvbGUubG9nKF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlkZW50aXR5O1xuIiwidmFyIGJhc2VJc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vX2Jhc2VJc0FyZ3VtZW50cycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FyZ3VtZW50cyA9IGJhc2VJc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA/IGJhc2VJc0FyZ3VtZW50cyA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJndW1lbnRzO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheTtcbiIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXN5bmNUYWcgPSAnW29iamVjdCBBc3luY0Z1bmN0aW9uXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBwcm94eVRhZyA9ICdbb2JqZWN0IFByb3h5XSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheXMgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGJhc2VHZXRUYWcodmFsdWUpO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZyB8fCB0YWcgPT0gYXN5bmNUYWcgfHwgdGFnID09IHByb3h5VGFnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb247XG4iLCIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNMZW5ndGg7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcbiIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N5bWJvbDtcbiIsInZhciBNYXBDYWNoZSA9IHJlcXVpcmUoJy4vX01hcENhY2hlJyk7XG5cbi8qKiBFcnJvciBtZXNzYWdlIGNvbnN0YW50cy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgbWVtb2l6ZXMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuIElmIGByZXNvbHZlcmAgaXNcbiAqIHByb3ZpZGVkLCBpdCBkZXRlcm1pbmVzIHRoZSBjYWNoZSBrZXkgZm9yIHN0b3JpbmcgdGhlIHJlc3VsdCBiYXNlZCBvbiB0aGVcbiAqIGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uIEJ5IGRlZmF1bHQsIHRoZSBmaXJzdCBhcmd1bWVudFxuICogcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uIGlzIHVzZWQgYXMgdGhlIG1hcCBjYWNoZSBrZXkuIFRoZSBgZnVuY2BcbiAqIGlzIGludm9rZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlIG1lbW9pemVkIGZ1bmN0aW9uLlxuICpcbiAqICoqTm90ZToqKiBUaGUgY2FjaGUgaXMgZXhwb3NlZCBhcyB0aGUgYGNhY2hlYCBwcm9wZXJ0eSBvbiB0aGUgbWVtb2l6ZWRcbiAqIGZ1bmN0aW9uLiBJdHMgY3JlYXRpb24gbWF5IGJlIGN1c3RvbWl6ZWQgYnkgcmVwbGFjaW5nIHRoZSBgXy5tZW1vaXplLkNhY2hlYFxuICogY29uc3RydWN0b3Igd2l0aCBvbmUgd2hvc2UgaW5zdGFuY2VzIGltcGxlbWVudCB0aGVcbiAqIFtgTWFwYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcHJvcGVydGllcy1vZi10aGUtbWFwLXByb3RvdHlwZS1vYmplY3QpXG4gKiBtZXRob2QgaW50ZXJmYWNlIG9mIGBjbGVhcmAsIGBkZWxldGVgLCBgZ2V0YCwgYGhhc2AsIGFuZCBgc2V0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGhhdmUgaXRzIG91dHB1dCBtZW1vaXplZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXNvbHZlcl0gVGhlIGZ1bmN0aW9uIHRvIHJlc29sdmUgdGhlIGNhY2hlIGtleS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IG1lbW9pemVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogMiB9O1xuICogdmFyIG90aGVyID0geyAnYyc6IDMsICdkJzogNCB9O1xuICpcbiAqIHZhciB2YWx1ZXMgPSBfLm1lbW9pemUoXy52YWx1ZXMpO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiB2YWx1ZXMob3RoZXIpO1xuICogLy8gPT4gWzMsIDRdXG4gKlxuICogb2JqZWN0LmEgPSAyO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiAvLyBNb2RpZnkgdGhlIHJlc3VsdCBjYWNoZS5cbiAqIHZhbHVlcy5jYWNoZS5zZXQob2JqZWN0LCBbJ2EnLCAnYiddKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWydhJywgJ2InXVxuICpcbiAqIC8vIFJlcGxhY2UgYF8ubWVtb2l6ZS5DYWNoZWAuXG4gKiBfLm1lbW9pemUuQ2FjaGUgPSBXZWFrTWFwO1xuICovXG5mdW5jdGlvbiBtZW1vaXplKGZ1bmMsIHJlc29sdmVyKSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nIHx8IChyZXNvbHZlciAhPSBudWxsICYmIHR5cGVvZiByZXNvbHZlciAhPSAnZnVuY3Rpb24nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB2YXIgbWVtb2l6ZWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAga2V5ID0gcmVzb2x2ZXIgPyByZXNvbHZlci5hcHBseSh0aGlzLCBhcmdzKSA6IGFyZ3NbMF0sXG4gICAgICAgIGNhY2hlID0gbWVtb2l6ZWQuY2FjaGU7XG5cbiAgICBpZiAoY2FjaGUuaGFzKGtleSkpIHtcbiAgICAgIHJldHVybiBjYWNoZS5nZXQoa2V5KTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgbWVtb2l6ZWQuY2FjaGUgPSBjYWNoZS5zZXQoa2V5LCByZXN1bHQpIHx8IGNhY2hlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIG1lbW9pemVkLmNhY2hlID0gbmV3IChtZW1vaXplLkNhY2hlIHx8IE1hcENhY2hlKTtcbiAgcmV0dXJuIG1lbW9pemVkO1xufVxuXG4vLyBFeHBvc2UgYE1hcENhY2hlYC5cbm1lbW9pemUuQ2FjaGUgPSBNYXBDYWNoZTtcblxubW9kdWxlLmV4cG9ydHMgPSBtZW1vaXplO1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGB1bmRlZmluZWRgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi4zLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5ub29wKTtcbiAqIC8vID0+IFt1bmRlZmluZWQsIHVuZGVmaW5lZF1cbiAqL1xuZnVuY3Rpb24gbm9vcCgpIHtcbiAgLy8gTm8gb3BlcmF0aW9uIHBlcmZvcm1lZC5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBub29wO1xuIiwidmFyIGJhc2VQaWNrID0gcmVxdWlyZSgnLi9fYmFzZVBpY2snKSxcbiAgICBmbGF0UmVzdCA9IHJlcXVpcmUoJy4vX2ZsYXRSZXN0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBvYmplY3QgY29tcG9zZWQgb2YgdGhlIHBpY2tlZCBgb2JqZWN0YCBwcm9wZXJ0aWVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0gey4uLihzdHJpbmd8c3RyaW5nW10pfSBbcGF0aHNdIFRoZSBwcm9wZXJ0eSBwYXRocyB0byBwaWNrLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxLCAnYic6ICcyJywgJ2MnOiAzIH07XG4gKlxuICogXy5waWNrKG9iamVjdCwgWydhJywgJ2MnXSk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2MnOiAzIH1cbiAqL1xudmFyIHBpY2sgPSBmbGF0UmVzdChmdW5jdGlvbihvYmplY3QsIHBhdGhzKSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHt9IDogYmFzZVBpY2sob2JqZWN0LCBwYXRocyk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBwaWNrO1xuIiwidmFyIGJhc2VUb1N0cmluZyA9IHJlcXVpcmUoJy4vX2Jhc2VUb1N0cmluZycpO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZCBmb3IgYG51bGxgXG4gKiBhbmQgYHVuZGVmaW5lZGAgdmFsdWVzLiBUaGUgc2lnbiBvZiBgLTBgIGlzIHByZXNlcnZlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9TdHJpbmcobnVsbCk7XG4gKiAvLyA9PiAnJ1xuICpcbiAqIF8udG9TdHJpbmcoLTApO1xuICogLy8gPT4gJy0wJ1xuICpcbiAqIF8udG9TdHJpbmcoWzEsIDIsIDNdKTtcbiAqIC8vID0+ICcxLDIsMydcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9TdHJpbmc7XG4iLCJ2YXIgYmFzZVVuaXEgPSByZXF1aXJlKCcuL19iYXNlVW5pcScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkdXBsaWNhdGUtZnJlZSB2ZXJzaW9uIG9mIGFuIGFycmF5LCB1c2luZ1xuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucywgaW4gd2hpY2ggb25seSB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBlYWNoIGVsZW1lbnRcbiAqIGlzIGtlcHQuIFRoZSBvcmRlciBvZiByZXN1bHQgdmFsdWVzIGlzIGRldGVybWluZWQgYnkgdGhlIG9yZGVyIHRoZXkgb2NjdXJcbiAqIGluIHRoZSBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlIGZyZWUgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udW5pcShbMiwgMSwgMl0pO1xuICogLy8gPT4gWzIsIDFdXG4gKi9cbmZ1bmN0aW9uIHVuaXEoYXJyYXkpIHtcbiAgcmV0dXJuIChhcnJheSAmJiBhcnJheS5sZW5ndGgpID8gYmFzZVVuaXEoYXJyYXkpIDogW107XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdW5pcTtcbiJdfQ==
