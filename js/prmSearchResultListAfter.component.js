
class PrmSearchResultListAfterController {

    constructor($window, $scope, loggingService) {
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
