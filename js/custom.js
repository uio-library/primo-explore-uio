(function () {
    "use strict";
    'use strict';

    console.log('Hei verden'); // dmheggo 2017-08-24

    var app = angular.module('viewCustom', ['angularLoad']);

    /****************************************************************************************************/

        /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

        /*var app = angular.module('centralCustom', ['angularLoad']);*/

    /****************************************************************************************************/

	
	// Add Clickable Logo
	app.controller('prmLogoAfterController', [function () {
        var vm = this;
        vm.getIconLink = getIconLink;
        function getIconLink() {
            return vm.parentCtrl.iconLink;
        }
    }]);
    
    app.component('prmLogoAfter', {
        bindings: {parentCtrl: '<'},
        controller: 'prmLogoAfterController',
        template: '<div class="product-logo product-logo-local" layout="row" layout-align="start center" layout-fill id="banner"><a href="https://bibsys-almaprimo.hosted.exlibrisgroup.com/primo-explore/search?vid=UBO_TEST&lang=no_NO"><img class="logo-image" alt="{{::(\'nui.header.LogoAlt\' | translate)}}" ng-src="{{$ctrl.getIconLink()}}"/></a></div>'
    }); 

		
	var app = angular.element(document.querySelector('primo-explore'));
	var appInjector = app.injector();
	var templateCache = appInjector.get('$templateCache');
	templateCache.put('components/search/topbar/userArea/user-area.html', `
	<div layout='row' layout-align="center center">
	  <prm-authentication layout="flex" [is-logged-in]="$ctrl.userName().length > 0"></prm-authentication>
	  <prm-change-lang aria-label="{{'eshelf.signin.title' | translate}}" ng-if="$ctrl.displayLanguage" label-type="icon"></prm-change-lang>
	  <prm-library-card-menu></prm-library-card-menu>
	</div>`);

	var appRootScope = appInjector.get('$rootScope');
	appInjector.invoke(function($compile) {
	  $compile(app)(appRootScope);
	  appRootScope.$apply()
	});
	
})();
