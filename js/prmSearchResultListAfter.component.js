import get from 'lodash/get';

class PrmSearchResultListAfterController {

    constructor($window, $scope, loggingService) {

        let primoVersion = get($window.appConfig, 'system-configuration.Primo_Version_Number', 'unknown');
        let searchStateService = this.parentCtrl.searchService.searchStateService;

        // Inject Primo's searchStateService into our loggingService
        loggingService.setSearchStateService(searchStateService);
        loggingService.setPrimoVersion(primoVersion);

        $scope.$watch('$ctrl.parentCtrl.numOfLoadedPages', (newValue) => {
            if (newValue) {
                loggingService.searchPageLoaded(newValue);
            }
        });
    }
}

PrmSearchResultListAfterController.$inject = ['$window', '$scope', 'loggingService'];

export default {
    bindings: {parentCtrl: '<'},
    controller: PrmSearchResultListAfterController,
    template: '',
};
