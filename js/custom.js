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
        template: `<div class="footer">

            <div layout="row" layout-align="center start" flex>

                <div flex="0" flex-md="0" flex-lg="10" flex-xl="20" ng-class="{'flex-lgPlus-15': $ctrl.parentCtrl.mediaQueries.lgPlus && !$ctrl.parentCtrl.facetToLeft, 'flex-lgPlus-20': $ctrl.parentCtrl.mediaQueries.lgPlus && $ctrl.parentCtrl.facetToLeft, 'flex-xl-25': $ctrl.parentCtrl.facetToLeft}"></div>

                <div flex style="padding: 16px 20px; display: flex;">

                    <div style="flex: 0 0 auto;" class="logo">
                        <a href="https://www.ub.uio.no" title="Universitetsbiblioteket i Oslo" class="md-primoExplore-theme" style="display: block; margin-right: 1em; padding: 0;">
                            <img src="custom/UBO/img/UiO_Segl.png" alt=""></a>
                    </div>
                    <div style="flex: 1 0 auto;">
                        <!-- spacing -->
                    </div>
                    <div style="flex: 0 0 auto; padding: 0 1em;" class="uio-mobile">
                        <div>
                            <a href="#">oria-ub@ub.uio.no</a>
                            <a href="https://www.ub.uio.no/om/personvernerkleringer/">Personvernerklæring</a>
                        </div>
                    </div>
                    <div style="flex: 0 0 auto; padding: 0 1em;" class="uio-contact">
                        <div class="md-headline">Kontaktinformasjon</div>
                        <div>
                            <a href="#">oria-ub@ub.uio.no</a>
                            <a href="#">Kontakt oss</a>
                        </div>
                    </div>
                    <div style="flex: 0 0 auto; padding: 0 1em;" class="uio-responsible">
                        <div class="md-headline">Ansvarlig for denne siden</div>
                        <div>
                            <a href="#">UiO : Universitetsbiblioteket</a>
                            <a href="https://www.ub.uio.no/om/personvernerkleringer/">Personvernerklæring</a>
                            <div>Tjenesten er levert av BIBSYS.</div>
                        </div>

                        </p>
                    </div>
                </div>

                <div flex="0" flex-md="10" flex-lg="25" ng-class="{'flex-lgPlus-30': $ctrl.parentCtrl.mediaQueries.lgPlus && !$ctrl.parentCtrl.facetToLeft, 'flex-lgPlus-25': $ctrl.parentCtrl.mediaQueries.lgPlus && $ctrl.parentCtrl.facetToLeft, 'flex-xl-30': $ctrl.parentCtrl.mediaQueries.xl && !$ctrl.parentCtrl.facetToLeft, 'flex-xl-25': $ctrl.parentCtrl.mediaQueries && $ctrl.parentCtrl.facetToLeft}"></div>

            </div>`
    });

    app.controller('prmSearchAfterController', [function () {
        var vm = this;

        angular.element(document).ready(function () {
            var footerSpacing = document.querySelector('.footer-spacing');
            if (footerSpacing) {
                angular.element(document.querySelector('.footer')).addClass('visible');
            }
        });
    }]);

})();