import viewName from './viewName';
import LoggingService from './logging.service';

import prmActionListAfter from './prmActionListAfter.component';
import prmBriefResultContainerAfter from './prmBriefResultContainerAfter.component';
import prmBrowseSearchAfter from './prmBrowseSearchAfter.component';
import prmFullViewAfter from './prmFullViewAfter.component';
import prmFullViewServiceContainerAfter from './prmFullViewServiceContainerAfter.component';
import prmNoSearchResultAfter from './prmNoSearchResultAfter.component';
import prmSaveToFavoritesButtonAfterComponent from './prmSaveToFavoritesButtonAfter.component';
import prmSearchAfterComponent from './prmSearchAfter.component';
import prmSearchBarAfterConfig from './prmSearchBarAfter.component';
import prmSearchResultListAfter from './prmSearchResultListAfter.component';
import prmSilentLoginAfterComponent from './prmSilentLoginAfter.component';
import prmViewOnlineAfter from './prmViewOnlineAfter.component';
// import prmAlmaMashup from './prmAlmaMashup.component';


const app = angular.module('viewCustom', ['angularLoad']);

app.service('loggingService', LoggingService);

// SearchBar: The search form at the top of the page. Not reloaded on normal page changes.
app.component('prmSearchBarAfter', prmSearchBarAfterConfig);

// SearchAfter: Everything below the searchbar. Reloaded on normal page changes
app.component('prmSearchAfter', prmSearchAfterComponent);

// BrowseSearchAfter: Everything below the searchbar for browse pages. Reloaded on normal page changes
app.component('prmBrowseSearchAfter', prmBrowseSearchAfter);

// SearchResultList: The list of search results, repeated for each search page
app.component('prmSearchResultListAfter', prmSearchResultListAfter);

// NoSearchResult: If a search yields zero results, we get this instead of SearchResultList
app.component('prmNoSearchResultAfter', prmNoSearchResultAfter);

// BriefResultContainer: Each search result in the results list
app.component('prmBriefResultContainerAfter', prmBriefResultContainerAfter);

// FullView: The details view for a single record
app.component('prmFullViewAfter', prmFullViewAfter);

// FullView: The details view for a single record
app.component('prmFullViewServiceContainerAfter', prmFullViewServiceContainerAfter);

// ActionList: The action button bar: E-mail, Cite, Permalink, Endnote export etc.
app.component('prmActionListAfter', prmActionListAfter);

// SaveToFavoritesButton: The "pin record" button, this is found in multiple places
app.component('prmSaveToFavoritesButtonAfter', prmSaveToFavoritesButtonAfterComponent);

// SilentLogin: Component outside the root uiView.
app.component('prmSilentLoginAfter', prmSilentLoginAfterComponent);

// ViewOnline: ?
// app.component('prmViewOnlineAfter', prmViewOnlineAfter);

// Mangler -after hook
// app.component('prmAlmaMashup', prmAlmaMashup);

// ------------------------------------------------------------------------

// eslint-disable-next-line no-unused-vars
app.run(['$rootScope', 'loggingService', ($rootScope, loggingService) => {
    // WARNING: This might not be called if Primo errors..
    // Components may still be initialized
    $rootScope.viewName = viewName;
}]);
