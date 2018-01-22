import get from 'lodash/get';

class PrmBrowseSearchAfterController {

    constructor($scope, $window, $element, $timeout, $document, $rootScope, loggingService) {
        console.log('[slurp] Constructed PrmBrowseSearchAfter', this.parentCtrl);
        $document.ready(() => {
            let data = {
                input: this.parentCtrl.browseSearchBarService.searchBarInput,
                scope: this.parentCtrl.browseSearchService.searchedScope,
            };
            loggingService.trackBrowse(data);
        });
    }
}

PrmBrowseSearchAfterController.$inject = ['$scope', '$window', '$element', '$timeout', '$document', '$rootScope', 'loggingService'];

export default {
    // The < symbol denotes one-way bindings which are available since 1.5.
    bindings: {parentCtrl: '<'},
    controller: PrmBrowseSearchAfterController,
    template: '',
};
