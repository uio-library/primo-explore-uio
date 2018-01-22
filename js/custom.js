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

            var payload = {
                last_action: this.lastAction,
                action: action,
                lang: this.getUserLanguage(),
                logged_in: this.isLoggedIn(),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvbG9nZ2luZy5zZXJ2aWNlLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL2pzL21haW4uanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvcHJtQWN0aW9uTGlzdEFmdGVyLmNvbXBvbmVudC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9qcy9wcm1CcmllZlJlc3VsdENvbnRhaW5lckFmdGVyLmNvbXBvbmVudC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9qcy9wcm1Ccm93c2VTZWFyY2hBZnRlci5jb21wb25lbnQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvcHJtRnVsbFZpZXdBZnRlci5jb21wb25lbnQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvcHJtTm9TZWFyY2hSZXN1bHRBZnRlci5jb21wb25lbnQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvcHJtU2F2ZVRvRmF2b3JpdGVzQnV0dG9uQWZ0ZXIuY29tcG9uZW50LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL2pzL3BybVNlYXJjaEFmdGVyLmNvbXBvbmVudC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9qcy9wcm1TZWFyY2hCYXJBZnRlci5jb21wb25lbnQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvcHJtU2VhcmNoUmVzdWx0TGlzdEFmdGVyLmNvbXBvbmVudC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9qcy9wcm1TaWxlbnRMb2dpbkFmdGVyLmNvbXBvbmVudC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9qcy92aWV3TmFtZS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19IYXNoLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX0xpc3RDYWNoZS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19NYXAuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fTWFwQ2FjaGUuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fU2V0LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1NldENhY2hlLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1N5bWJvbC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19hcHBseS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19hcnJheUluY2x1ZGVzLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5SW5jbHVkZXNXaXRoLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5TWFwLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5UHVzaC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19hc3NpZ25WYWx1ZS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19hc3NvY0luZGV4T2YuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUFzc2lnblZhbHVlLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VGaW5kSW5kZXguanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUZsYXR0ZW4uanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUdldC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VIYXNJbi5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSW5kZXhPZi5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNBcmd1bWVudHMuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzTmFOLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc05hdGl2ZS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlUGljay5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlUGlja0J5LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VTZXQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVNldFRvU3RyaW5nLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VUb1N0cmluZy5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlVW5pcS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19jYWNoZUhhcy5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19jYXN0UGF0aC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19jb3JlSnNEYXRhLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NyZWF0ZVNldC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19kZWZpbmVQcm9wZXJ0eS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19mbGF0UmVzdC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldE1hcERhdGEuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0TmF0aXZlLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRWYWx1ZS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNQYXRoLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hDbGVhci5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoRGVsZXRlLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hHZXQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9faGFzaEhhcy5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoU2V0LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzRmxhdHRlbmFibGUuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNJbmRleC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19pc0tleS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19pc0tleWFibGUuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNNYXNrZWQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlQ2xlYXIuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlRGVsZXRlLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2xpc3RDYWNoZUdldC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19saXN0Q2FjaGVIYXMuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlU2V0LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcENhY2hlQ2xlYXIuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVEZWxldGUuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVHZXQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVIYXMuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVTZXQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWVtb2l6ZUNhcHBlZC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19uYXRpdmVDcmVhdGUuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fb2JqZWN0VG9TdHJpbmcuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fb3ZlclJlc3QuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fcm9vdC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19zZXRDYWNoZUFkZC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19zZXRDYWNoZUhhcy5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL19zZXRUb0FycmF5LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3NldFRvU3RyaW5nLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3Nob3J0T3V0LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3N0cmljdEluZGV4T2YuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RyaW5nVG9QYXRoLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3RvS2V5LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3RvU291cmNlLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvY29uc3RhbnQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9lcS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL2ZsYXR0ZW4uanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9nZXQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9oYXNJbi5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL2lkZW50aXR5LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcmd1bWVudHMuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0FycmF5LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNGdW5jdGlvbi5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL2lzTGVuZ3RoLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3QuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL21lbW9pemUuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vbm9kZV9tb2R1bGVzL2xvZGFzaC9ub29wLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvcGljay5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9ub2RlX21vZHVsZXMvbG9kYXNoL3RvU3RyaW5nLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL25vZGVfbW9kdWxlcy9sb2Rhc2gvdW5pcS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVNLGM7Ozs7O0FBRUY7Ozs7Ozs7Ozs7QUFVQTs7Ozs4QkFJTTtBQUNGLGdCQUFJLFFBQVEsS0FBWjs7QUFFQSxnQkFBSSxPQUFPLEdBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxTQUFkLENBQVg7QUFDQSxpQkFBSyxDQUFMLElBQVUsYUFBYSxLQUFLLENBQUwsQ0FBdkI7QUFDQSxnQkFBSSxLQUFKLEVBQVcsUUFBUSxHQUFSLENBQVksS0FBWixDQUFrQixJQUFsQixFQUF3QixJQUF4QjtBQUNkOzs7QUFFRCw0QkFBWSxVQUFaLEVBQXdCO0FBQUE7O0FBQUE7O0FBQ3BCLGFBQUssVUFBTCxHQUFrQixVQUFsQjs7QUFFQTtBQUNBLGFBQUssWUFBTCxHQUFvQixJQUFwQjs7QUFFQTtBQUNBO0FBQ0EsYUFBSyxrQkFBTCxHQUEwQixJQUExQjtBQUNBLGFBQUsseUJBQUwsR0FBaUMsSUFBakM7O0FBRUEsYUFBSyxVQUFMLEdBQWtCLElBQWxCOztBQUVBO0FBQ0EsYUFBSyxLQUFMLEdBQWEsRUFBYjs7QUFFQTtBQUNBLGFBQUssSUFBTCxHQUFZLElBQVo7O0FBRUE7QUFDQSxhQUFLLFVBQUwsR0FBa0IsQ0FBbEI7O0FBRUE7QUFDQSxhQUFLLE1BQUwsR0FBYyxLQUFkOztBQUVBO0FBQ0EsYUFB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O0FDVmY7QUFDQSxJQUFNLFdBQVcsS0FBakI7a0JBQ2UsUTs7O0FDRmY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBnZXQgZnJvbSAnbG9kYXNoL2dldCc7XG5pbXBvcnQgdW5pcSBmcm9tICdsb2Rhc2gvdW5pcSc7XG5pbXBvcnQgcGljayBmcm9tICdsb2Rhc2gvcGljayc7XG5cbmNsYXNzIExvZ2dpbmdTZXJ2aWNlIHtcblxuICAgIC8qXG4gICAgJHJvb3RTY29wZTogSVJvb3RTY29wZVNlcnZpY2U7XG4gICAgcHJpbW9WZXJzaW9uOiBzdHJpbmc7XG4gICAgc2VhcmNoU3RhdGVTZXJ2aWNlOiBTZWFyY2hTdGF0ZVNlcnZpY2U7XG4gICAgdHJhaWw6IGxpc3Q7XG4gICAga2V5cHJlc3NlczogbnVtYmVyXG4gICAgcGFzdGVkOiBib29sZWFuXG4gICAgdDE6IERhdGVcbiAgICAqL1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgbG9nKCkge1xuICAgICAgICBsZXQgZGVidWcgPSBmYWxzZTtcblxuICAgICAgICBsZXQgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgYXJnc1swXSA9ICdbc2x1cnBdICcgKyBhcmdzWzBdO1xuICAgICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCRyb290U2NvcGUpIHtcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcblxuICAgICAgICAvLyBQcmltbyB2ZXJzaW9uXG4gICAgICAgIHRoaXMucHJpbW9WZXJzaW9uID0gbnVsbDtcblxuICAgICAgICAvLyBVbmZvcnR1bmF0ZWx5IG1hbnkgb2YgdGhlIFByaW1vIHNlcnZpY2VzIGFyZSBub3QgaW5qZWN0YWJsZSwgc28gd2UgbmVlZFxuICAgICAgICAvLyB0byBnZXQgdGhlbSBmcm9tIG9uZSBvZiB0aGUgY29tcG9uZW50cyB3aGVuIHJlYWR5LlxuICAgICAgICB0aGlzLnNlYXJjaFN0YXRlU2VydmljZSA9IG51bGw7XG4gICAgICAgIHRoaXMudXNlclNlc3Npb25NYW5hZ2VyU2VydmljZSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5sYXN0QWN0aW9uID0gbnVsbDtcblxuICAgICAgICAvLyBOYXZpZ2F0aW9uIHRyYWlsXG4gICAgICAgIHRoaXMudHJhaWwgPSBbXTtcblxuICAgICAgICAvLyBVc2VyIGxhbmd1YWdlXG4gICAgICAgIHRoaXMubGFuZyA9IG51bGw7XG5cbiAgICAgICAgLy8gTnVtYmVyIG9mIGtleXByZXNzZXMgaW4gbWFpbiBzZWFyY2ggZmllbGQuIFRyYWNrZWQgYnkgcHJtU2VhcmNoQmFyQWZ0ZXJcbiAgICAgICAgdGhpcy5rZXlwcmVzc2VzID0gMDtcblxuICAgICAgICAvLyBSZWNlaXZlZCBhIHBhc3RlIGV2ZW50PyBUcmFja2VkIGJ5IHBybVNlYXJjaEJhckFmdGVyXG4gICAgICAgIHRoaXMucGFzdGVkID0gZmFsc2U7XG5cbiAgICAgICAgLy8gU2VydmVyIHVybFxuICAgICAgICB0aGlzLnVybCA9ICdodHRwczovL3ViLXd3dzAxLnVpby5uby9zbHVycC8nO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlKSA9PiB7XG4gICAgICAgICAgICB2YXIgc2MgPSB7XG4gICAgICAgICAgICAgICAgZnJvbTogZnJvbVN0YXRlLm5hbWUsXG4gICAgICAgICAgICAgICAgZnJvbVRpbWU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgdG86IHRvU3RhdGUubmFtZSxcbiAgICAgICAgICAgICAgICB0b1RpbWU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB0b1BhcmFtcyxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0b1BhcmFtcy5sYW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYW5nID0gdG9QYXJhbXMubGFuZztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGR0ID0gJyc7XG4gICAgICAgICAgICBpZiAodGhpcy50cmFpbC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgc2MuZnJvbVRpbWUgPSB0aGlzLnRyYWlsW3RoaXMudHJhaWwubGVuZ3RoIC0gMV0udG9UaW1lO1xuICAgICAgICAgICAgICAgIGR0ID0gYGFmdGVyICR7KHNjLnRvVGltZSAtIHNjLmZyb21UaW1lKS8xMDAwfSBzZWNzYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudHJhaWwucHVzaChzYyk7XG4gICAgICAgICAgICB0aGlzLnQxID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGAlY1N0YXRlIGNoYW5nZWQgZnJvbSAke3NjLmZyb219IHRvICR7c2MudG99ICR7ZHR9YCwgJ2JhY2tncm91bmQ6IGdyZWVuOyBjb2xvcjogd2hpdGU7IGRpc3BsYXk6IGJsb2NrOycpO1xuXG4gICAgICAgICAgICAvLyBpZiAodG9TdGF0ZS5uYW1lID09ICdleHBsb3JlTWFpbi5zZWFyY2gnKSB7XG4gICAgICAgICAgICAvLyAgIHJlcS5wYXJhbXMgPSB7XG4gICAgICAgICAgICAvLyAgICAgbW9kZTogdG9QYXJhbXMubW9kZSwgIC8vICdhZHZhbmNlZCcgb3IgJz8nXG4gICAgICAgICAgICAvLyAgICAgbGFuZzogdG9QYXJhbXMubGFuZyxcbiAgICAgICAgICAgIC8vICAgICBxdWVyeTogdG9QYXJhbXMucXVlcnksXG4gICAgICAgICAgICAvLyAgICAgc2VhcmNoX3Njb3BlOiB0b1BhcmFtcy5zZWFyY2hfc2NvcGUsICAvLyAnZGVmYXVsdCcsICdldmVyeXRoaW5nJywgJ2xvY2FsX3Njb3BlJyAoQsO4a2VyIHZlZCBVaU8pLCAnYmlic3lzX2lscycsIC4uXG4gICAgICAgICAgICAvLyAgICAgdGFiOiB0b1BhcmFtcy50YWIsICAvLyAnZGVmYXVsdF90YWInLCAnZXZlcnl0aGluZycsICdsb2NhbF91aW8nLCAnYmlic3lzX2NvbnNvcnRpYScgLi4uXG4gICAgICAgICAgICAvLyAgICAgc29ydGJ5OiB0b1BhcmFtcy5zb3J0YnksICAvLyBcInJhbmtcIlxuXG4gICAgICAgICAgICAvLyAgICAgLy8gcGZpbHRlcjogTWF0ZXJpYWx0eXBlL3NwcsOlay91dGdpdmVsc2VzZGF0b1xuICAgICAgICAgICAgLy8gICAgIC8vIENhbiBiZSBlaXRoZXIgYSBzdHJpbmcgb3IgYW4gYXJyYXkhXG4gICAgICAgICAgICAvLyAgICAgLy8gRXhhbXBsZXM6XG4gICAgICAgICAgICAvLyAgICAgLy8gIC0gXCJwZmlsdGVyLGV4YWN0LGJvb2tzLEFORFwiXG4gICAgICAgICAgICAvLyAgICAgLy8gIC0gW1wibGFuZyxleGFjdCxub3IsQU5EXCIsIFwicGZpbHRlcixleGFjdCxib29rcyxBTkRcIiwgXCJjcmVhdGlvbmRhdGUsZXhhY3QsMS1ZRUFSLEFORFwiXVxuICAgICAgICAgICAgLy8gICAgIHBmaWx0ZXI6IHRvUGFyYW1zLnBmaWx0ZXIsXG5cbiAgICAgICAgICAgIC8vICAgICAvLyBGYWNldHNcbiAgICAgICAgICAgIC8vICAgICAvLyBDYW4gYmUgZWl0aGVyIGEgc3RyaW5nIG9yIGFuIGFycmF5IVxuICAgICAgICAgICAgLy8gICAgIC8vIEV4YW1wbGVzOlxuICAgICAgICAgICAgLy8gICAgIC8vICAtIFwibG9jYWw0LGluY2x1ZGUsTkJcIlxuICAgICAgICAgICAgLy8gICAgIC8vICAtIFtcImxvY2FsNCxpbmNsdWRlLE5CXCIsIFwibG9jYWwxMCxpbmNsdWRlLDY0MS41XCIsIFwibG9jYWwxNCxpbmNsdWRlLE1hdG9wcHNrcmlmdGVyXCJdXG4gICAgICAgICAgICAvLyAgICAgZmFjZXQ6IHRvUGFyYW1zLmZhY2V0LFxuICAgICAgICAgICAgLy8gICB9O1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIEludGVybmFsIG1ldGhvZHNcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIGlzTG9nZ2VkSW4oKSB7XG4gICAgICAgIGlmICghdGhpcy51c2VyU2Vzc2lvbk1hbmFnZXJTZXJ2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICEhdGhpcy51c2VyU2Vzc2lvbk1hbmFnZXJTZXJ2aWNlLmdldFVzZXJOYW1lKCkubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldFVzZXJMYW5ndWFnZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZXJTZXNzaW9uTWFuYWdlclNlcnZpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhbmc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy51c2VyU2Vzc2lvbk1hbmFnZXJTZXJ2aWNlLmdldFVzZXJMYW5ndWFnZSgpO1xuICAgIH1cblxuICAgIHNpbXBsaWZ5UmVjb3JkKHJlY29yZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6ICAgICAgICAgIGdldChyZWNvcmQsICdwbnguY29udHJvbC5yZWNvcmRpZC4wJyksXG4gICAgICAgICAgICBpc19sb2NhbDogICAgZ2V0KHJlY29yZCwgJ2NvbnRleHQnKSA9PSAnTCcsXG4gICAgICAgICAgICBhZGRzX2lkOiAgICAgZ2V0KHJlY29yZCwgJ3BueC5jb250cm9sLmFkZHNyY3JlY29yZGlkLjAnKSxcbiAgICAgICAgICAgIHNvdXJjZTogICAgICBnZXQocmVjb3JkLCAncG54LmNvbnRyb2wuc291cmNlc3lzdGVtLjAnKSxcbiAgICAgICAgICAgIGRkYzogICAgICAgICB1bmlxKGdldChyZWNvcmQsICdwbnguZmFjZXRzLmxmYzEwJywgW10pKSxcbiAgICAgICAgICAgIGh1bWU6ICAgICAgICB1bmlxKGdldChyZWNvcmQsICdwbnguZmFjZXRzLmxmYzE0JywgW10pKSxcbiAgICAgICAgICAgIHJlYWw6ICAgICAgICB1bmlxKGdldChyZWNvcmQsICdwbnguZmFjZXRzLmxmYzIwJywgW10pKSxcbiAgICAgICAgICAgIHJzcmN0eXBlOiAgICBnZXQocmVjb3JkLCAncG54LmZhY2V0cy5yc3JjdHlwZScsIFtdKSxcbiAgICAgICAgICAgIGRpc3B0eXBlOiAgICBnZXQocmVjb3JkLCAncG54LmRpc3BsYXkudHlwZS4wJyksXG4gICAgICAgICAgICB0aXRsZTogICAgICAgZ2V0KHJlY29yZCwgJ3BueC5kaXNwbGF5LnRpdGxlLjAnKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHRyYWNrRXZlbnQoYWN0aW9uLCBkYXRhKSB7XG4gICAgICAgIGxldCBzaXplID0gSlNPTi5zdHJpbmdpZnkoZGF0YSkubGVuZ3RoO1xuICAgICAgICB0aGlzLmxvZyhgJWNUcmFjayBcIiR7YWN0aW9ufVwiIGFjdGlvbiAoJHtzaXplfSBieXRlcylgLCAnYmFja2dyb3VuZDogZ3JlZW47IGNvbG9yOiB3aGl0ZTsgZGlzcGxheTogYmxvY2s7Jyk7XG4gICAgICAgIHRoaXMubG9nKCcnLCBkYXRhKTtcblxuICAgICAgICBsZXQgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgIGxhc3RfYWN0aW9uOiB0aGlzLmxhc3RBY3Rpb24sXG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGxhbmc6IHRoaXMuZ2V0VXNlckxhbmd1YWdlKCksXG4gICAgICAgICAgICBsb2dnZWRfaW46IHRoaXMuaXNMb2dnZWRJbigpLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIHNlc3Npb25faWQ6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3NsdXJwU2Vzc2lvbklkJyksXG4gICAgICAgICAgICBzZXNzaW9uX3N0YXJ0OiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdzbHVycFNlc3Npb25TdGFydCcpLFxuICAgICAgICAgICAgYWN0aW9uX25vOiBwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdzbHVycEFjdGlvbk5vJykpIHx8IDEsXG4gICAgICAgICAgICBoaXN0OiB3aW5kb3cuaGlzdG9yeS5sZW5ndGgsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5sYXN0QWN0aW9uID0gYWN0aW9uO1xuXG4gICAgICAgIC8vIERvbid0IHVzZSAkaHR0cCBzaW5jZSB3ZSBkb24ndCB3YW50IHRoZSBQcmltbyBkZWZhdWx0IGhlYWRlcnMgZXRjLlxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGxldCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZihyZXEucmVhZHlTdGF0ZSA9PT0gWE1MSHR0cFJlcXVlc3QuRE9ORSAmJiByZXEuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlcyA9IEpTT04ucGFyc2UocmVxLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3NsdXJwU2Vzc2lvbklkJywgcmVzLnNlc3Npb25faWQpO1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdzbHVycFNlc3Npb25TdGFydCcsIHJlcy5zZXNzaW9uX3N0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnc2x1cnBBY3Rpb25ObycsIHJlcy5hY3Rpb25fbm8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXEub3BlbignUE9TVCcsIHRoaXMudXJsKTtcbiAgICAgICAgICAgIHJlcS5zZW5kKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdHJhY2tFcnJvcihtc2cpIHtcbiAgICAgICAgdGhpcy5sb2coYCVjJHttc2d9YCwgJ2JhY2tncm91bmQ6IHJlZDsgY29sb3I6IHdoaXRlOyBkaXNwbGF5OiBibG9jazsnKTtcbiAgICAgICAgLy8gVE9ETzogQWN0dWFsbHkgc2VuZCBzb21ldGhpbmcgdG8gc2VydmVyXG4gICAgfVxuXG4gICAgdHJhY2tTZWFyY2goc2VhcmNoLCByZXN1bHQsIHBhZ2VObykge1xuICAgICAgICBpZiAoIXRoaXMudHJhaWwubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yKCdPdWNoIScpO1xuICAgICAgICAgICAgLy8gc29tZXRoaW5nIGlzIHdyb25nXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRyYWlsU3RlcCA9IHRoaXMudHJhaWxbdGhpcy50cmFpbC5sZW5ndGggLSAxXTtcbiAgICAgICAgbGV0IGR0ID0gbmV3IERhdGUoKSAtIHRyYWlsU3RlcC50b1RpbWU7XG4gICAgICAgIHRoaXMubG9nKGAlY0dvdCBzZWFyY2ggcmVzdWx0cyBhZnRlciB3YWl0aW5nICR7ZHQvMTAwMC59IHNlY3NgLCAnYmFja2dyb3VuZDogZ3JlZW47IGNvbG9yOiB3aGl0ZTsgZGlzcGxheTogYmxvY2s7Jyk7XG4gICAgICAgIHRoaXMubG9nKCcnLCBzZWFyY2gsIHJlc3VsdCk7XG5cbiAgICAgICAgbGV0IHJlY3MgPSByZXN1bHQuZGF0YS5tYXAodGhpcy5zaW1wbGlmeVJlY29yZCk7XG5cbiAgICAgICAgbGV0IGZhY2V0cyA9IHNlYXJjaC5mYWNldHMubWFwKGZhY2V0ID0+IHBpY2soZmFjZXQsIFtcbiAgICAgICAgICAgICduYW1lJywgICAgICAgICAgICAgICAvLyBleDogJ2xvY2FsMjAnXG4gICAgICAgICAgICAndmFsdWUnLCAgICAgICAgICAgICAgLy8gZXg6ICdGaXNrZXInXG4gICAgICAgICAgICAndHlwZScsICAgICAgICAgICAgICAgLy8gZXg6ICdpbmNsdWRlJ1xuICAgICAgICAgICAgJ211bHRpRmFjZXRHcm91cElkJywgIC8vIGludFxuICAgICAgICBdKSk7XG5cbiAgICAgICAgLy8gLSBNdWx0aXBsZSBxdWVyeSBwYXJ0cyBhcmUgc3BsaXQgYnkgc2VtaWNvbG9uXG4gICAgICAgIC8vIC0gRWFjaCBwYXJ0IGNvbnNpc3RzIG9mIHtmaWVsZH0se3ByZWNpc2lvbn0se3Rlcm19LHtvcGVyYXRvcn1cbiAgICAgICAgLy8gLSBTZW1pY29sb25zIGFyZSBzdHJpcHBlZCBmcm9tIHF1ZXJpZXMuXG4gICAgICAgIC8vIC0gQ29sb25zIGFyZSBpbmNsdWRlZCBhbmQgTk9UIGVzY2FwZWQuIEV4YW1wbGU6XG4gICAgICAgIC8vICAgICAgdGl0bGUsY29udGFpbnMsZmlza2VyLGtyYWJiZXIsT1I7Y3JlYXRvcixjb250YWlucyx0b3IsTk9UO2FueSxleGFjdCxsYWtzLEFORFxuICAgICAgICAvLyAtIEluIGFkdmFuY2VkIHNlYXJjaCwgdGhlcmUgaXMgYWx3YXlzIGEgdHJhaWxpbmcgb3BlcmF0b3IsIGluIHNpbXBsZSBzZWFyY2ggbm90LlxuICAgICAgICAvLyAtIE1hdGVyaWFsIHR5cGUsIGxhbmd1YWdlIGFuZCBkYXRlIHNlbGVjdGVkIGluIGFkdmFuY2VkIHNlYXJjaCBhcmUgaW5jbHVkZWQgYXNcbiAgICAgICAgLy8gICBwYXJ0IG9mIHRoZSBxdWVyeSwgYnV0IHByZWZpeGVkIHdpdGggXCJmYWNldF9cIlxuXG4gICAgICAgIGxldCBxdWVyeSA9IFtdLCBxdWVyeV9mYWNldHMgPSBbXTtcblxuICAgICAgICBzZWFyY2gucXVlcnkuc3BsaXQoLzsvKS5mb3JFYWNoKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgIGxldCBjb21wID0geC5zcGxpdCgvLC8pO1xuICAgICAgICAgICAgbGV0IHJlcztcblxuICAgICAgICAgICAgaWYgKGNvbXBbY29tcC5sZW5ndGgtMV0ubWF0Y2goL14oPzpBTkR8T1J8Tk9UKSQvKSkge1xuICAgICAgICAgICAgICAgIHJlcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgb3A6IGNvbXBbY29tcC5sZW5ndGgtMV0sXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBjb21wWzBdLFxuICAgICAgICAgICAgICAgICAgICBwcmVjOiBjb21wWzFdLFxuICAgICAgICAgICAgICAgICAgICB0ZXJtOiBjb21wLnNsaWNlKDIsIGNvbXAubGVuZ3RoLTEpLmpvaW4oJywnKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIG9wOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogY29tcFswXSxcbiAgICAgICAgICAgICAgICAgICAgcHJlYzogY29tcFsxXSxcbiAgICAgICAgICAgICAgICAgICAgdGVybTogY29tcC5zbGljZSgyLCBjb21wLmxlbmd0aCkuam9pbignLCcpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVzLmZpZWxkLm1hdGNoKC9eZmFjZXRfLykpIHtcbiAgICAgICAgICAgICAgICBxdWVyeV9mYWNldHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiByZXMuZmllbGQsXG4gICAgICAgICAgICAgICAgICAgIHByZWM6IHJlcy5wcmVjLFxuICAgICAgICAgICAgICAgICAgICB0ZXJtOiByZXMudGVybSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcXVlcnkucHVzaChyZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gcXVlcnkubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgcXVlcnlbaV0ub3AgPSBxdWVyeVtpIC0gMV0ub3A7XG4gICAgICAgIH1cbiAgICAgICAgcXVlcnlbMF0ub3AgPSBudWxsO1xuXG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgdHJhaWxTdGVwOiB0aGlzLnRyYWlsLmxlbmd0aCxcblxuICAgICAgICAgICAga2V5cHJlc3NlczogdGhpcy5rZXlwcmVzc2VzLFxuICAgICAgICAgICAgcGFzdGVkOiB0aGlzLnBhc3RlZCxcbiAgICAgICAgICAgIHByZXBUaW1lOiB0cmFpbFN0ZXAudG9UaW1lIC0gdHJhaWxTdGVwLmZyb21UaW1lLFxuICAgICAgICAgICAgbG9hZFRpbWU6IChuZXcgRGF0ZSgpIC0gdHJhaWxTdGVwLnRvVGltZSksXG4gICAgICAgICAgICB2ZXJzaW9uOiB0aGlzLnByaW1vVmVyc2lvbixcblxuICAgICAgICAgICAgLy8gU2VhcmNoXG4gICAgICAgICAgICBhZHZhbmNlZDogc2VhcmNoLm1vZGUgPT0gJ2FkdmFuY2VkJyxcbiAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgIHF1ZXJ5X2ZhY2V0czogcXVlcnlfZmFjZXRzLFxuICAgICAgICAgICAgc2NvcGU6IHNlYXJjaC5zY29wZSwgICAgLy8gVHJlbmdlciB2aSBiw6VkZSBzY29wZSBvZyB0YWI/XG4gICAgICAgICAgICBzb3J0OiBzZWFyY2guc29ydGJ5LFxuICAgICAgICAgICAgZmFjZXRzOiBmYWNldHMsXG5cbiAgICAgICAgICAgIC8vIFJlc3VsdHNcbiAgICAgICAgICAgIGZpcnN0OiBwYXJzZUludChyZXN1bHQuaW5mby5maXJzdCksXG4gICAgICAgICAgICBsYXN0OiBwYXJzZUludChyZXN1bHQuaW5mby5sYXN0KSxcbiAgICAgICAgICAgIHRvdGFsOiBwYXJzZUludChyZXN1bHQuaW5mby50b3RhbCksXG4gICAgICAgICAgICByZXN1bHRzOiByZWNzLm1hcCgoeCkgPT4geC5pZCksXG4gICAgICAgICAgICBwYWdlX25vOiBwYWdlTm8sXG5cbiAgICAgICAgICAgIGFnZ3M6IHtcbiAgICAgICAgICAgICAgICByZWNvcmRzOiByZWNzLmxlbmd0aCwgIC8vIGdyZWl0IMOlIGhhIGxldHQgdGlsZ2plbmdlbGlnIGZvciDDpSBrdW5uZSByZWduZSBwcm9zZW50ZXJcbiAgICAgICAgICAgICAgICBpc19sb2NhbDogcmVjcy5maWx0ZXIoKHgpID0+IHguaXNfbG9jYWwpLmxlbmd0aCwgIC8vIGZvciDDpSBzaSBub2Ugb20gaHZvciBtYW5nZSBhdiB0cmVmZmVuZSBzb20gZXIgcmVsZXZhbnRlIGZvciBlbW5lc8O4az9cbiAgICAgICAgICAgICAgICBoYXNfZGV3ZXk6IHJlY3MuZmlsdGVyKCh4KSA9PiB4LmRkYy5sZW5ndGgpLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBoYXNfaHVtb3JkOiByZWNzLmZpbHRlcigoeCkgPT4geC5odW1lLmxlbmd0aCkubGVuZ3RoLFxuICAgICAgICAgICAgICAgIGhhc19ydDogcmVjcy5maWx0ZXIoKHgpID0+IHgucmVhbC5sZW5ndGgpLmxlbmd0aCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gdmFyIHN1bW1hcnkgPSBgJHtkYXRhLnNjb3BlfToke2RhdGEucXVlcnl9OiBMb2FkZWQgJHtkYXRhLnJlc3VsdHMubGVuZ3RofSBvZiAke2RhdGEudG90YWx9IHJlc3VsdHMsIG9mIHdoaWNoXG4gICAgICAgIC8vICAgICAke2RhdGEuYWdncy5pc19sb2NhbH0gbG9jYWwgKG5vbi1QQ0kpLCAke2RhdGEuYWdncy5oYXNfZGV3ZXl9IGdvdCBEREMsXG4gICAgICAgIC8vICAgICAke2RhdGEuYWdncy5oYXNfaHVtb3JkfSBnb3QgSHVtb3JkLCAke2RhdGEuYWdncy5oYXNfcnR9IGdvdCBSZWFsZmFnc3Rlcm1lci5gO1xuICAgICAgICAvLyBUT0RPOiBOb3RpZnkgYXMgZXZlbnQ/XG5cbiAgICAgICAgbGV0IGFjdGlvbiA9ICdzZWFyY2gnO1xuICAgICAgICBpZiAoZ2V0KHNlYXJjaCwgJ2ZhY2V0cy4wLm5hbWUnKSA9PSAnZnJicmdyb3VwaWQnKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSAnZXhwYW5kX2ZyYnJfZ3JvdXAnO1xuICAgICAgICB9IGVsc2UgaWYgKHBhZ2VObyA+IDEpIHtcbiAgICAgICAgICAgIGFjdGlvbiA9ICdjaGFuZ2VfcGFnZSc7XG4gICAgICAgIH0gZWxzZSBpZiAoZmFjZXRzLmxlbmd0aCkge1xuICAgICAgICAgICAgYWN0aW9uID0gJ3JlZmluZW1lbnQnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmFja0V2ZW50KGFjdGlvbiwgZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBJbnRlcmZhY2UgZm9yIHBybVNlYXJjaEJhckFmdGVyXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvLyBwdWJsaWNcbiAgICBpbml0U2VhcmNoQmFyKCkge1xuICAgICAgICB0aGlzLnBhc3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmtleXByZXNzZXMgPSAwO1xuICAgIH1cblxuICAgIC8vIHB1YmxpY1xuICAgIGluY3JLZXlwcmVzc0NvdW50KCkge1xuICAgICAgICB0aGlzLmtleXByZXNzZXMrKztcbiAgICB9XG5cbiAgICAvLyBwdWJsaWNcbiAgICBzZXRTZWFyY2hTdGF0ZVNlcnZpY2Uoc2VhcmNoU3RhdGVTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoU3RhdGVTZXJ2aWNlID0gc2VhcmNoU3RhdGVTZXJ2aWNlO1xuICAgIH1cblxuICAgIC8vIHB1YmxpY1xuICAgIHNldFVzZXJTZXNzaW9uTWFuYWdlclNlcnZpY2UodXNlclNlc3Npb25NYW5hZ2VyU2VydmljZSkge1xuICAgICAgICB0aGlzLnVzZXJTZXNzaW9uTWFuYWdlclNlcnZpY2UgPSB1c2VyU2Vzc2lvbk1hbmFnZXJTZXJ2aWNlO1xuICAgIH1cblxuICAgIC8vIHB1YmxpY1xuICAgIHNldFByaW1vVmVyc2lvbih2ZXJzaW9uKSB7XG4gICAgICAgIHRoaXMucHJpbW9WZXJzaW9uID0gdmVyc2lvbjtcbiAgICB9XG5cbiAgICAvLyBwdWJsaWNcbiAgICBzZWFyY2hCYXJFbGVtZW50UGFzdGVFdmVudCgpIHtcbiAgICAgICAgdGhpcy5wYXN0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogSW50ZXJmYWNlIGZvciBwcm1TZWFyY2hSZXN1bHRMaXN0QWZ0ZXJcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCBjYWxsZWQgZnJvbSBwcm1TZWFyY2hSZXN1bHRMaXN0QWZ0ZXIgd2hlbiBhbnkgbnVtYmVyIG9mIHBhZ2VzXG4gICAgICogYXJlIGxvYWRlZC4gVGhpcyBhbHNvIGluZGljYXRlcyB0aGF0IHNlYXJjaCByZXN1bHRzIGFyZSByZWFkeS5cbiAgICAgKi9cbiAgICBzZWFyY2hQYWdlTG9hZGVkKHBhZ2VzKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLnNlYXJjaFN0YXRlU2VydmljZSkge1xuICAgICAgICAgICAgLy8gU29tZXRoaW5nIGlzIHJlYWxseSB3cm9uZ1xuICAgICAgICAgICAgdGhpcy50cmFja0Vycm9yKCdzZWFyY2hTdGF0ZVNlcnZpY2Ugbm90IGluamVjdGVkJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZWFyY2hTdGF0ZVNlcnZpY2UuaXNTZWFyY2hJblByb2dyZXNzKCkpIHtcbiAgICAgICAgICAgIHRoaXMudHJhY2tFcnJvcignc2VhcmNoU3RhdGVTZXJ2aWNlIHNlYXJjaCBzdGlsbCBpbiBwcm9ncmVzcycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlYXJjaCA9IHRoaXMuc2VhcmNoU3RhdGVTZXJ2aWNlLmdldFNlYXJjaE9iamVjdCgpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5zZWFyY2hTdGF0ZVNlcnZpY2UuZ2V0UmVzdWx0T2JqZWN0KCk7XG5cbiAgICAgICAgaWYgKCFzZWFyY2ggfHwgIXJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy50cmFja0Vycm9yKCdzZWFyY2hPYmplY3Qgb3IgcmVzdWx0T2JqZWN0IGlzIG1pc3NpbmcnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJhY2tTZWFyY2goc2VhcmNoLCByZXN1bHQsIHBhZ2VzKTtcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIEludGVyZmFjZSBmb3IgcHJtTm9TZWFyY2hSZXN1bHRBZnRlclxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgbm9SZXN1bHRzUGFnZUxvYWRlZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlYXJjaFN0YXRlU2VydmljZSkge1xuICAgICAgICAgICAgLy8gU29tZXRoaW5nIGlzIHJlYWxseSB3cm9uZ1xuICAgICAgICAgICAgdGhpcy50cmFja0Vycm9yKCdzZWFyY2hTdGF0ZVNlcnZpY2Ugbm90IGluamVjdGVkJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZWFyY2hTdGF0ZVNlcnZpY2UuaXNTZWFyY2hJblByb2dyZXNzKCkpIHtcbiAgICAgICAgICAgIHRoaXMudHJhY2tFcnJvcignc2VhcmNoU3RhdGVTZXJ2aWNlIHNlYXJjaCBzdGlsbCBpbiBwcm9ncmVzcycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlYXJjaCA9IHRoaXMuc2VhcmNoU3RhdGVTZXJ2aWNlLmdldFNlYXJjaE9iamVjdCgpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5zZWFyY2hTdGF0ZVNlcnZpY2UuZ2V0UmVzdWx0T2JqZWN0KCk7XG5cbiAgICAgICAgaWYgKCFzZWFyY2ggfHwgIXJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy50cmFja0Vycm9yKCdzZWFyY2hPYmplY3Qgb3IgcmVzdWx0T2JqZWN0IGlzIG1pc3NpbmcnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJhY2tTZWFyY2goc2VhcmNoLCByZXN1bHQpO1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogSW50ZXJmYWNlIGZvciBwcm1GdWxsVmlld0FmdGVyXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICB0cmFja1ZpZXdSZWNvcmQocmVjb3JkKSB7XG4gICAgICAgIHRoaXMubG9nKCdWaWV3IHJlY29yZCcsIHJlY29yZCk7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5zaW1wbGlmeVJlY29yZChyZWNvcmQpO1xuICAgICAgICB0aGlzLnRyYWNrRXZlbnQoJ3ZpZXdfcmVjb3JkJywgZGF0YSk7XG4gICAgfVxuXG4gICAgbGVhdmVWaWV3UmVjb3JkKHJlY29yZCkge1xuICAgICAgICB0aGlzLmxvZygnTGVhdmUgcmVjb3JkJywgcmVjb3JkKTtcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICBpZDogZ2V0KHJlY29yZCwgJ3BueC5jb250cm9sLnJlY29yZGlkLjAnKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50cmFja0V2ZW50KCdsZWF2ZV9yZWNvcmQnLCBkYXRhKTtcbiAgICB9XG5cbiAgICB0cmFja1NlbmRUbyhzZXJ2aWNlTmFtZSwgcmVjb3JkKSB7XG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgc2VydmljZTogc2VydmljZU5hbWUsXG4gICAgICAgICAgICByZWM6IHRoaXMuc2ltcGxpZnlSZWNvcmQocmVjb3JkKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50cmFja0V2ZW50KCdzZW5kX3RvJywgZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBJbnRlcmZhY2UgZm9yIHBybVNhdmVUb0Zhdm9yaXRlc0J1dHRvbkFmdGVyXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICB0cmFja1BpblJlY29yZChyZWNvcmQpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnNpbXBsaWZ5UmVjb3JkKHJlY29yZCk7XG4gICAgICAgIHRoaXMudHJhY2tFdmVudCgncGluX3JlY29yZCcsIGRhdGEpO1xuICAgIH1cblxuICAgIHRyYWNrVW5waW5SZWNvcmQocmVjb3JkKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5zaW1wbGlmeVJlY29yZChyZWNvcmQpO1xuICAgICAgICB0aGlzLnRyYWNrRXZlbnQoJ3VucGluX3JlY29yZCcsIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogSW50ZXJmYWNlIGZvciBwcm1TZWFyY2hBZnRlclxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgdHJhY2tIb21lKCkge1xuICAgICAgICB0aGlzLnRyYWNrRXZlbnQoJ2dvdG9faG9tZScsIHt9KTtcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIEludGVyZmFjZSBmb3IgcHJtQnJvd3NlU2VhcmNoQWZ0ZXJcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIHRyYWNrQnJvd3NlKGRhdGEpIHtcbiAgICAgICAgdGhpcy50cmFja0V2ZW50KCdicm93c2UnLCBkYXRhKTtcbiAgICB9XG5cbn1cblxuTG9nZ2luZ1NlcnZpY2UuJGluamVjdCA9IFsnJHJvb3RTY29wZSddO1xuXG5leHBvcnQgZGVmYXVsdCBMb2dnaW5nU2VydmljZTtcbiIsImltcG9ydCB2aWV3TmFtZSBmcm9tICcuL3ZpZXdOYW1lJztcbmltcG9ydCBMb2dnaW5nU2VydmljZSBmcm9tICcuL2xvZ2dpbmcuc2VydmljZSc7XG5cbmltcG9ydCBwcm1BY3Rpb25MaXN0QWZ0ZXIgZnJvbSAnLi9wcm1BY3Rpb25MaXN0QWZ0ZXIuY29tcG9uZW50JztcbmltcG9ydCBwcm1CcmllZlJlc3VsdENvbnRhaW5lckFmdGVyIGZyb20gJy4vcHJtQnJpZWZSZXN1bHRDb250YWluZXJBZnRlci5jb21wb25lbnQnO1xuaW1wb3J0IHBybUJyb3dzZVNlYXJjaEFmdGVyIGZyb20gJy4vcHJtQnJvd3NlU2VhcmNoQWZ0ZXIuY29tcG9uZW50JztcbmltcG9ydCBwcm1GdWxsVmlld0FmdGVyIGZyb20gJy4vcHJtRnVsbFZpZXdBZnRlci5jb21wb25lbnQnO1xuaW1wb3J0IHBybU5vU2VhcmNoUmVzdWx0QWZ0ZXIgZnJvbSAnLi9wcm1Ob1NlYXJjaFJlc3VsdEFmdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgcHJtU2F2ZVRvRmF2b3JpdGVzQnV0dG9uQWZ0ZXJDb21wb25lbnQgZnJvbSAnLi9wcm1TYXZlVG9GYXZvcml0ZXNCdXR0b25BZnRlci5jb21wb25lbnQnO1xuaW1wb3J0IHBybVNlYXJjaEFmdGVyQ29tcG9uZW50IGZyb20gJy4vcHJtU2VhcmNoQWZ0ZXIuY29tcG9uZW50JztcbmltcG9ydCBwcm1TZWFyY2hCYXJBZnRlckNvbmZpZyBmcm9tICcuL3BybVNlYXJjaEJhckFmdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgcHJtU2VhcmNoUmVzdWx0TGlzdEFmdGVyIGZyb20gJy4vcHJtU2VhcmNoUmVzdWx0TGlzdEFmdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgcHJtU2lsZW50TG9naW5BZnRlckNvbXBvbmVudCBmcm9tICcuL3BybVNpbGVudExvZ2luQWZ0ZXIuY29tcG9uZW50JztcblxuXG5jb25zdCBhcHAgPSBhbmd1bGFyLm1vZHVsZSgndmlld0N1c3RvbScsIFsnYW5ndWxhckxvYWQnXSk7XG5cbmFwcC5zZXJ2aWNlKCdsb2dnaW5nU2VydmljZScsIExvZ2dpbmdTZXJ2aWNlKTtcblxuLy8gU2VhcmNoQmFyOiBUaGUgc2VhcmNoIGZvcm0gYXQgdGhlIHRvcCBvZiB0aGUgcGFnZS4gTm90IHJlbG9hZGVkIG9uIG5vcm1hbCBwYWdlIGNoYW5nZXMuXG5hcHAuY29tcG9uZW50KCdwcm1TZWFyY2hCYXJBZnRlcicsIHBybVNlYXJjaEJhckFmdGVyQ29uZmlnKTtcblxuLy8gU2VhcmNoQWZ0ZXI6IEV2ZXJ5dGhpbmcgYmVsb3cgdGhlIHNlYXJjaGJhci4gUmVsb2FkZWQgb24gbm9ybWFsIHBhZ2UgY2hhbmdlc1xuYXBwLmNvbXBvbmVudCgncHJtU2VhcmNoQWZ0ZXInLCBwcm1TZWFyY2hBZnRlckNvbXBvbmVudCk7XG5cbi8vIEJyb3dzZVNlYXJjaEFmdGVyOiBFdmVyeXRoaW5nIGJlbG93IHRoZSBzZWFyY2hiYXIgZm9yIGJyb3dzZSBwYWdlcy4gUmVsb2FkZWQgb24gbm9ybWFsIHBhZ2UgY2hhbmdlc1xuYXBwLmNvbXBvbmVudCgncHJtQnJvd3NlU2VhcmNoQWZ0ZXInLCBwcm1Ccm93c2VTZWFyY2hBZnRlcik7XG5cbi8vIFNlYXJjaFJlc3VsdExpc3Q6IFRoZSBsaXN0IG9mIHNlYXJjaCByZXN1bHRzLCByZXBlYXRlZCBmb3IgZWFjaCBzZWFyY2ggcGFnZVxuYXBwLmNvbXBvbmVudCgncHJtU2VhcmNoUmVzdWx0TGlzdEFmdGVyJywgcHJtU2VhcmNoUmVzdWx0TGlzdEFmdGVyKTtcblxuLy8gTm9TZWFyY2hSZXN1bHQ6IElmIGEgc2VhcmNoIHlpZWxkcyB6ZXJvIHJlc3VsdHMsIHdlIGdldCB0aGlzIGluc3RlYWQgb2YgU2VhcmNoUmVzdWx0TGlzdFxuYXBwLmNvbXBvbmVudCgncHJtTm9TZWFyY2hSZXN1bHRBZnRlcicsIHBybU5vU2VhcmNoUmVzdWx0QWZ0ZXIpO1xuXG4vLyBCcmllZlJlc3VsdENvbnRhaW5lcjogRWFjaCBzZWFyY2ggcmVzdWx0IGluIHRoZSByZXN1bHRzIGxpc3RcbmFwcC5jb21wb25lbnQoJ3BybUJyaWVmUmVzdWx0Q29udGFpbmVyQWZ0ZXInLCBwcm1CcmllZlJlc3VsdENvbnRhaW5lckFmdGVyKTtcblxuLy8gRnVsbFZpZXc6IFRoZSBkZXRhaWxzIHZpZXcgZm9yIGEgc2luZ2xlIHJlY29yZFxuYXBwLmNvbXBvbmVudCgncHJtRnVsbFZpZXdBZnRlcicsIHBybUZ1bGxWaWV3QWZ0ZXIpO1xuXG4vLyBBY3Rpb25MaXN0OiBUaGUgYWN0aW9uIGJ1dHRvbiBiYXI6IEUtbWFpbCwgQ2l0ZSwgUGVybWFsaW5rLCBFbmRub3RlIGV4cG9ydCBldGMuXG5hcHAuY29tcG9uZW50KCdwcm1BY3Rpb25MaXN0QWZ0ZXInLCBwcm1BY3Rpb25MaXN0QWZ0ZXIpO1xuXG4vLyBTYXZlVG9GYXZvcml0ZXNCdXR0b246IFRoZSBcInBpbiByZWNvcmRcIiBidXR0b24sIHRoaXMgaXMgZm91bmQgaW4gbXVsdGlwbGUgcGxhY2VzXG5hcHAuY29tcG9uZW50KCdwcm1TYXZlVG9GYXZvcml0ZXNCdXR0b25BZnRlcicsIHBybVNhdmVUb0Zhdm9yaXRlc0J1dHRvbkFmdGVyQ29tcG9uZW50KTtcblxuLy8gU2lsZW50TG9naW46IENvbXBvbmVudCBvdXRzaWRlIHRoZSByb290IHVpVmlldy5cbmFwcC5jb21wb25lbnQoJ3BybVNpbGVudExvZ2luQWZ0ZXInLCBwcm1TaWxlbnRMb2dpbkFmdGVyQ29tcG9uZW50KTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuYXBwLnJ1bihbJyRyb290U2NvcGUnLCAnbG9nZ2luZ1NlcnZpY2UnLCAoJHJvb3RTY29wZSwgbG9nZ2luZ1NlcnZpY2UpID0+IHtcbiAgICAvLyBXQVJOSU5HOiBUaGlzIG1pZ2h0IG5vdCBiZSBjYWxsZWQgaWYgUHJpbW8gZXJyb3JzLi5cbiAgICAvLyBDb21wb25lbnRzIG1heSBzdGlsbCBiZSBpbml0aWFsaXplZFxuICAgICRyb290U2NvcGUudmlld05hbWUgPSB2aWV3TmFtZTtcbn1dKTtcbiIsIlxuY2xhc3MgUHJtQWN0aW9uTGlzdEFmdGVyQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IobG9nZ2luZ1NlcnZpY2UsICRkb2N1bWVudCwgJGVsZW1lbnQpIHtcbiAgICAgICAgLy8gTm90ZTogYWN0aW9uIGxpc3QgY2FuIGJlIHBhcnQgb2YgcmVzdWx0cyBsaXN0IE9SIHJlY29yZCB2aWV3LlxuICAgICAgICAkZG9jdW1lbnQucmVhZHkoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHBhcmVudEVsZW1lbnQgPSAkZWxlbWVudC5wYXJlbnQoKVswXTtcbiAgICAgICAgICAgIGxldCBidG5zID0gYW5ndWxhci5lbGVtZW50KHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3Njcm9sbEFjdGlvbkxpc3QgYnV0dG9uJykpO1xuXG4gICAgICAgICAgICBpZiAoIWJ0bnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3I6IE5vIGFjdGlvbiBidXR0b25zIGZvdW5kIScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBidG5zLm9uKCdjbGljaycsIChldnQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgc2VuZFRvVHlwZSA9IGV2dC5jdXJyZW50VGFyZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idXR0b24tdGV4dCcpWzBdLmdldEF0dHJpYnV0ZSgndHJhbnNsYXRlJyk7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnBhcmVudEN0cmwuaXRlbS5zcGxpdCgnLicpLnBvcCgpO1xuICAgICAgICAgICAgICAgIGxvZ2dpbmdTZXJ2aWNlLnRyYWNrU2VuZFRvKHNlbmRUb1R5cGUsIGl0ZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuUHJtQWN0aW9uTGlzdEFmdGVyQ29udHJvbGxlci4kaW5qZWN0ID0gWydsb2dnaW5nU2VydmljZScsICckZG9jdW1lbnQnLCAnJGVsZW1lbnQnXTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGJpbmRpbmdzOiB7cGFyZW50Q3RybDogJzwnfSxcbiAgICBjb250cm9sbGVyOiBQcm1BY3Rpb25MaXN0QWZ0ZXJDb250cm9sbGVyLFxuICAgIHRlbXBsYXRlOiAnJyxcbn07XG4iLCJcbmNsYXNzIFBybUJyaWVmUmVzdWx0Q29udGFpbmVyQWZ0ZXJDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnBhcmVudEN0cmwuaXRlbTtcbiAgICAgICAgLypjb25zb2xlLmxvZygnYnJpZWYgcmVzdWx0JywgdGhpcy5wYXJlbnRDdHJsLml0ZW0ucG54KTtcblxuICAgICAgICBsZXQgc3ViamVjdHMgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMucGFyZW50Q3RybC5pdGVtLnBueC5icm93c2UgJiYgdGhpcy5wYXJlbnRDdHJsLml0ZW0ucG54LmJyb3dzZS5zdWJqZWN0KSB7XG4gICAgICAgICAgICBzdWJqZWN0cyA9IHRoaXMucGFyZW50Q3RybC5pdGVtLnBueC5icm93c2Uuc3ViamVjdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1YmplY3RzID0gc3ViamVjdHMubWFwKChzdWIpID0+IHtcbiAgICAgICAgICAgIGxldCBvdXQgPSB7fTtcbiAgICAgICAgICAgIHN1Yi5yZXBsYWNlKC9eXFwkXFwkLywgJycsIHN1Yikuc3BsaXQoJyQkJykuZm9yRWFjaCgoeCkgPT4ge1xuICAgICAgICAgICAgICAgIG91dFt4LnN1YnN0cigwLCAxKV0gPSB4LnN1YnN0cigxKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IG5vdWJvbW4gPSBzdWJqZWN0cy5maWx0ZXIoKHN1YikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHN1Yi5UID09ICdOT1VCT01OJyAmJiBzdWIuUCAhPSAnTic7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgaHVtb3JkID0gc3ViamVjdHMuZmlsdGVyKChzdWIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzdWIuVCA9PSAnSFVNT1JEJyAmJiBzdWIuUCAhPSAnTic7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5kZGMgPSB0aGlzLnBhcmVudEN0cmwuaXRlbS5wbnguZGlzcGxheS5sZHMxMDtcbiAgICAgICAgJHNjb3BlLmh1bW9yZCA9IGh1bW9yZDtcbiAgICAgICAgJHNjb3BlLm5vdWJvbW4gPSBub3Vib21uO1xuICAgICAgICAqL1xuICAgIH1cbn1cblxuUHJtQnJpZWZSZXN1bHRDb250YWluZXJBZnRlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJ107XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBiaW5kaW5nczoge3BhcmVudEN0cmw6ICc8J30sXG4gICAgY29udHJvbGxlcjogUHJtQnJpZWZSZXN1bHRDb250YWluZXJBZnRlckNvbnRyb2xsZXIsXG4gICAgLypcbiAgICB0ZW1wbGF0ZTogYDxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOiByaWdodDsgZm9udC1zaXplOjkwJTsgcGFkZGluZzo1cHg7IGNvbG9yOiAjMzMzOyBiYWNrZ3JvdW5kOiAjZWVlO1wiPlxuICAgICAgICA8ZW0+RmxlcmUgYsO4a2VyIG9tOjwvZW0+XG5cbiAgICAgICAgPHNwYW4gbmctcmVwZWF0PVwieCBpbiBkZGNcIj5cbiAgICAgICAgICAgIDxhIHVpLXNyZWY9XCJleHBsb3JlTWFpbi5zZWFyY2goe3F1ZXJ5OiAnbHNyMTAsZXhhY3QsJyArIHgsIG1vZGU6ICdhZHZhbmNlZCd9KVwiPnt7eH19PC9hPiAmbmJzcDtcbiAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgIDxzcGFuIG5nLWlmPVwiaHVtb3JkLmxlbmd0aFwiPlxuICAgICAgICAgICAgSHVtb3JkOlxuICAgICAgICAgICAgPHNwYW4gbmctcmVwZWF0PVwieCBpbiBodW1vcmRcIj5cbiAgICAgICAgICAgICAgICA8YSB1aS1zcmVmPVwiZXhwbG9yZU1haW4uc2VhcmNoKHtxdWVyeTogJ2xzcjE0LGV4YWN0LCcgKyB4LkQsIG1vZGU6ICdhZHZhbmNlZCd9KVwiPnt7eC5EfX08L2E+ICZuYnNwO1xuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgPHNwYW4gbmctaWY9XCJub3Vib21uLmxlbmd0aFwiPlxuICAgICAgICAgICAgUmVhbGZhZ3N0ZXJtZXI6XG4gICAgICAgICAgICA8c3BhbiBuZy1yZXBlYXQ9XCJ4IGluIG5vdWJvbW5cIj5cbiAgICAgICAgICAgICAgICA8YSB1aS1zcmVmPVwiZXhwbG9yZU1haW4uc2VhcmNoKHtxdWVyeTogJ2xzcjIwLGV4YWN0LCcgKyB4LkQsIG1vZGU6ICdhZHZhbmNlZCd9KVwiPnt7eC5EfX08L2E+ICZuYnNwO1xuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgPC9kaXY+YCwqL1xufTtcbiIsImltcG9ydCBnZXQgZnJvbSAnbG9kYXNoL2dldCc7XG5cbmNsYXNzIFBybUJyb3dzZVNlYXJjaEFmdGVyQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsICR3aW5kb3csICRlbGVtZW50LCAkdGltZW91dCwgJGRvY3VtZW50LCAkcm9vdFNjb3BlLCBsb2dnaW5nU2VydmljZSkge1xuICAgICAgICAkZG9jdW1lbnQucmVhZHkoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgaW5wdXQ6IHRoaXMucGFyZW50Q3RybC5icm93c2VTZWFyY2hCYXJTZXJ2aWNlLnNlYXJjaEJhcklucHV0LFxuICAgICAgICAgICAgICAgIHNjb3BlOiB0aGlzLnBhcmVudEN0cmwuYnJvd3NlU2VhcmNoU2VydmljZS5zZWFyY2hlZFNjb3BlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxvZ2dpbmdTZXJ2aWNlLnRyYWNrQnJvd3NlKGRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblBybUJyb3dzZVNlYXJjaEFmdGVyQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJHdpbmRvdycsICckZWxlbWVudCcsICckdGltZW91dCcsICckZG9jdW1lbnQnLCAnJHJvb3RTY29wZScsICdsb2dnaW5nU2VydmljZSddO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgLy8gVGhlIDwgc3ltYm9sIGRlbm90ZXMgb25lLXdheSBiaW5kaW5ncyB3aGljaCBhcmUgYXZhaWxhYmxlIHNpbmNlIDEuNS5cbiAgICBiaW5kaW5nczoge3BhcmVudEN0cmw6ICc8J30sXG4gICAgY29udHJvbGxlcjogUHJtQnJvd3NlU2VhcmNoQWZ0ZXJDb250cm9sbGVyLFxuICAgIHRlbXBsYXRlOiAnJyxcbn07XG4iLCJcbmNsYXNzIFBybUZ1bGxWaWV3QWZ0ZXJDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihsb2dnaW5nU2VydmljZSkge1xuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlID0gbG9nZ2luZ1NlcnZpY2U7XG4gICAgICAgIHRoaXMuaXRlbSA9IHRoaXMucGFyZW50Q3RybC5pdGVtO1xuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLnRyYWNrVmlld1JlY29yZCh0aGlzLml0ZW0pO1xuICAgIH1cblxuICAgICRvbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubGVhdmVWaWV3UmVjb3JkKHRoaXMuaXRlbSk7XG4gICAgfVxufVxuXG5Qcm1GdWxsVmlld0FmdGVyQ29udHJvbGxlci4kaW5qZWN0ID0gWydsb2dnaW5nU2VydmljZSddO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYmluZGluZ3M6IHtwYXJlbnRDdHJsOiAnPCd9LFxuICAgIGNvbnRyb2xsZXI6IFBybUZ1bGxWaWV3QWZ0ZXJDb250cm9sbGVyLFxuICAgIHRlbXBsYXRlOiAnJyxcbn07XG4iLCIvKipcbiAqIEFkb3B0ZWQgZnJvbSBhIHZlcnNpb24gYnkgQFNhcmFoWnVtXG4gKiBodHRwczovL2dpdGh1Yi5jb20vU2FyYWhadW0vcHJpbW8tZXhwbG9yZS1jdXN0b20tbm8tcmVzdWx0c1xuICovXG5cbmNsYXNzIFBybU5vU2VhcmNoUmVzdWx0QWZ0ZXJDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihsb2dnaW5nU2VydmljZSkge1xuICAgICAgICBsb2dnaW5nU2VydmljZS5ub1Jlc3VsdHNQYWdlTG9hZGVkKCk7XG5cbiAgICAgICAgLy8gdmFyIHZtID0gdGhpcztcbiAgICAgICAgLy8gdm0ucGNpU2V0dGluZyA9IHZtLnBhcmVudEN0cmwuc2VhcmNoU3RhdGVTZXJ2aWNlLnNlYXJjaE9iamVjdC5wY0F2YWlsYWJpbGl0eSB8fCAnJztcbiAgICAgICAgLy8gY29uZG9sZS5sb2codm0ucGFyZW50Q3RybC5zZWFyY2hTdGF0ZVNlcnZpY2Uuc2VhcmNoT2JqZWN0KTtcbiAgICAgICAgLy8gdm0uZ2V0U2VhcmNoVGVybSA9IGZ1bmN0aW9uIGdldFNlYXJjaFRlcm0oKSB7XG4gICAgICAgIC8vICAgcmV0dXJuIHZtLnBhcmVudEN0cmwudGVybTtcbiAgICAgICAgLy8gfTtcbiAgICB9XG59XG5cblBybU5vU2VhcmNoUmVzdWx0QWZ0ZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJ2xvZ2dpbmdTZXJ2aWNlJ107XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBiaW5kaW5nczoge3BhcmVudEN0cmw6ICc8J30sXG4gICAgY29udHJvbGxlcjogUHJtTm9TZWFyY2hSZXN1bHRBZnRlckNvbnRyb2xsZXIsXG4gICAgdGVtcGxhdGU6ICcnLFxufTtcblxuLy8gZXhwb3J0IGRlZmF1bHQge1xuLy8gICBiaW5kaW5nczoge3BhcmVudEN0cmw6ICc8J30sXG4vLyAgIGNvbnRyb2xsZXI6IFBybU5vU2VhcmNoUmVzdWx0QWZ0ZXJDb250cm9sbGVyLFxuLy8gICBjb250cm9sbGVyQXM6ICd2bScsXG4vLyAgIHRlbXBsYXRlOiBgXG4vLyAgICAgPG1kLWNhcmQgY2xhc3M9XCJkZWZhdWx0LWNhcmQgemVyby1tYXJnaW4gX21kIG1kLXByaW1vRXhwbG9yZS10aGVtZVwiPlxuLy8gICAgIDxtZC1jYXJkLXRpdGxlPlxuLy8gICAgICAgPG1kLWNhcmQtdGl0bGUtdGV4dD5cbi8vICAgICAgICAgPHNwYW4gdHJhbnNsYXRlPVwiXCIgY2xhc3M9XCJtZC1oZWFkbGluZSBuZy1zY29wZVwiPk5vIHJlY29yZHMgZm91bmQ8L3NwYW4+XG4vLyAgICAgICA8L21kLWNhcmQtdGl0bGUtdGV4dD5cbi8vICAgICA8L21kLWNhcmQtdGl0bGU+XG4vLyAgICAgPG1kLWNhcmQtY29udGVudD5cbi8vICAgICAgIDxwPlxuLy8gICAgICAgICA8c3Bhbj5UaGVyZSBhcmUgbm8gcmVzdWx0cyBtYXRjaGluZyB5b3VyIHNlYXJjaDo8YmxvY2txdW90ZT5cbi8vICAgICAgICAgICA8aT57eyRjdHJsLmdldFNlYXJjaFRlcm0oKX19PC9pPi48L2Jsb2NrcXVvdGU+XG4vLyAgICAgICAgICAgPGRpdiBuZy1pZj1cIiRjdHJsLnBjaVNldHRpbmcgIT09IFxcJ3RydWVcXCdcIj5cbi8vICAgICAgICAgICAgIDxhIGhyZWY9XCIvcHJpbW8tZXhwbG9yZS9zZWFyY2g/cXVlcnk9YW55LGNvbnRhaW5zLHt7JGN0cmwuZ2V0U2VhcmNoVGVybSgpfX0mdGFiPWRlZmF1bHRfdGFiJnNlYXJjaF9zY29wZT1FdmVyeXRoaW5nJnZpZD0wMUJSQ19TT0Mmb2Zmc2V0PTAmc29ydGJ5PXJhbmsmcGNBdmFpbGFiaWxpdHk9dHJ1ZVwiPlxuLy8gICAgICAgICAgICAgICA8Yj5UcnkgYWdhaW4gc2VhcmNoaW5nIGl0ZW1zIGhlbGQgYXQgb3RoZXIgbGlicmFyaWVzPzwvYj5cbi8vICAgICAgICAgICAgIDwvYT5cbi8vICAgICAgICAgICA8L2Rpdj5cbi8vICAgICAgICAgPC9zcGFuPlxuLy8gICAgICAgPC9wPlxuLy8gICAgICAgPHA+XG4vLyAgICAgICAgIDxzcGFuIHRyYW5zbGF0ZT1cIlwiIGNsYXNzPVwiYm9sZC10ZXh0IG5nLXNjb3BlXCI+U3VnZ2VzdGlvbnM6PC9zcGFuPlxuLy8gICAgICAgPC9wPlxuLy8gICAgICAgPHVsPlxuLy8gICAgICAgICA8bGkgdHJhbnNsYXRlPVwiXCIgY2xhc3M9XCJuZy1zY29wZVwiPk1ha2Ugc3VyZSB0aGF0IGFsbCB3b3JkcyBhcmUgc3BlbGxlZCBjb3JyZWN0bHkuPC9saT5cbi8vICAgICAgICAgPGxpIHRyYW5zbGF0ZT1cIlwiIGNsYXNzPVwibmctc2NvcGVcIj5UcnkgYSBkaWZmZXJlbnQgc2VhcmNoIHNjb3BlLjwvbGk+XG4vLyAgICAgICAgIDxsaSB0cmFuc2xhdGU9XCJcIiBjbGFzcz1cIm5nLXNjb3BlXCI+VHJ5IGRpZmZlcmVudCBzZWFyY2ggdGVybXMuPC9saT5cbi8vICAgICAgICAgPGxpIHRyYW5zbGF0ZT1cIlwiIGNsYXNzPVwibmctc2NvcGVcIj5UcnkgbW9yZSBnZW5lcmFsIHNlYXJjaCB0ZXJtcy48L2xpPlxuLy8gICAgICAgICA8bGkgdHJhbnNsYXRlPVwiXCIgY2xhc3M9XCJuZy1zY29wZVwiPlRyeSBmZXdlciBzZWFyY2ggdGVybXMuPC9saT5cbi8vICAgICAgIDwvdWw+XG4vLyAgICAgICA8cD5cbi8vICAgICAgICAgPGI+XG4vLyAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vc3RvbGFmLm9uLndvcmxkY2F0Lm9yZy9zZWFyY2g/cXVlcnlTdHJpbmc9a3c6e3skY3RybC5nZXRTZWFyY2hUZXJtKCl9fSZkYXRhYmFzZUxpc3Q9MjgzXCI+U2VhcmNoIFdvcmxkQ2F0PC9hPlxuLy8gICAgICAgICA8L2I+XG4vLyAgICAgICA8L3A+XG4vLyAgICAgICA8cD5cbi8vICAgICAgICAgPGI+XG4vLyAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vd3d3LnN0b2xhZi5lZHUvbGlicmFyeS9yZXNlYXJjaC9zdHVkZW50cy5jZm1cIj5Db250YWN0IGEgUmVzZWFyY2ggTGlicmFyaWFuIGZvciBBc3Npc3RhbmNlPC9hPlxuLy8gICAgICAgICA8L2I+XG4vLyAgICAgICA8L3A+XG4vLyAgICAgPC9tZC1jYXJkLWNvbnRlbnQ+XG4vLyAgIDwvbWQtY2FyZD5cbi8vICAgYFxuLy8gfVxuIiwiXG5jbGFzcyBQcm1TYXZlVG9GYXZvcml0ZXNCdXR0b25BZnRlckNvbnRyb2xsZXIge1xuXG4gICAgY29uc3RydWN0b3IoJHRpbWVvdXQsICRlbGVtZW50LCBsb2dnaW5nU2VydmljZSkge1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZSA9IGxvZ2dpbmdTZXJ2aWNlO1xuICAgIH1cblxuICAgICRwb3N0TGluaygpIHtcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcGFyZW50RWxlbWVudCA9IHRoaXMuJGVsZW1lbnQucGFyZW50KClbMF07XG5cblxuICAgICAgICAgICAgdmFyIHBpbkJ0biA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnBpbi1idXR0b24nKSxcbiAgICAgICAgICAgICAgICB1bnBpbkJ0biA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnVucGluLWJ1dHRvbicpO1xuXG4gICAgICAgICAgICAvLyBMaW1pdGF0aW9uOiBUaGlzIHdpbGwgb25seSBzYXZlIHRoZSBmaXJzdCBjbGljaywgc2luY2UgdGhlbiB0aGVcbiAgICAgICAgICAgIC8vIGJ1dHRvbiBpcyByZXBsYWNlZCB3aXRoIGFub3RoZXIgYnV0dG9uIGVsZW1lbnQuIFdlIGNvdWxkIGFkZCBhXG4gICAgICAgICAgICAvLyBET00gd2F0Y2hlciwgYnV0IGl0J3Mgbm90IHdvcnRoIGl0IEkgdGhpbmsuXG4gICAgICAgICAgICBpZiAocGluQnRuKSB7XG4gICAgICAgICAgICAgICAgcGluQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLnRyYWNrUGluUmVjb3JkKHRoaXMucGFyZW50Q3RybC5pdGVtKTtcbiAgICAgICAgICAgICAgICB9LCB7cGFzc2l2ZTogdHJ1ZSwgY2FwdHVyZTogdHJ1ZX0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh1bnBpbkJ0bikge1xuICAgICAgICAgICAgICAgIHVucGluQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLnRyYWNrVW5waW5SZWNvcmQodGhpcy5wYXJlbnRDdHJsLml0ZW0pO1xuICAgICAgICAgICAgICAgIH0sIHtwYXNzaXZlOiB0cnVlLCBjYXB0dXJlOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5Qcm1TYXZlVG9GYXZvcml0ZXNCdXR0b25BZnRlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHRpbWVvdXQnLCAnJGVsZW1lbnQnLCAnbG9nZ2luZ1NlcnZpY2UnXTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGJpbmRpbmdzOiB7cGFyZW50Q3RybDogJzwnfSxcbiAgICBjb250cm9sbGVyOiBQcm1TYXZlVG9GYXZvcml0ZXNCdXR0b25BZnRlckNvbnRyb2xsZXIsXG4gICAgdGVtcGxhdGU6ICcnLFxufTtcbiIsImNsYXNzIFBybVNlYXJjaEFmdGVyQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRjb21waWxlLCAkdGltZW91dCwgJGRvY3VtZW50LCBsb2dnaW5nU2VydmljZSkge1xuICAgICAgICAkZG9jdW1lbnQucmVhZHkoKCkgPT4ge1xuICAgICAgICAgICAgLy8gTm90ZTogQXQgdGhpcyBwb2ludCwgdGhlIGZyb250cGFnZSBIVE1MIHRlbXBsYXRlIG1pZ2h0IG5vdCB5ZXQgYmUgcmVhZHkuXG4gICAgICAgICAgICAvLyBXZSBzZWUgdGhpcyBwcm9ibGVtIGVzcGVjaWFsbHkgaW4gRmlyZWZveCBmb3Igc29tZSByZWFzb24uIFVudGlsIHdlIGZpbmQgYSBiZXR0ZXJcbiAgICAgICAgICAgIC8vIHdheSB0byBkZXRlY3Qgd2hlbiB0aGUgdGVtcGxhdGUgaXMgbG9hZGVkLCB3ZSB1c2UgYSB0aW1lb3V0IG9mIDEwMCBtc2Vjcy5cbiAgICAgICAgICAgICR0aW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZm9vdGVyID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51aW8tZm9vdGVyJykpLFxuICAgICAgICAgICAgICAgICAgICBwcm1TZWFyY2hBZnRlckVsID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BybS1zZWFyY2gtYWZ0ZXInKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZm9vdGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBXZSBhcmUgb24gdGhlIGZyb250IHBhZ2UuIE1vdmUgZm9vdGVyIHRvIG91ciBzY29wZSBhbmQgbWFrZSBpdCB2aXNpYmxlXG4gICAgICAgICAgICAgICAgICAgIHBybVNlYXJjaEFmdGVyRWwuYXBwZW5kKGZvb3Rlci5kZXRhY2goKS5hZGRDbGFzcygndmlzaWJsZScpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZuTGluayA9ICRjb21waWxlKGZvb3Rlcik7ICAgICAgLy8gcmV0dXJucyBhIExpbmsgZnVuY3Rpb24gdXNlZCB0byBiaW5kIHRlbXBsYXRlIHRvIHRoZSBzY29wZVxuICAgICAgICAgICAgICAgICAgICBmbkxpbmsoJHNjb3BlKTsgICAgICAgICAgICAgICAgICAgICAvLyBCaW5kIHNjb3BlIHRvIHRoZSB0ZW1wbGF0ZVxuXG4gICAgICAgICAgICAgICAgICAgIGxvZ2dpbmdTZXJ2aWNlLnRyYWNrSG9tZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuUHJtU2VhcmNoQWZ0ZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckY29tcGlsZScsICckdGltZW91dCcsICckZG9jdW1lbnQnLCAnbG9nZ2luZ1NlcnZpY2UnXTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGJpbmRpbmdzOiB7cGFyZW50Q3RybDogJzwnfSxcbiAgICBjb250cm9sbGVyOiBQcm1TZWFyY2hBZnRlckNvbnRyb2xsZXIsXG4gICAgdGVtcGxhdGU6ICcnLFxufTtcbiIsImltcG9ydCBnZXQgZnJvbSAnbG9kYXNoL2dldCc7XG5cbmNsYXNzIFBybVNlYXJjaEJhckFmdGVyQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsICR3aW5kb3csICRlbGVtZW50LCAkdGltZW91dCwgJGRvY3VtZW50LCAkcm9vdFNjb3BlLCBsb2dnaW5nU2VydmljZSkge1xuXG4gICAgICAgIGxldCBwcmltb1ZlcnNpb24gPSBnZXQoJHdpbmRvdy5hcHBDb25maWcsICdzeXN0ZW0tY29uZmlndXJhdGlvbi5Qcmltb19WZXJzaW9uX051bWJlcicsICd1bmtub3duJyk7XG4gICAgICAgIGxldCBzZWFyY2hTdGF0ZVNlcnZpY2UgPSB0aGlzLnBhcmVudEN0cmwuc2VhcmNoU2VydmljZS5zZWFyY2hTdGF0ZVNlcnZpY2U7XG5cbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlID0gbG9nZ2luZ1NlcnZpY2U7XG5cbiAgICAgICAgLy8gSW5qZWN0IFByaW1vJ3Mgc2VhcmNoU3RhdGVTZXJ2aWNlIGludG8gb3VyIGxvZ2dpbmdTZXJ2aWNlXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2Uuc2V0U2VhcmNoU3RhdGVTZXJ2aWNlKHNlYXJjaFN0YXRlU2VydmljZSk7XG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2Uuc2V0UHJpbW9WZXJzaW9uKHByaW1vVmVyc2lvbik7XG5cbiAgICAgICAgdGhpcy5wYXN0ZUV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5zZWFyY2hCYXJFbGVtZW50UGFzdGVFdmVudCgpO1xuICAgICAgICB9LmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuaW5jcktleXByZXNzQ291bnQoKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuaW5pdFNlYXJjaEJhcigpO1xuICAgICAgICAkZG9jdW1lbnQucmVhZHkoKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBOb3RlOiBtYWluU2VhcmNoRmllbGQgYWxzbyBtYXBzIHRvIHRoZSBmaXJzdCBpbnB1dCBmaWVsZCBvbiBhZHZhbmNlZCBzZWFyY2hcbiAgICAgICAgICAgIC8vIHRoaXMuJHNjb3BlLiR3YXRjaCgnJGN0cmwucGFyZW50Q3RybC5tYWluU2VhcmNoRmllbGQnLCAobmV3VmFsdWUsIG9sZFZhbHVlKSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgaWYgKG5ld1ZhbHVlICE9IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuaW5jcktleXByZXNzQ291bnQoKTtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJHdhdGNoKCckY3RybC5wYXJlbnRDdHJsLmFkdmFuY2VkU2VhcmNoJywgKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBwYXJlbnRFbGVtZW50ID0gdGhpcy4kZWxlbWVudC5wYXJlbnQoKVswXTtcbiAgICAgICAgICAgICAgICBsZXQgc2VhcmNoQmFyRWxlbWVudCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaEJhcicpO1xuXG4gICAgICAgICAgICAgICAgLy8gRm9jdXMgb24gdGhlIHNlYXJjaCBiYXIsIGlmIGl0IGV4aXN0cy5cbiAgICAgICAgICAgICAgICAvLyBOb3RlIHRoYXQsIHdoZW4gdGhlIGxhbmd1YWdlIGlzIGNoYW5nZWQsXG4gICAgICAgICAgICAgICAgLy8gdGhlIHNlYXJjaCBiYXIgaXMgbm90IGF2YWlsYWJsZSB5ZXQgaGVyZS5cbiAgICAgICAgICAgICAgICAvLyBXZSBjYW4gd2F0Y2ggZm9yIHRoZSBlbGVtZW50IGFuZCB0aGVuIGZvY3VzIG9uIGl0LFxuICAgICAgICAgICAgICAgIC8vIGJ1dCBpdCBkb2VzIG5vdCBzZWVtIHRvIHdvcnRoIGl0LlxuICAgICAgICAgICAgICAgIGlmIChzZWFyY2hCYXJFbGVtZW50ICYmICFvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAkdGltZW91dCgoKSA9PiBzZWFyY2hCYXJFbGVtZW50LmZvY3VzKCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCAkaW5wdXRFbGVtcyA9IGFuZ3VsYXIuZWxlbWVudChwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JykpO1xuXG4gICAgICAgICAgICAgICAgJGlucHV0RWxlbXMub2ZmKCdwYXN0ZScsIHRoaXMucGFzdGVFdmVudEhhbmRsZXIpOyAvLyBUbyBtYWtlIHN1cmUgd2UgZG9uJ3QgZW5kIHVwIHdpdGggZG91YmxlIGhhbmRsZXJzXG4gICAgICAgICAgICAgICAgJGlucHV0RWxlbXMub24oJ3Bhc3RlJywgdGhpcy5wYXN0ZUV2ZW50SGFuZGxlcik7XG5cbiAgICAgICAgICAgICAgICAkaW5wdXRFbGVtcy5vZmYoJ2lucHV0JywgdGhpcy5pbnB1dEhhbmRsZXIpOyAgLy8gVG8gbWFrZSBzdXJlIHdlIGRvbid0IGVuZCB1cCB3aXRoIGRvdWJsZSBoYW5kbGVyc1xuICAgICAgICAgICAgICAgICRpbnB1dEVsZW1zLm9uKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyKTtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIC8vIENhbGxlZCBhZnRlciB0aGlzIGNvbnRyb2xsZXIncyBlbGVtZW50IGFuZCBpdHMgY2hpbGRyZW4gaGF2ZSBiZWVuIGxpbmtlZC5cbiAgICAvLyAkcG9zdExpbmsoKSB7XG4gICAgLy8gICAgIC8vIEZvY3VzIGlucHV0IGZpZWxkIG9uIGxvYWQuIEFkYXB0ZWQgZnJvbSBhIHZlcnNpb24gYnkgQG11cmF0c2V5aGFuXG4gICAgLy8gICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EZXQtS29uZ2VsaWdlLUJpYmxpb3Rlay9wcmltby1leHBsb3JlLXJleC9jb21taXQvODY0MzJlNjhlMzEzYTQzZGIxZjAxYTNhMjUxNjUyZjg0OTUyZDVhNlxuICAgIC8vICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcbiAgICAvLyAgICAgICAgIGxldCBwYXJlbnRFbGVtZW50ID0gdGhpcy4kZWxlbWVudC5wYXJlbnQoKTtcbiAgICAvLyAgICAgICAgIGxldCBzZWFyY2hCYXJFbGVtZW50ID0gcGFyZW50RWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoQmFyJyk7XG5cbiAgICAvLyAgICAgICAgIC8vIEZvY3VzIG9uIHRoZSBzZWFyY2ggYmFyLCBpZiBpdCBleGlzdHMuXG4gICAgLy8gICAgICAgICAvLyBOb3RlIHRoYXQsIHdoZW4gdGhlIGxhbmd1YWdlIGlzIGNoYW5nZWQsXG4gICAgLy8gICAgICAgICAvLyB0aGUgc2VhcmNoIGJhciBpcyBub3QgYXZhaWxhYmxlIHlldCBoZXJlLlxuICAgIC8vICAgICAgICAgLy8gV2UgY2FuIHdhdGNoIGZvciB0aGUgZWxlbWVudCBhbmQgdGhlbiBmb2N1cyBvbiBpdCxcbiAgICAvLyAgICAgICAgIC8vIGJ1dCBpdCBkb2VzIG5vdCBzZWVtIHRvIHdvcnRoIGl0LlxuICAgIC8vICAgICAgICAgaWYgKHNlYXJjaEJhckVsZW1lbnQpIHtcbiAgICAvLyAgICAgICAgICAgICBzZWFyY2hCYXJFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAvLyAgICAgICAgICAgICBzZWFyY2hCYXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgKCkgPT4ge1xuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLnNlYXJjaEJhckVsZW1lbnRQYXN0ZUV2ZW50KCk7XG4gICAgLy8gICAgICAgICAgICAgfSwge3Bhc3NpdmU6IHRydWUsIGNhcHR1cmU6IHRydWV9KTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSwgMCk7XG4gICAgLy8gfVxuXG4gICAgLy8gQ2hhbmdlIHBsYWNlaG9sZGVyIHRleHQgKG5lZWRzIG9wdGltaXphdGlvbiBJIHRoaW5rKVxuICAgIC8vIGJ5IEFsZXggUlM6IGh0dHA6Ly9zZWFyY2gtdGVzdC5saWJyYXJ5LmJyYW5kZWlzLmVkdS9wcmltby1leHBsb3JlL3NlYXJjaD92aWQ9QlJBTkRURVNUXG4gICAgLy8gdmFyIG15VmFyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24ocGFyZW50Q3RybCkge1xuICAgIC8vICAgICBwYXJlbnRDdHJsLl9wbGFjZUhvbGRlclRleHQgPSBjYWxjdWxhdGVQbGFjZUhvbGRlclRleHQocGFyZW50Q3RybC5fc2VsZWN0ZWRUYWIpO1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcInBsYWNlaG9sZGVyIGNoYW5nZWRcIik7XG4gICAgLy8gfSwgMTAwLCB0aGlzLnBhcmVudEN0cmwpO1xuXG4gICAgLy8gc2V0VGltZW91dChmdW5jdGlvbiggbXlJbnRlcnZhbElEICkge1xuICAgIC8vICAgICBjbGVhckludGVydmFsKG15SW50ZXJ2YWxJRCk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwicGxhY2Vob2xkZXIgaW50ZXJ2YWwgY2xlYXJlZFwiKTtcbiAgICAvLyB9LCA1MDAwLCBteVZhcik7XG5cbiAgICAvLyAkc2NvcGUuJHdhdGNoKFwiJHBhcmVudC4kY3RybC5fc2VsZWN0ZWRUYWJcIiwgZnVuY3Rpb24obmV3VGFiLCBvbGRUYWIpIHtcbiAgICAvLyAgICAgJHNjb3BlLiRwYXJlbnQuJGN0cmwuX3BsYWNlSG9sZGVyVGV4dCA9IGNhbGN1bGF0ZVBsYWNlSG9sZGVyVGV4dChuZXdUYWIpO1xuICAgIC8vIH0pO1xuXG4gICAgLy8gZnVuY3Rpb24gY2FsY3VsYXRlUGxhY2VIb2xkZXJUZXh0IChteVRhYikge1xuICAgIC8vICAgICBzd2l0Y2ggKG15VGFiKSB7XG4gICAgLy8gICAgICAgICBjYXNlIFwicGNpXCI6XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIFwiRmluZCBhcnRpY2xlcyBhbmQgb3RoZXIgbWF0ZXJpYWxzIGZyb20gc2Nob2xhcmx5IGpvdXJuYWxzLCBuZXdzcGFwZXJzLCBhbmQgb25saW5lIGNvbGxlY3Rpb25zXCI7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICBjYXNlIFwiYWxtYVwiOlxuICAgIC8vICAgICAgICAgICAgIHJldHVybiBcIkZpbmQgYm9va3MsIG1vdmllcywgbXVzaWMsIHNlcmlhbHMsIGV0Y1wiO1xuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICAgICAgY2FzZSBcImV2ZXJ5dGhpbmdcIjpcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gXCJGaW5kIEFMTCBraW5kcyBvZiBsaWJyYXJ5IHJlc291cmNlcyAoYm9va3MsIG1vdmllcywgam91cm5hbCBhcnRpY2xlcywgZXRjKVwiO1xuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICAgICAgY2FzZSBcImNvdXJzZVwiOlxuICAgIC8vICAgICAgICAgICAgIHJldHVybiBcIkZpbmQgYm9va3MgJiBtZWRpYSBvbiByZXNlcnZlIGZvciB5b3VyIGNsYXNzLlwiO1xuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICAgICAgZGVmYXVsdDpcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gXCJ1bmtub3duLXRhYiBwbGFjZWhvbGRlclwiO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxufVxuXG5Qcm1TZWFyY2hCYXJBZnRlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyR3aW5kb3cnLCAnJGVsZW1lbnQnLCAnJHRpbWVvdXQnLCAnJGRvY3VtZW50JywgJyRyb290U2NvcGUnLCAnbG9nZ2luZ1NlcnZpY2UnXTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIC8vIFRoZSA8IHN5bWJvbCBkZW5vdGVzIG9uZS13YXkgYmluZGluZ3Mgd2hpY2ggYXJlIGF2YWlsYWJsZSBzaW5jZSAxLjUuXG4gICAgYmluZGluZ3M6IHtwYXJlbnRDdHJsOiAnPCd9LFxuICAgIGNvbnRyb2xsZXI6IFBybVNlYXJjaEJhckFmdGVyQ29udHJvbGxlcixcbiAgICB0ZW1wbGF0ZTogJycsXG59O1xuIiwiaW1wb3J0IGdldCBmcm9tICdsb2Rhc2gvZ2V0JztcblxuY2xhc3MgUHJtU2VhcmNoUmVzdWx0TGlzdEFmdGVyQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcigkd2luZG93LCAkc2NvcGUsIGxvZ2dpbmdTZXJ2aWNlKSB7XG5cbiAgICAgICAgbGV0IHByaW1vVmVyc2lvbiA9IGdldCgkd2luZG93LmFwcENvbmZpZywgJ3N5c3RlbS1jb25maWd1cmF0aW9uLlByaW1vX1ZlcnNpb25fTnVtYmVyJywgJ3Vua25vd24nKTtcbiAgICAgICAgbGV0IHNlYXJjaFN0YXRlU2VydmljZSA9IHRoaXMucGFyZW50Q3RybC5zZWFyY2hTZXJ2aWNlLnNlYXJjaFN0YXRlU2VydmljZTtcblxuICAgICAgICAvLyBJbmplY3QgUHJpbW8ncyBzZWFyY2hTdGF0ZVNlcnZpY2UgaW50byBvdXIgbG9nZ2luZ1NlcnZpY2VcbiAgICAgICAgbG9nZ2luZ1NlcnZpY2Uuc2V0U2VhcmNoU3RhdGVTZXJ2aWNlKHNlYXJjaFN0YXRlU2VydmljZSk7XG4gICAgICAgIGxvZ2dpbmdTZXJ2aWNlLnNldFByaW1vVmVyc2lvbihwcmltb1ZlcnNpb24pO1xuXG4gICAgICAgICRzY29wZS4kd2F0Y2goJyRjdHJsLnBhcmVudEN0cmwubnVtT2ZMb2FkZWRQYWdlcycsIChuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2luZ1NlcnZpY2Uuc2VhcmNoUGFnZUxvYWRlZChuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuUHJtU2VhcmNoUmVzdWx0TGlzdEFmdGVyQ29udHJvbGxlci4kaW5qZWN0ID0gWyckd2luZG93JywgJyRzY29wZScsICdsb2dnaW5nU2VydmljZSddO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYmluZGluZ3M6IHtwYXJlbnRDdHJsOiAnPCd9LFxuICAgIGNvbnRyb2xsZXI6IFBybVNlYXJjaFJlc3VsdExpc3RBZnRlckNvbnRyb2xsZXIsXG4gICAgdGVtcGxhdGU6ICcnLFxufTtcbiIsIlxuY2xhc3MgUHJtU2lsZW50TG9naW5BZnRlckNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGxvZ2dpbmdTZXJ2aWNlKSB7XG4gICAgICAgIGxldCB1c2VyU2Vzc2lvbk1hbmFnZXJTZXJ2aWNlID0gdGhpcy5wYXJlbnRDdHJsLnVzZXJTZXNzaW9uTWFuYWdlclNlcnZpY2U7XG4gICAgICAgIGxvZ2dpbmdTZXJ2aWNlLnNldFVzZXJTZXNzaW9uTWFuYWdlclNlcnZpY2UodXNlclNlc3Npb25NYW5hZ2VyU2VydmljZSk7XG4gICAgfVxufVxuXG5Qcm1TaWxlbnRMb2dpbkFmdGVyQ29udHJvbGxlci4kaW5qZWN0ID0gWydsb2dnaW5nU2VydmljZSddO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYmluZGluZ3M6IHtwYXJlbnRDdHJsOiAnPCd9LFxuICAgIGNvbnRyb2xsZXI6IFBybVNpbGVudExvZ2luQWZ0ZXJDb250cm9sbGVyLFxuICAgIHRlbXBsYXRlOiAnJyxcbn07XG4iLCIvLyBEZWZpbmUgdGhlIHZpZXcgbmFtZSBoZXJlLlxuY29uc3Qgdmlld05hbWUgPSAnVUlPJztcbmV4cG9ydCBkZWZhdWx0IHZpZXdOYW1lO1xuIiwidmFyIGhhc2hDbGVhciA9IHJlcXVpcmUoJy4vX2hhc2hDbGVhcicpLFxuICAgIGhhc2hEZWxldGUgPSByZXF1aXJlKCcuL19oYXNoRGVsZXRlJyksXG4gICAgaGFzaEdldCA9IHJlcXVpcmUoJy4vX2hhc2hHZXQnKSxcbiAgICBoYXNoSGFzID0gcmVxdWlyZSgnLi9faGFzaEhhcycpLFxuICAgIGhhc2hTZXQgPSByZXF1aXJlKCcuL19oYXNoU2V0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID09IG51bGwgPyAwIDogZW50cmllcy5sZW5ndGg7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuSGFzaC5wcm90b3R5cGUuY2xlYXIgPSBoYXNoQ2xlYXI7XG5IYXNoLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBoYXNoRGVsZXRlO1xuSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbkhhc2gucHJvdG90eXBlLmhhcyA9IGhhc2hIYXM7XG5IYXNoLnByb3RvdHlwZS5zZXQgPSBoYXNoU2V0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhhc2g7XG4iLCJ2YXIgbGlzdENhY2hlQ2xlYXIgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVDbGVhcicpLFxuICAgIGxpc3RDYWNoZURlbGV0ZSA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZURlbGV0ZScpLFxuICAgIGxpc3RDYWNoZUdldCA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZUdldCcpLFxuICAgIGxpc3RDYWNoZUhhcyA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZUhhcycpLFxuICAgIGxpc3RDYWNoZVNldCA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZVNldCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA9PSBudWxsID8gMCA6IGVudHJpZXMubGVuZ3RoO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBMaXN0Q2FjaGVgLlxuTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmdldCA9IGxpc3RDYWNoZUdldDtcbkxpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gTGlzdENhY2hlO1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcDtcbiIsInZhciBtYXBDYWNoZUNsZWFyID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVDbGVhcicpLFxuICAgIG1hcENhY2hlRGVsZXRlID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVEZWxldGUnKSxcbiAgICBtYXBDYWNoZUdldCA9IHJlcXVpcmUoJy4vX21hcENhY2hlR2V0JyksXG4gICAgbWFwQ2FjaGVIYXMgPSByZXF1aXJlKCcuL19tYXBDYWNoZUhhcycpLFxuICAgIG1hcENhY2hlU2V0ID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVTZXQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIE1hcENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID09IG51bGwgPyAwIDogZW50cmllcy5sZW5ndGg7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwQ2FjaGVEZWxldGU7XG5NYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwQ2FjaGVTZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwQ2FjaGU7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2V0O1xuIiwidmFyIE1hcENhY2hlID0gcmVxdWlyZSgnLi9fTWFwQ2FjaGUnKSxcbiAgICBzZXRDYWNoZUFkZCA9IHJlcXVpcmUoJy4vX3NldENhY2hlQWRkJyksXG4gICAgc2V0Q2FjaGVIYXMgPSByZXF1aXJlKCcuL19zZXRDYWNoZUhhcycpO1xuXG4vKipcbiAqXG4gKiBDcmVhdGVzIGFuIGFycmF5IGNhY2hlIG9iamVjdCB0byBzdG9yZSB1bmlxdWUgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFNldENhY2hlKHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcyA9PSBudWxsID8gMCA6IHZhbHVlcy5sZW5ndGg7XG5cbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB0aGlzLmFkZCh2YWx1ZXNbaW5kZXhdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU2V0Q2FjaGVgLlxuU2V0Q2FjaGUucHJvdG90eXBlLmFkZCA9IFNldENhY2hlLnByb3RvdHlwZS5wdXNoID0gc2V0Q2FjaGVBZGQ7XG5TZXRDYWNoZS5wcm90b3R5cGUuaGFzID0gc2V0Q2FjaGVIYXM7XG5cbm1vZHVsZS5leHBvcnRzID0gU2V0Q2FjaGU7XG4iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ltYm9sO1xuIiwiLyoqXG4gKiBBIGZhc3RlciBhbHRlcm5hdGl2ZSB0byBgRnVuY3Rpb24jYXBwbHlgLCB0aGlzIGZ1bmN0aW9uIGludm9rZXMgYGZ1bmNgXG4gKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBgdGhpc0FyZ2AgYW5kIHRoZSBhcmd1bWVudHMgb2YgYGFyZ3NgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBmdW5jYC5cbiAqL1xuZnVuY3Rpb24gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncykge1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcpO1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICB9XG4gIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFwcGx5O1xuIiwidmFyIGJhc2VJbmRleE9mID0gcmVxdWlyZSgnLi9fYmFzZUluZGV4T2YnKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uaW5jbHVkZXNgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogc3BlY2lmeWluZyBhbiBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdGFyZ2V0IFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB0YXJnZXRgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5SW5jbHVkZXMoYXJyYXksIHZhbHVlKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgMCkgPiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUluY2x1ZGVzO1xuIiwiLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYGFycmF5SW5jbHVkZXNgIGV4Y2VwdCB0aGF0IGl0IGFjY2VwdHMgYSBjb21wYXJhdG9yLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB0YXJnZXQgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wYXJhdG9yIFRoZSBjb21wYXJhdG9yIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHRhcmdldGAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlJbmNsdWRlc1dpdGgoYXJyYXksIHZhbHVlLCBjb21wYXJhdG9yKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoY29tcGFyYXRvcih2YWx1ZSwgYXJyYXlbaW5kZXhdKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUluY2x1ZGVzV2l0aDtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1hcGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheU1hcChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlNYXA7XG4iLCIvKipcbiAqIEFwcGVuZHMgdGhlIGVsZW1lbnRzIG9mIGB2YWx1ZXNgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBhcHBlbmQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlQdXNoKGFycmF5LCB2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgb2Zmc2V0ID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbb2Zmc2V0ICsgaW5kZXhdID0gdmFsdWVzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlQdXNoO1xuIiwidmFyIGJhc2VBc3NpZ25WYWx1ZSA9IHJlcXVpcmUoJy4vX2Jhc2VBc3NpZ25WYWx1ZScpLFxuICAgIGVxID0gcmVxdWlyZSgnLi9lcScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEFzc2lnbnMgYHZhbHVlYCB0byBga2V5YCBvZiBgb2JqZWN0YCBpZiB0aGUgZXhpc3RpbmcgdmFsdWUgaXMgbm90IGVxdWl2YWxlbnRcbiAqIHVzaW5nIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldO1xuICBpZiAoIShoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBlcShvYmpWYWx1ZSwgdmFsdWUpKSB8fFxuICAgICAgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnblZhbHVlO1xuIiwidmFyIGVxID0gcmVxdWlyZSgnLi9lcScpO1xuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc29jSW5kZXhPZjtcbiIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2RlZmluZVByb3BlcnR5Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGFzc2lnblZhbHVlYCBhbmQgYGFzc2lnbk1lcmdlVmFsdWVgIHdpdGhvdXRcbiAqIHZhbHVlIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgPT0gJ19fcHJvdG9fXycgJiYgZGVmaW5lUHJvcGVydHkpIHtcbiAgICBkZWZpbmVQcm9wZXJ0eShvYmplY3QsIGtleSwge1xuICAgICAgJ2NvbmZpZ3VyYWJsZSc6IHRydWUsXG4gICAgICAnZW51bWVyYWJsZSc6IHRydWUsXG4gICAgICAndmFsdWUnOiB2YWx1ZSxcbiAgICAgICd3cml0YWJsZSc6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUFzc2lnblZhbHVlO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5maW5kSW5kZXhgIGFuZCBgXy5maW5kTGFzdEluZGV4YCB3aXRob3V0XG4gKiBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGaW5kSW5kZXgoYXJyYXksIHByZWRpY2F0ZSwgZnJvbUluZGV4LCBmcm9tUmlnaHQpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGluZGV4ID0gZnJvbUluZGV4ICsgKGZyb21SaWdodCA/IDEgOiAtMSk7XG5cbiAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZpbmRJbmRleDtcbiIsInZhciBhcnJheVB1c2ggPSByZXF1aXJlKCcuL19hcnJheVB1c2gnKSxcbiAgICBpc0ZsYXR0ZW5hYmxlID0gcmVxdWlyZSgnLi9faXNGbGF0dGVuYWJsZScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZsYXR0ZW5gIHdpdGggc3VwcG9ydCBmb3IgcmVzdHJpY3RpbmcgZmxhdHRlbmluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGZsYXR0ZW4uXG4gKiBAcGFyYW0ge251bWJlcn0gZGVwdGggVGhlIG1heGltdW0gcmVjdXJzaW9uIGRlcHRoLlxuICogQHBhcmFtIHtib29sZWFufSBbcHJlZGljYXRlPWlzRmxhdHRlbmFibGVdIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1N0cmljdF0gUmVzdHJpY3QgdG8gdmFsdWVzIHRoYXQgcGFzcyBgcHJlZGljYXRlYCBjaGVja3MuXG4gKiBAcGFyYW0ge0FycmF5fSBbcmVzdWx0PVtdXSBUaGUgaW5pdGlhbCByZXN1bHQgdmFsdWUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBmbGF0dGVuZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGbGF0dGVuKGFycmF5LCBkZXB0aCwgcHJlZGljYXRlLCBpc1N0cmljdCwgcmVzdWx0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHByZWRpY2F0ZSB8fCAocHJlZGljYXRlID0gaXNGbGF0dGVuYWJsZSk7XG4gIHJlc3VsdCB8fCAocmVzdWx0ID0gW10pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdO1xuICAgIGlmIChkZXB0aCA+IDAgJiYgcHJlZGljYXRlKHZhbHVlKSkge1xuICAgICAgaWYgKGRlcHRoID4gMSkge1xuICAgICAgICAvLyBSZWN1cnNpdmVseSBmbGF0dGVuIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgICBiYXNlRmxhdHRlbih2YWx1ZSwgZGVwdGggLSAxLCBwcmVkaWNhdGUsIGlzU3RyaWN0LCByZXN1bHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJyYXlQdXNoKHJlc3VsdCwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWlzU3RyaWN0KSB7XG4gICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRmxhdHRlbjtcbiIsInZhciBjYXN0UGF0aCA9IHJlcXVpcmUoJy4vX2Nhc3RQYXRoJyksXG4gICAgdG9LZXkgPSByZXF1aXJlKCcuL190b0tleScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmdldGAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWZhdWx0IHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldChvYmplY3QsIHBhdGgpIHtcbiAgcGF0aCA9IGNhc3RQYXRoKHBhdGgsIG9iamVjdCk7XG5cbiAgdmFyIGluZGV4ID0gMCxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoO1xuXG4gIHdoaWxlIChvYmplY3QgIT0gbnVsbCAmJiBpbmRleCA8IGxlbmd0aCkge1xuICAgIG9iamVjdCA9IG9iamVjdFt0b0tleShwYXRoW2luZGV4KytdKV07XG4gIH1cbiAgcmV0dXJuIChpbmRleCAmJiBpbmRleCA9PSBsZW5ndGgpID8gb2JqZWN0IDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXQ7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgZ2V0UmF3VGFnID0gcmVxdWlyZSgnLi9fZ2V0UmF3VGFnJyksXG4gICAgb2JqZWN0VG9TdHJpbmcgPSByZXF1aXJlKCcuL19vYmplY3RUb1N0cmluZycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlR2V0VGFnO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5oYXNJbmAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBrZXkgVGhlIGtleSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUhhc0luKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBrZXkgaW4gT2JqZWN0KG9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUhhc0luO1xuIiwidmFyIGJhc2VGaW5kSW5kZXggPSByZXF1aXJlKCcuL19iYXNlRmluZEluZGV4JyksXG4gICAgYmFzZUlzTmFOID0gcmVxdWlyZSgnLi9fYmFzZUlzTmFOJyksXG4gICAgc3RyaWN0SW5kZXhPZiA9IHJlcXVpcmUoJy4vX3N0cmljdEluZGV4T2YnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pbmRleE9mYCB3aXRob3V0IGBmcm9tSW5kZXhgIGJvdW5kcyBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpIHtcbiAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZVxuICAgID8gc3RyaWN0SW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleClcbiAgICA6IGJhc2VGaW5kSW5kZXgoYXJyYXksIGJhc2VJc05hTiwgZnJvbUluZGV4KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSW5kZXhPZjtcbiIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNBcmd1bWVudHNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqL1xuZnVuY3Rpb24gYmFzZUlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IGFyZ3NUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzQXJndW1lbnRzO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hTmAgd2l0aG91dCBzdXBwb3J0IGZvciBudW1iZXIgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBgTmFOYCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNOYU47XG4iLCJ2YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXNGdW5jdGlvbicpLFxuICAgIGlzTWFza2VkID0gcmVxdWlyZSgnLi9faXNNYXNrZWQnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICB0b1NvdXJjZSA9IHJlcXVpcmUoJy4vX3RvU291cmNlJyk7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gaXNGdW5jdGlvbih2YWx1ZSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzTmF0aXZlO1xuIiwidmFyIGJhc2VQaWNrQnkgPSByZXF1aXJlKCcuL19iYXNlUGlja0J5JyksXG4gICAgaGFzSW4gPSByZXF1aXJlKCcuL2hhc0luJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucGlja2Agd2l0aG91dCBzdXBwb3J0IGZvciBpbmRpdmlkdWFsXG4gKiBwcm9wZXJ0eSBpZGVudGlmaWVycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nW119IHBhdGhzIFRoZSBwcm9wZXJ0eSBwYXRocyB0byBwaWNrLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYmFzZVBpY2sob2JqZWN0LCBwYXRocykge1xuICByZXR1cm4gYmFzZVBpY2tCeShvYmplY3QsIHBhdGhzLCBmdW5jdGlvbih2YWx1ZSwgcGF0aCkge1xuICAgIHJldHVybiBoYXNJbihvYmplY3QsIHBhdGgpO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlUGljaztcbiIsInZhciBiYXNlR2V0ID0gcmVxdWlyZSgnLi9fYmFzZUdldCcpLFxuICAgIGJhc2VTZXQgPSByZXF1aXJlKCcuL19iYXNlU2V0JyksXG4gICAgY2FzdFBhdGggPSByZXF1aXJlKCcuL19jYXN0UGF0aCcpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mICBgXy5waWNrQnlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nW119IHBhdGhzIFRoZSBwcm9wZXJ0eSBwYXRocyB0byBwaWNrLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBwcm9wZXJ0eS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VQaWNrQnkob2JqZWN0LCBwYXRocywgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcGF0aHMubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0ge307XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgcGF0aCA9IHBhdGhzW2luZGV4XSxcbiAgICAgICAgdmFsdWUgPSBiYXNlR2V0KG9iamVjdCwgcGF0aCk7XG5cbiAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBwYXRoKSkge1xuICAgICAgYmFzZVNldChyZXN1bHQsIGNhc3RQYXRoKHBhdGgsIG9iamVjdCksIHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlUGlja0J5O1xuIiwidmFyIGFzc2lnblZhbHVlID0gcmVxdWlyZSgnLi9fYXNzaWduVmFsdWUnKSxcbiAgICBjYXN0UGF0aCA9IHJlcXVpcmUoJy4vX2Nhc3RQYXRoJyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vX2lzSW5kZXgnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICB0b0tleSA9IHJlcXVpcmUoJy4vX3RvS2V5Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uc2V0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBwYXRoIGNyZWF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZVNldChvYmplY3QsIHBhdGgsIHZhbHVlLCBjdXN0b21pemVyKSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbiAgcGF0aCA9IGNhc3RQYXRoKHBhdGgsIG9iamVjdCk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwYXRoLmxlbmd0aCxcbiAgICAgIGxhc3RJbmRleCA9IGxlbmd0aCAtIDEsXG4gICAgICBuZXN0ZWQgPSBvYmplY3Q7XG5cbiAgd2hpbGUgKG5lc3RlZCAhPSBudWxsICYmICsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gdG9LZXkocGF0aFtpbmRleF0pLFxuICAgICAgICBuZXdWYWx1ZSA9IHZhbHVlO1xuXG4gICAgaWYgKGluZGV4ICE9IGxhc3RJbmRleCkge1xuICAgICAgdmFyIG9ialZhbHVlID0gbmVzdGVkW2tleV07XG4gICAgICBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKG9ialZhbHVlLCBrZXksIG5lc3RlZCkgOiB1bmRlZmluZWQ7XG4gICAgICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBuZXdWYWx1ZSA9IGlzT2JqZWN0KG9ialZhbHVlKVxuICAgICAgICAgID8gb2JqVmFsdWVcbiAgICAgICAgICA6IChpc0luZGV4KHBhdGhbaW5kZXggKyAxXSkgPyBbXSA6IHt9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgYXNzaWduVmFsdWUobmVzdGVkLCBrZXksIG5ld1ZhbHVlKTtcbiAgICBuZXN0ZWQgPSBuZXN0ZWRba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VTZXQ7XG4iLCJ2YXIgY29uc3RhbnQgPSByZXF1aXJlKCcuL2NvbnN0YW50JyksXG4gICAgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19kZWZpbmVQcm9wZXJ0eScpLFxuICAgIGlkZW50aXR5ID0gcmVxdWlyZSgnLi9pZGVudGl0eScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBzZXRUb1N0cmluZ2Agd2l0aG91dCBzdXBwb3J0IGZvciBob3QgbG9vcCBzaG9ydGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RyaW5nIFRoZSBgdG9TdHJpbmdgIHJlc3VsdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBgZnVuY2AuXG4gKi9cbnZhciBiYXNlU2V0VG9TdHJpbmcgPSAhZGVmaW5lUHJvcGVydHkgPyBpZGVudGl0eSA6IGZ1bmN0aW9uKGZ1bmMsIHN0cmluZykge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHkoZnVuYywgJ3RvU3RyaW5nJywge1xuICAgICdjb25maWd1cmFibGUnOiB0cnVlLFxuICAgICdlbnVtZXJhYmxlJzogZmFsc2UsXG4gICAgJ3ZhbHVlJzogY29uc3RhbnQoc3RyaW5nKSxcbiAgICAnd3JpdGFibGUnOiB0cnVlXG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlU2V0VG9TdHJpbmc7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgYXJyYXlNYXAgPSByZXF1aXJlKCcuL19hcnJheU1hcCcpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFRvU3RyaW5nID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by50b1N0cmluZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50b1N0cmluZ2Agd2hpY2ggZG9lc24ndCBjb252ZXJ0IG51bGxpc2hcbiAqIHZhbHVlcyB0byBlbXB0eSBzdHJpbmdzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3Igc3RyaW5ncyB0byBhdm9pZCBhIHBlcmZvcm1hbmNlIGhpdCBpbiBzb21lIGVudmlyb25tZW50cy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAvLyBSZWN1cnNpdmVseSBjb252ZXJ0IHZhbHVlcyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIHJldHVybiBhcnJheU1hcCh2YWx1ZSwgYmFzZVRvU3RyaW5nKSArICcnO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc3ltYm9sVG9TdHJpbmcgPyBzeW1ib2xUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVG9TdHJpbmc7XG4iLCJ2YXIgU2V0Q2FjaGUgPSByZXF1aXJlKCcuL19TZXRDYWNoZScpLFxuICAgIGFycmF5SW5jbHVkZXMgPSByZXF1aXJlKCcuL19hcnJheUluY2x1ZGVzJyksXG4gICAgYXJyYXlJbmNsdWRlc1dpdGggPSByZXF1aXJlKCcuL19hcnJheUluY2x1ZGVzV2l0aCcpLFxuICAgIGNhY2hlSGFzID0gcmVxdWlyZSgnLi9fY2FjaGVIYXMnKSxcbiAgICBjcmVhdGVTZXQgPSByZXF1aXJlKCcuL19jcmVhdGVTZXQnKSxcbiAgICBzZXRUb0FycmF5ID0gcmVxdWlyZSgnLi9fc2V0VG9BcnJheScpO1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuaXFCeWAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZV0gVGhlIGl0ZXJhdGVlIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29tcGFyYXRvcl0gVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGR1cGxpY2F0ZSBmcmVlIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlVW5pcShhcnJheSwgaXRlcmF0ZWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpbmNsdWRlcyA9IGFycmF5SW5jbHVkZXMsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpc0NvbW1vbiA9IHRydWUsXG4gICAgICByZXN1bHQgPSBbXSxcbiAgICAgIHNlZW4gPSByZXN1bHQ7XG5cbiAgaWYgKGNvbXBhcmF0b3IpIHtcbiAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIGluY2x1ZGVzID0gYXJyYXlJbmNsdWRlc1dpdGg7XG4gIH1cbiAgZWxzZSBpZiAobGVuZ3RoID49IExBUkdFX0FSUkFZX1NJWkUpIHtcbiAgICB2YXIgc2V0ID0gaXRlcmF0ZWUgPyBudWxsIDogY3JlYXRlU2V0KGFycmF5KTtcbiAgICBpZiAoc2V0KSB7XG4gICAgICByZXR1cm4gc2V0VG9BcnJheShzZXQpO1xuICAgIH1cbiAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIGluY2x1ZGVzID0gY2FjaGVIYXM7XG4gICAgc2VlbiA9IG5ldyBTZXRDYWNoZTtcbiAgfVxuICBlbHNlIHtcbiAgICBzZWVuID0gaXRlcmF0ZWUgPyBbXSA6IHJlc3VsdDtcbiAgfVxuICBvdXRlcjpcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUgPyBpdGVyYXRlZSh2YWx1ZSkgOiB2YWx1ZTtcblxuICAgIHZhbHVlID0gKGNvbXBhcmF0b3IgfHwgdmFsdWUgIT09IDApID8gdmFsdWUgOiAwO1xuICAgIGlmIChpc0NvbW1vbiAmJiBjb21wdXRlZCA9PT0gY29tcHV0ZWQpIHtcbiAgICAgIHZhciBzZWVuSW5kZXggPSBzZWVuLmxlbmd0aDtcbiAgICAgIHdoaWxlIChzZWVuSW5kZXgtLSkge1xuICAgICAgICBpZiAoc2VlbltzZWVuSW5kZXhdID09PSBjb21wdXRlZCkge1xuICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaXRlcmF0ZWUpIHtcbiAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIWluY2x1ZGVzKHNlZW4sIGNvbXB1dGVkLCBjb21wYXJhdG9yKSkge1xuICAgICAgaWYgKHNlZW4gIT09IHJlc3VsdCkge1xuICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VVbmlxO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYSBgY2FjaGVgIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBjYWNoZSBUaGUgY2FjaGUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gY2FjaGVIYXMoY2FjaGUsIGtleSkge1xuICByZXR1cm4gY2FjaGUuaGFzKGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FjaGVIYXM7XG4iLCJ2YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzS2V5ID0gcmVxdWlyZSgnLi9faXNLZXknKSxcbiAgICBzdHJpbmdUb1BhdGggPSByZXF1aXJlKCcuL19zdHJpbmdUb1BhdGgnKSxcbiAgICB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdG9TdHJpbmcnKTtcblxuLyoqXG4gKiBDYXN0cyBgdmFsdWVgIHRvIGEgcGF0aCBhcnJheSBpZiBpdCdzIG5vdCBvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeSBrZXlzIG9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjYXN0IHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGNhc3RQYXRoKHZhbHVlLCBvYmplY3QpIHtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiBpc0tleSh2YWx1ZSwgb2JqZWN0KSA/IFt2YWx1ZV0gOiBzdHJpbmdUb1BhdGgodG9TdHJpbmcodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYXN0UGF0aDtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcmVKc0RhdGE7XG4iLCJ2YXIgU2V0ID0gcmVxdWlyZSgnLi9fU2V0JyksXG4gICAgbm9vcCA9IHJlcXVpcmUoJy4vbm9vcCcpLFxuICAgIHNldFRvQXJyYXkgPSByZXF1aXJlKCcuL19zZXRUb0FycmF5Jyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHNldCBvYmplY3Qgb2YgYHZhbHVlc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFkZCB0byB0aGUgc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IHNldC5cbiAqL1xudmFyIGNyZWF0ZVNldCA9ICEoU2V0ICYmICgxIC8gc2V0VG9BcnJheShuZXcgU2V0KFssLTBdKSlbMV0pID09IElORklOSVRZKSA/IG5vb3AgOiBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgcmV0dXJuIG5ldyBTZXQodmFsdWVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlU2V0O1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgdmFyIGZ1bmMgPSBnZXROYXRpdmUoT2JqZWN0LCAnZGVmaW5lUHJvcGVydHknKTtcbiAgICBmdW5jKHt9LCAnJywge30pO1xuICAgIHJldHVybiBmdW5jO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVQcm9wZXJ0eTtcbiIsInZhciBmbGF0dGVuID0gcmVxdWlyZSgnLi9mbGF0dGVuJyksXG4gICAgb3ZlclJlc3QgPSByZXF1aXJlKCcuL19vdmVyUmVzdCcpLFxuICAgIHNldFRvU3RyaW5nID0gcmVxdWlyZSgnLi9fc2V0VG9TdHJpbmcnKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VSZXN0YCB3aGljaCBmbGF0dGVucyB0aGUgcmVzdCBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgYSByZXN0IHBhcmFtZXRlciB0by5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBmbGF0UmVzdChmdW5jKSB7XG4gIHJldHVybiBzZXRUb1N0cmluZyhvdmVyUmVzdChmdW5jLCB1bmRlZmluZWQsIGZsYXR0ZW4pLCBmdW5jICsgJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZsYXRSZXN0O1xuIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxubW9kdWxlLmV4cG9ydHMgPSBmcmVlR2xvYmFsO1xuIiwidmFyIGlzS2V5YWJsZSA9IHJlcXVpcmUoJy4vX2lzS2V5YWJsZScpO1xuXG4vKipcbiAqIEdldHMgdGhlIGRhdGEgZm9yIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSByZWZlcmVuY2Uga2V5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1hcCBkYXRhLlxuICovXG5mdW5jdGlvbiBnZXRNYXBEYXRhKG1hcCwga2V5KSB7XG4gIHZhciBkYXRhID0gbWFwLl9fZGF0YV9fO1xuICByZXR1cm4gaXNLZXlhYmxlKGtleSlcbiAgICA/IGRhdGFbdHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/ICdzdHJpbmcnIDogJ2hhc2gnXVxuICAgIDogZGF0YS5tYXA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TWFwRGF0YTtcbiIsInZhciBiYXNlSXNOYXRpdmUgPSByZXF1aXJlKCcuL19iYXNlSXNOYXRpdmUnKSxcbiAgICBnZXRWYWx1ZSA9IHJlcXVpcmUoJy4vX2dldFZhbHVlJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TmF0aXZlO1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UmF3VGFnO1xuIiwiLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0VmFsdWU7XG4iLCJ2YXIgY2FzdFBhdGggPSByZXF1aXJlKCcuL19jYXN0UGF0aCcpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9faXNJbmRleCcpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpLFxuICAgIHRvS2V5ID0gcmVxdWlyZSgnLi9fdG9LZXknKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHBhdGhgIGV4aXN0cyBvbiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gY2hlY2suXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYXNGdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjayBwcm9wZXJ0aWVzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBwYXRoYCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzUGF0aChvYmplY3QsIHBhdGgsIGhhc0Z1bmMpIHtcbiAgcGF0aCA9IGNhc3RQYXRoKHBhdGgsIG9iamVjdCk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwYXRoLmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHRvS2V5KHBhdGhbaW5kZXhdKTtcbiAgICBpZiAoIShyZXN1bHQgPSBvYmplY3QgIT0gbnVsbCAmJiBoYXNGdW5jKG9iamVjdCwga2V5KSkpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBvYmplY3QgPSBvYmplY3Rba2V5XTtcbiAgfVxuICBpZiAocmVzdWx0IHx8ICsraW5kZXggIT0gbGVuZ3RoKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBsZW5ndGggPSBvYmplY3QgPT0gbnVsbCA/IDAgOiBvYmplY3QubGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgaXNBcmd1bWVudHMob2JqZWN0KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzUGF0aDtcbiIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaENsZWFyO1xuIiwiLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHZhciByZXN1bHQgPSB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG4gIHRoaXMuc2l6ZSAtPSByZXN1bHQgPyAxIDogMDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoRGVsZXRlO1xuIiwidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaEdldDtcbiIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyAoZGF0YVtrZXldICE9PSB1bmRlZmluZWQpIDogaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hIYXM7XG4iLCJ2YXIgbmF0aXZlQ3JlYXRlID0gcmVxdWlyZSgnLi9fbmF0aXZlQ3JlYXRlJyk7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqXG4gKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaGFzaCBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gaGFzaFNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgdGhpcy5zaXplICs9IHRoaXMuaGFzKGtleSkgPyAwIDogMTtcbiAgZGF0YVtrZXldID0gKG5hdGl2ZUNyZWF0ZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IEhBU0hfVU5ERUZJTkVEIDogdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hTZXQ7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzcHJlYWRhYmxlU3ltYm9sID0gU3ltYm9sID8gU3ltYm9sLmlzQ29uY2F0U3ByZWFkYWJsZSA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGZsYXR0ZW5hYmxlIGBhcmd1bWVudHNgIG9iamVjdCBvciBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBmbGF0dGVuYWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0ZsYXR0ZW5hYmxlKHZhbHVlKSB7XG4gIHJldHVybiBpc0FycmF5KHZhbHVlKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkgfHxcbiAgICAhIShzcHJlYWRhYmxlU3ltYm9sICYmIHZhbHVlICYmIHZhbHVlW3NwcmVhZGFibGVTeW1ib2xdKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0ZsYXR0ZW5hYmxlO1xuIiwiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJbmRleDtcbiIsInZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNTeW1ib2wgPSByZXF1aXJlKCcuL2lzU3ltYm9sJyk7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIHByb3BlcnR5IG5hbWVzIHdpdGhpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUlzRGVlcFByb3AgPSAvXFwufFxcWyg/OlteW1xcXV0qfChbXCInXSkoPzooPyFcXDEpW15cXFxcXXxcXFxcLikqP1xcMSlcXF0vLFxuICAgIHJlSXNQbGFpblByb3AgPSAvXlxcdyokLztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUgYW5kIG5vdCBhIHByb3BlcnR5IHBhdGguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkga2V5cyBvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleSh2YWx1ZSwgb2JqZWN0KSB7XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJyB8fFxuICAgICAgdmFsdWUgPT0gbnVsbCB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gcmVJc1BsYWluUHJvcC50ZXN0KHZhbHVlKSB8fCAhcmVJc0RlZXBQcm9wLnRlc3QodmFsdWUpIHx8XG4gICAgKG9iamVjdCAhPSBudWxsICYmIHZhbHVlIGluIE9iamVjdChvYmplY3QpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0tleTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyB1bmlxdWUgb2JqZWN0IGtleS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleWFibGUodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAodHlwZSA9PSAnc3RyaW5nJyB8fCB0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicpXG4gICAgPyAodmFsdWUgIT09ICdfX3Byb3RvX18nKVxuICAgIDogKHZhbHVlID09PSBudWxsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0tleWFibGU7XG4iLCJ2YXIgY29yZUpzRGF0YSA9IHJlcXVpcmUoJy4vX2NvcmVKc0RhdGEnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc01hc2tlZDtcbiIsIi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBbXTtcbiAgdGhpcy5zaXplID0gMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVDbGVhcjtcbiIsInZhciBhc3NvY0luZGV4T2YgPSByZXF1aXJlKCcuL19hc3NvY0luZGV4T2YnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlO1xuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICBpZiAoaW5kZXggPT0gbGFzdEluZGV4KSB7XG4gICAgZGF0YS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChkYXRhLCBpbmRleCwgMSk7XG4gIH1cbiAgLS10aGlzLnNpemU7XG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RDYWNoZURlbGV0ZTtcbiIsInZhciBhc3NvY0luZGV4T2YgPSByZXF1aXJlKCcuL19hc3NvY0luZGV4T2YnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVHZXQ7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RDYWNoZUhhcztcbiIsInZhciBhc3NvY0luZGV4T2YgPSByZXF1aXJlKCcuL19hc3NvY0luZGV4T2YnKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBsaXN0IGNhY2hlIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBsaXN0IGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICArK3RoaXMuc2l6ZTtcbiAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhW2luZGV4XVsxXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RDYWNoZVNldDtcbiIsInZhciBIYXNoID0gcmVxdWlyZSgnLi9fSGFzaCcpLFxuICAgIExpc3RDYWNoZSA9IHJlcXVpcmUoJy4vX0xpc3RDYWNoZScpLFxuICAgIE1hcCA9IHJlcXVpcmUoJy4vX01hcCcpO1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLnNpemUgPSAwO1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVDbGVhcjtcbiIsInZhciBnZXRNYXBEYXRhID0gcmVxdWlyZSgnLi9fZ2V0TWFwRGF0YScpO1xuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciByZXN1bHQgPSBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG4gIHRoaXMuc2l6ZSAtPSByZXN1bHQgPyAxIDogMDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBDYWNoZURlbGV0ZTtcbiIsInZhciBnZXRNYXBEYXRhID0gcmVxdWlyZSgnLi9fZ2V0TWFwRGF0YScpO1xuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVHZXQoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVHZXQ7XG4iLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtYXAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5oYXMoa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBDYWNoZUhhcztcbiIsInZhciBnZXRNYXBEYXRhID0gcmVxdWlyZSgnLi9fZ2V0TWFwRGF0YScpO1xuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSBnZXRNYXBEYXRhKHRoaXMsIGtleSksXG4gICAgICBzaXplID0gZGF0YS5zaXplO1xuXG4gIGRhdGEuc2V0KGtleSwgdmFsdWUpO1xuICB0aGlzLnNpemUgKz0gZGF0YS5zaXplID09IHNpemUgPyAwIDogMTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVTZXQ7XG4iLCJ2YXIgbWVtb2l6ZSA9IHJlcXVpcmUoJy4vbWVtb2l6ZScpO1xuXG4vKiogVXNlZCBhcyB0aGUgbWF4aW11bSBtZW1vaXplIGNhY2hlIHNpemUuICovXG52YXIgTUFYX01FTU9JWkVfU0laRSA9IDUwMDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ubWVtb2l6ZWAgd2hpY2ggY2xlYXJzIHRoZSBtZW1vaXplZCBmdW5jdGlvbidzXG4gKiBjYWNoZSB3aGVuIGl0IGV4Y2VlZHMgYE1BWF9NRU1PSVpFX1NJWkVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBoYXZlIGl0cyBvdXRwdXQgbWVtb2l6ZWQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBtZW1vaXplZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gbWVtb2l6ZUNhcHBlZChmdW5jKSB7XG4gIHZhciByZXN1bHQgPSBtZW1vaXplKGZ1bmMsIGZ1bmN0aW9uKGtleSkge1xuICAgIGlmIChjYWNoZS5zaXplID09PSBNQVhfTUVNT0laRV9TSVpFKSB7XG4gICAgICBjYWNoZS5jbGVhcigpO1xuICAgIH1cbiAgICByZXR1cm4ga2V5O1xuICB9KTtcblxuICB2YXIgY2FjaGUgPSByZXN1bHQuY2FjaGU7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWVtb2l6ZUNhcHBlZDtcbiIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuYXRpdmVDcmVhdGU7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvYmplY3RUb1N0cmluZztcbiIsInZhciBhcHBseSA9IHJlcXVpcmUoJy4vX2FwcGx5Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VSZXN0YCB3aGljaCB0cmFuc2Zvcm1zIHRoZSByZXN0IGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSByZXN0IGFycmF5IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyUmVzdChmdW5jLCBzdGFydCwgdHJhbnNmb3JtKSB7XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHN0YXJ0LCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIGFycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICBpbmRleCA9IC0xO1xuICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IHRyYW5zZm9ybShhcnJheSk7XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb3ZlclJlc3Q7XG4iLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG4iLCIvKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKlxuICogQWRkcyBgdmFsdWVgIHRvIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgYWRkXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBhbGlhcyBwdXNoXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjYWNoZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUFkZCh2YWx1ZSkge1xuICB0aGlzLl9fZGF0YV9fLnNldCh2YWx1ZSwgSEFTSF9VTkRFRklORUQpO1xuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRDYWNoZUFkZDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVIYXModmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRDYWNoZUhhcztcbiIsIi8qKlxuICogQ29udmVydHMgYHNldGAgdG8gYW4gYXJyYXkgb2YgaXRzIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gc2V0VG9BcnJheShzZXQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShzZXQuc2l6ZSk7XG5cbiAgc2V0LmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0VG9BcnJheTtcbiIsInZhciBiYXNlU2V0VG9TdHJpbmcgPSByZXF1aXJlKCcuL19iYXNlU2V0VG9TdHJpbmcnKSxcbiAgICBzaG9ydE91dCA9IHJlcXVpcmUoJy4vX3Nob3J0T3V0Jyk7XG5cbi8qKlxuICogU2V0cyB0aGUgYHRvU3RyaW5nYCBtZXRob2Qgb2YgYGZ1bmNgIHRvIHJldHVybiBgc3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RyaW5nIFRoZSBgdG9TdHJpbmdgIHJlc3VsdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBgZnVuY2AuXG4gKi9cbnZhciBzZXRUb1N0cmluZyA9IHNob3J0T3V0KGJhc2VTZXRUb1N0cmluZyk7XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0VG9TdHJpbmc7XG4iLCIvKiogVXNlZCB0byBkZXRlY3QgaG90IGZ1bmN0aW9ucyBieSBudW1iZXIgb2YgY2FsbHMgd2l0aGluIGEgc3BhbiBvZiBtaWxsaXNlY29uZHMuICovXG52YXIgSE9UX0NPVU5UID0gODAwLFxuICAgIEhPVF9TUEFOID0gMTY7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVOb3cgPSBEYXRlLm5vdztcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCdsbCBzaG9ydCBvdXQgYW5kIGludm9rZSBgaWRlbnRpdHlgIGluc3RlYWRcbiAqIG9mIGBmdW5jYCB3aGVuIGl0J3MgY2FsbGVkIGBIT1RfQ09VTlRgIG9yIG1vcmUgdGltZXMgaW4gYEhPVF9TUEFOYFxuICogbWlsbGlzZWNvbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byByZXN0cmljdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHNob3J0YWJsZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gc2hvcnRPdXQoZnVuYykge1xuICB2YXIgY291bnQgPSAwLFxuICAgICAgbGFzdENhbGxlZCA9IDA7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdGFtcCA9IG5hdGl2ZU5vdygpLFxuICAgICAgICByZW1haW5pbmcgPSBIT1RfU1BBTiAtIChzdGFtcCAtIGxhc3RDYWxsZWQpO1xuXG4gICAgbGFzdENhbGxlZCA9IHN0YW1wO1xuICAgIGlmIChyZW1haW5pbmcgPiAwKSB7XG4gICAgICBpZiAoKytjb3VudCA+PSBIT1RfQ09VTlQpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3VtZW50c1swXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY291bnQgPSAwO1xuICAgIH1cbiAgICByZXR1cm4gZnVuYy5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvcnRPdXQ7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5pbmRleE9mYCB3aGljaCBwZXJmb3JtcyBzdHJpY3QgZXF1YWxpdHlcbiAqIGNvbXBhcmlzb25zIG9mIHZhbHVlcywgaS5lLiBgPT09YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBzdHJpY3RJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSB7XG4gIHZhciBpbmRleCA9IGZyb21JbmRleCAtIDEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoYXJyYXlbaW5kZXhdID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RyaWN0SW5kZXhPZjtcbiIsInZhciBtZW1vaXplQ2FwcGVkID0gcmVxdWlyZSgnLi9fbWVtb2l6ZUNhcHBlZCcpO1xuXG4vKiogVXNlZCB0byBtYXRjaCBwcm9wZXJ0eSBuYW1lcyB3aXRoaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVMZWFkaW5nRG90ID0gL15cXC4vLFxuICAgIHJlUHJvcE5hbWUgPSAvW14uW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JCkpL2c7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGJhY2tzbGFzaGVzIGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIGEgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbnZhciBzdHJpbmdUb1BhdGggPSBtZW1vaXplQ2FwcGVkKGZ1bmN0aW9uKHN0cmluZykge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmIChyZUxlYWRpbmdEb3QudGVzdChzdHJpbmcpKSB7XG4gICAgcmVzdWx0LnB1c2goJycpO1xuICB9XG4gIHN0cmluZy5yZXBsYWNlKHJlUHJvcE5hbWUsIGZ1bmN0aW9uKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdHJpbmcpIHtcbiAgICByZXN1bHQucHVzaChxdW90ZSA/IHN0cmluZy5yZXBsYWNlKHJlRXNjYXBlQ2hhciwgJyQxJykgOiAobnVtYmVyIHx8IG1hdGNoKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RyaW5nVG9QYXRoO1xuIiwidmFyIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcga2V5IGlmIGl0J3Mgbm90IGEgc3RyaW5nIG9yIHN5bWJvbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd8c3ltYm9sfSBSZXR1cm5zIHRoZSBrZXkuXG4gKi9cbmZ1bmN0aW9uIHRvS2V5KHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHwgaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b0tleTtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1NvdXJjZTtcbiIsIi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBgdmFsdWVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byByZXR1cm4gZnJvbSB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY29uc3RhbnQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3RzID0gXy50aW1lcygyLCBfLmNvbnN0YW50KHsgJ2EnOiAxIH0pKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhvYmplY3RzKTtcbiAqIC8vID0+IFt7ICdhJzogMSB9LCB7ICdhJzogMSB9XVxuICpcbiAqIGNvbnNvbGUubG9nKG9iamVjdHNbMF0gPT09IG9iamVjdHNbMV0pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBjb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnN0YW50O1xuIiwiLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXE7XG4iLCJ2YXIgYmFzZUZsYXR0ZW4gPSByZXF1aXJlKCcuL19iYXNlRmxhdHRlbicpO1xuXG4vKipcbiAqIEZsYXR0ZW5zIGBhcnJheWAgYSBzaW5nbGUgbGV2ZWwgZGVlcC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBmbGF0dGVuLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmxhdHRlbmVkIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmZsYXR0ZW4oWzEsIFsyLCBbMywgWzRdXSwgNV1dKTtcbiAqIC8vID0+IFsxLCAyLCBbMywgWzRdXSwgNV1cbiAqL1xuZnVuY3Rpb24gZmxhdHRlbihhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG4gIHJldHVybiBsZW5ndGggPyBiYXNlRmxhdHRlbihhcnJheSwgMSkgOiBbXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmbGF0dGVuO1xuIiwidmFyIGJhc2VHZXQgPSByZXF1aXJlKCcuL19iYXNlR2V0Jyk7XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYHBhdGhgIG9mIGBvYmplY3RgLiBJZiB0aGUgcmVzb2x2ZWQgdmFsdWUgaXNcbiAqIGB1bmRlZmluZWRgLCB0aGUgYGRlZmF1bHRWYWx1ZWAgaXMgcmV0dXJuZWQgaW4gaXRzIHBsYWNlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy43LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0geyp9IFtkZWZhdWx0VmFsdWVdIFRoZSB2YWx1ZSByZXR1cm5lZCBmb3IgYHVuZGVmaW5lZGAgcmVzb2x2ZWQgdmFsdWVzLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IFt7ICdiJzogeyAnYyc6IDMgfSB9XSB9O1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgJ2FbMF0uYi5jJyk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy5nZXQob2JqZWN0LCBbJ2EnLCAnMCcsICdiJywgJ2MnXSk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy5nZXQob2JqZWN0LCAnYS5iLmMnLCAnZGVmYXVsdCcpO1xuICogLy8gPT4gJ2RlZmF1bHQnXG4gKi9cbmZ1bmN0aW9uIGdldChvYmplY3QsIHBhdGgsIGRlZmF1bHRWYWx1ZSkge1xuICB2YXIgcmVzdWx0ID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBiYXNlR2V0KG9iamVjdCwgcGF0aCk7XG4gIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRWYWx1ZSA6IHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXQ7XG4iLCJ2YXIgYmFzZUhhc0luID0gcmVxdWlyZSgnLi9fYmFzZUhhc0luJyksXG4gICAgaGFzUGF0aCA9IHJlcXVpcmUoJy4vX2hhc1BhdGgnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHBhdGhgIGlzIGEgZGlyZWN0IG9yIGluaGVyaXRlZCBwcm9wZXJ0eSBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgcGF0aGAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSBfLmNyZWF0ZSh7ICdhJzogXy5jcmVhdGUoeyAnYic6IDIgfSkgfSk7XG4gKlxuICogXy5oYXNJbihvYmplY3QsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5oYXNJbihvYmplY3QsICdhLmInKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgWydhJywgJ2InXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5oYXNJbihvYmplY3QsICdiJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBoYXNJbihvYmplY3QsIHBhdGgpIHtcbiAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIGhhc1BhdGgob2JqZWN0LCBwYXRoLCBiYXNlSGFzSW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc0luO1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBpdCByZWNlaXZlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqXG4gKiBjb25zb2xlLmxvZyhfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpZGVudGl0eTtcbiIsInZhciBiYXNlSXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL19iYXNlSXNBcmd1bWVudHMnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcmd1bWVudHMgPSBiYXNlSXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPyBiYXNlSXNBcmd1bWVudHMgOiBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0FyZ3VtZW50cztcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG4iLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFzeW5jVGFnID0gJ1tvYmplY3QgQXN5bmNGdW5jdGlvbl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgcHJveHlUYWcgPSAnW29iamVjdCBQcm94eV0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXlzIGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBiYXNlR2V0VGFnKHZhbHVlKTtcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWcgfHwgdGFnID09IGFzeW5jVGFnIHx8IHRhZyA9PSBwcm94eVRhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uO1xuIiwiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTGVuZ3RoO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3Q7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG4iLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTeW1ib2w7XG4iLCJ2YXIgTWFwQ2FjaGUgPSByZXF1aXJlKCcuL19NYXBDYWNoZScpO1xuXG4vKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IG1lbW9pemVzIHRoZSByZXN1bHQgb2YgYGZ1bmNgLiBJZiBgcmVzb2x2ZXJgIGlzXG4gKiBwcm92aWRlZCwgaXQgZGV0ZXJtaW5lcyB0aGUgY2FjaGUga2V5IGZvciBzdG9yaW5nIHRoZSByZXN1bHQgYmFzZWQgb24gdGhlXG4gKiBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uLiBCeSBkZWZhdWx0LCB0aGUgZmlyc3QgYXJndW1lbnRcbiAqIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbiBpcyB1c2VkIGFzIHRoZSBtYXAgY2FjaGUga2V5LiBUaGUgYGZ1bmNgXG4gKiBpcyBpbnZva2VkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBtZW1vaXplZCBmdW5jdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogVGhlIGNhY2hlIGlzIGV4cG9zZWQgYXMgdGhlIGBjYWNoZWAgcHJvcGVydHkgb24gdGhlIG1lbW9pemVkXG4gKiBmdW5jdGlvbi4gSXRzIGNyZWF0aW9uIG1heSBiZSBjdXN0b21pemVkIGJ5IHJlcGxhY2luZyB0aGUgYF8ubWVtb2l6ZS5DYWNoZWBcbiAqIGNvbnN0cnVjdG9yIHdpdGggb25lIHdob3NlIGluc3RhbmNlcyBpbXBsZW1lbnQgdGhlXG4gKiBbYE1hcGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXByb3BlcnRpZXMtb2YtdGhlLW1hcC1wcm90b3R5cGUtb2JqZWN0KVxuICogbWV0aG9kIGludGVyZmFjZSBvZiBgY2xlYXJgLCBgZGVsZXRlYCwgYGdldGAsIGBoYXNgLCBhbmQgYHNldGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBoYXZlIGl0cyBvdXRwdXQgbWVtb2l6ZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmVzb2x2ZXJdIFRoZSBmdW5jdGlvbiB0byByZXNvbHZlIHRoZSBjYWNoZSBrZXkuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBtZW1vaXplZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxLCAnYic6IDIgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2MnOiAzLCAnZCc6IDQgfTtcbiAqXG4gKiB2YXIgdmFsdWVzID0gXy5tZW1vaXplKF8udmFsdWVzKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogdmFsdWVzKG90aGVyKTtcbiAqIC8vID0+IFszLCA0XVxuICpcbiAqIG9iamVjdC5hID0gMjtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogLy8gTW9kaWZ5IHRoZSByZXN1bHQgY2FjaGUuXG4gKiB2YWx1ZXMuY2FjaGUuc2V0KG9iamVjdCwgWydhJywgJ2InXSk7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsnYScsICdiJ11cbiAqXG4gKiAvLyBSZXBsYWNlIGBfLm1lbW9pemUuQ2FjaGVgLlxuICogXy5tZW1vaXplLkNhY2hlID0gV2Vha01hcDtcbiAqL1xuZnVuY3Rpb24gbWVtb2l6ZShmdW5jLCByZXNvbHZlcikge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJyB8fCAocmVzb2x2ZXIgIT0gbnVsbCAmJiB0eXBlb2YgcmVzb2x2ZXIgIT0gJ2Z1bmN0aW9uJykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgdmFyIG1lbW9pemVkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGtleSA9IHJlc29sdmVyID8gcmVzb2x2ZXIuYXBwbHkodGhpcywgYXJncykgOiBhcmdzWzBdLFxuICAgICAgICBjYWNoZSA9IG1lbW9pemVkLmNhY2hlO1xuXG4gICAgaWYgKGNhY2hlLmhhcyhrZXkpKSB7XG4gICAgICByZXR1cm4gY2FjaGUuZ2V0KGtleSk7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIG1lbW9pemVkLmNhY2hlID0gY2FjaGUuc2V0KGtleSwgcmVzdWx0KSB8fCBjYWNoZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBtZW1vaXplZC5jYWNoZSA9IG5ldyAobWVtb2l6ZS5DYWNoZSB8fCBNYXBDYWNoZSk7XG4gIHJldHVybiBtZW1vaXplZDtcbn1cblxuLy8gRXhwb3NlIGBNYXBDYWNoZWAuXG5tZW1vaXplLkNhY2hlID0gTWFwQ2FjaGU7XG5cbm1vZHVsZS5leHBvcnRzID0gbWVtb2l6ZTtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBgdW5kZWZpbmVkYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8ubm9vcCk7XG4gKiAvLyA9PiBbdW5kZWZpbmVkLCB1bmRlZmluZWRdXG4gKi9cbmZ1bmN0aW9uIG5vb3AoKSB7XG4gIC8vIE5vIG9wZXJhdGlvbiBwZXJmb3JtZWQuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbm9vcDtcbiIsInZhciBiYXNlUGljayA9IHJlcXVpcmUoJy4vX2Jhc2VQaWNrJyksXG4gICAgZmxhdFJlc3QgPSByZXF1aXJlKCcuL19mbGF0UmVzdCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIHRoZSBwaWNrZWQgYG9iamVjdGAgcHJvcGVydGllcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHsuLi4oc3RyaW5nfHN0cmluZ1tdKX0gW3BhdGhzXSBUaGUgcHJvcGVydHkgcGF0aHMgdG8gcGljay5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSwgJ2InOiAnMicsICdjJzogMyB9O1xuICpcbiAqIF8ucGljayhvYmplY3QsIFsnYScsICdjJ10pO1xuICogLy8gPT4geyAnYSc6IDEsICdjJzogMyB9XG4gKi9cbnZhciBwaWNrID0gZmxhdFJlc3QoZnVuY3Rpb24ob2JqZWN0LCBwYXRocykge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB7fSA6IGJhc2VQaWNrKG9iamVjdCwgcGF0aHMpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGljaztcbiIsInZhciBiYXNlVG9TdHJpbmcgPSByZXF1aXJlKCcuL19iYXNlVG9TdHJpbmcnKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICogYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvU3RyaW5nKG51bGwpO1xuICogLy8gPT4gJydcbiAqXG4gKiBfLnRvU3RyaW5nKC0wKTtcbiAqIC8vID0+ICctMCdcbiAqXG4gKiBfLnRvU3RyaW5nKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAnMSwyLDMnXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvU3RyaW5nO1xuIiwidmFyIGJhc2VVbmlxID0gcmVxdWlyZSgnLi9fYmFzZVVuaXEnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZHVwbGljYXRlLWZyZWUgdmVyc2lvbiBvZiBhbiBhcnJheSwgdXNpbmdcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGluIHdoaWNoIG9ubHkgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgZWFjaCBlbGVtZW50XG4gKiBpcyBrZXB0LiBUaGUgb3JkZXIgb2YgcmVzdWx0IHZhbHVlcyBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBvcmRlciB0aGV5IG9jY3VyXG4gKiBpbiB0aGUgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGR1cGxpY2F0ZSBmcmVlIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnVuaXEoWzIsIDEsIDJdKTtcbiAqIC8vID0+IFsyLCAxXVxuICovXG5mdW5jdGlvbiB1bmlxKGFycmF5KSB7XG4gIHJldHVybiAoYXJyYXkgJiYgYXJyYXkubGVuZ3RoKSA/IGJhc2VVbmlxKGFycmF5KSA6IFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVuaXE7XG4iXX0=
