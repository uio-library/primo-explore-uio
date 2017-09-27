(function () {
    "use strict";
    'use strict';


    var app = angular.module('viewCustom', ['angularLoad']);

    /****************************************************************************************************/

        /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

        /*var app = angular.module('centralCustom', ['angularLoad']);*/

    /****************************************************************************************************/

	
	// Add Clickable Logo
    app.component('prmLogoAfter', {
        bindings: {parentCtrl: '<'},
        controller: 'prmLogoAfterController',
        template: '<div class="product-logo product-logo-local" layout="row" layout-align="start center" layout-fill id="banner"><a href="https://bibsys-almaprimo.hosted.exlibrisgroup.com/primo-explore/search?vid=UBO&lang=no_NO"><img class="logo-image" alt="{{::(\'nui.header.LogoAlt\' | translate)}}" ng-src="{{$ctrl.getIconLink()}}"/></a></div>'
    }); 

	app.controller('prmLogoAfterController', [function () {
        var vm = this;
        vm.getIconLink = getIconLink;
        function getIconLink() {
            return vm.parentCtrl.iconLink;
        }
    }]);	

})();