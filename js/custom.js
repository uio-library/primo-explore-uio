(function () {
    "use strict";
    'use strict';


    var app = angular.module('viewCustom', ['angularLoad']);

    /****************************************************************************************************/

        /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

        /*var app = angular.module('centralCustom', ['angularLoad']);*/

    /****************************************************************************************************/


    app.component('prmSearchAfter', {
        bindings: {parentCtrl: '<'},
        controller: 'prmSearchAfterController',
        template: ''
    });

    app.controller('prmSearchAfterController', ['$scope', '$compile', '$timeout', '$document', function ($scope, $compile, $timeout, $document) {
        $document.ready(function () {
            // Note: At this point, the frontpage HTML template might not yet be ready.
            // We see this problem especially in Firefox for some reason. Until we find a better
            // way to detect when the template is loaded, we use a timeout of 100 msecs.
            $timeout(function moveFooter() {
                var footer = angular.element(document.querySelector('.uio-footer')),
                    footerSpacing = angular.element(document.querySelector('.uio-footer-spacing')),
                    prmSearchAfterEl = angular.element(document.querySelector('prm-search-after'));

                if (footer.length) {
                    // We are on the front page. Move footer and make it visible
                    prmSearchAfterEl.append(footer.detach().addClass('visible'));
                    var fnLink = $compile(footer);      // returns a Link function used to bind template to the scope
                    fnLink($scope);                     // Bind scope to the template
                }
            }, 100);
        });
    }]);

})();
