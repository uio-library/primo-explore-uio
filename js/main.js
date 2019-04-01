import viewName from './viewName';

import prmSearchAfterComponent from './prmSearchAfter.component';

const app = angular.module('viewCustom', ['angularLoad']);

// SearchAfter: Everything below the searchbar. Reloaded on normal page changes
app.component('prmSearchAfter', prmSearchAfterComponent);

// ------------------------------------------------------------------------

// eslint-disable-next-line no-unused-vars
app.run(['$rootScope', 'loggingService', ($rootScope, loggingService) => {
    // WARNING: This might not be called if Primo errors..
    // Components may still be initialized
    $rootScope.viewName = viewName;
}]);
