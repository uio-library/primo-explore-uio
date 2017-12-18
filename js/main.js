import viewName from './viewName';
import LoggingService from './logging.service';

import prmActionListAfter from './prmActionListAfter.component';
import prmBriefResultContainerAfter from './prmBriefResultContainerAfter.component';
import prmExploreMainAfter from './prmExploreMainAfter.component';
import prmFullViewAfter from './prmFullViewAfter.component';
import prmNoSearchResultAfter from './prmNoSearchResultAfter.component';
import prmSaveToFavoritesButtonAfterComponent from './prmSaveToFavoritesButtonAfter.component';
import prmSearchAfterComponent from './prmSearchAfter.component';
import prmSearchBarAfterConfig from './prmSearchBarAfter.component';
import prmSearchResultListAfter from './prmSearchResultListAfter.component';

const app = angular.module('viewCustom', ['angularLoad']);

app.service('loggingService', LoggingService);

app.component('prmActionListAfter', prmActionListAfter);
app.component('prmBriefResultContainerAfter', prmBriefResultContainerAfter);
app.component('prmExploreMainAfter', prmExploreMainAfter);
app.component('prmFullViewAfter', prmFullViewAfter);
app.component('prmNoSearchResultAfter', prmNoSearchResultAfter);
app.component('prmSaveToFavoritesButtonAfter', prmSaveToFavoritesButtonAfterComponent);
app.component('prmSearchAfter', prmSearchAfterComponent);
app.component('prmSearchBarAfter', prmSearchBarAfterConfig);
app.component('prmSearchResultListAfter', prmSearchResultListAfter);

// ------------------------------------------------------------------------

// eslint-disable-next-line no-unused-vars
app.run(['$rootScope', 'loggingService', ($rootScope, loggingService) => {
    // WARNING: This might not be called if Primo errors..
    // Components may still be initialized
    $rootScope.viewName = viewName;
}]);
