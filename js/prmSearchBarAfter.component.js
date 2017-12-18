import get from 'lodash/get';

class PrmSearchBarAfterController {

    constructor($scope, $window, $element, $timeout, $document, $rootScope, loggingService) {

        let primoVersion = get($window.appConfig, 'system-configuration.Primo_Version_Number', 'unknown');
        let searchStateService = this.parentCtrl.searchService.searchStateService;

        this.$scope = $scope;
        this.$element = $element;
        this.$timeout = $timeout;
        this.loggingService = loggingService;

        // Inject Primo's searchStateService into our loggingService
        this.loggingService.setSearchStateService(searchStateService);
        this.loggingService.setPrimoVersion(primoVersion);

        this.pasteEventHandler = function() {
            this.loggingService.searchBarElementPasteEvent();
        }.bind(this);

        this.inputHandler = function() {
            this.loggingService.incrKeypressCount();
        }.bind(this);

        this.loggingService.initSearchBar();
        $document.ready(() => {

            // Note: mainSearchField also maps to the first input field on advanced search
            // this.$scope.$watch('$ctrl.parentCtrl.mainSearchField', (newValue, oldValue) => {
            //     if (newValue != oldValue) {
            //         this.loggingService.incrKeypressCount();
            //     }
            // });

            this.$scope.$watch('$ctrl.parentCtrl.advancedSearch', (newValue, oldValue) => {
                let parentElement = this.$element.parent()[0];
                let searchBarElement = parentElement.querySelector('#searchBar');

                // Focus on the search bar, if it exists.
                // Note that, when the language is changed,
                // the search bar is not available yet here.
                // We can watch for the element and then focus on it,
                // but it does not seem to worth it.
                if (searchBarElement && !oldValue) {
                    $timeout(() => searchBarElement.focus());
                }

                let $inputElems = angular.element(parentElement.querySelectorAll('input'));

                $inputElems.off('paste', this.pasteEventHandler); // To make sure we don't end up with double handlers
                $inputElems.on('paste', this.pasteEventHandler);

                $inputElems.off('input', this.inputHandler);  // To make sure we don't end up with double handlers
                $inputElems.on('input', this.inputHandler);

            });
        });
    }

    // // Called after this controller's element and its children have been linked.
    // $postLink() {
    //     // Focus input field on load. Adapted from a version by @muratseyhan
    //     // https://github.com/Det-Kongelige-Bibliotek/primo-explore-rex/commit/86432e68e313a43db1f01a3a251652f84952d5a6
    //     this.$timeout(() => {
    //         let parentElement = this.$element.parent();
    //         let searchBarElement = parentElement[0].querySelector('#searchBar');

    //         // Focus on the search bar, if it exists.
    //         // Note that, when the language is changed,
    //         // the search bar is not available yet here.
    //         // We can watch for the element and then focus on it,
    //         // but it does not seem to worth it.
    //         if (searchBarElement) {
    //             searchBarElement.focus();

    //             searchBarElement.addEventListener('paste', () => {
    //                 this.loggingService.searchBarElementPasteEvent();
    //             }, {passive: true, capture: true});
    //         }
    //     }, 0);
    // }

    // Change placeholder text (needs optimization I think)
    // by Alex RS: http://search-test.library.brandeis.edu/primo-explore/search?vid=BRANDTEST
    // var myVar = setInterval(function(parentCtrl) {
    //     parentCtrl._placeHolderText = calculatePlaceHolderText(parentCtrl._selectedTab);
    //     console.log("placeholder changed");
    // }, 100, this.parentCtrl);

    // setTimeout(function( myIntervalID ) {
    //     clearInterval(myIntervalID);
    //     console.log("placeholder interval cleared");
    // }, 5000, myVar);

    // $scope.$watch("$parent.$ctrl._selectedTab", function(newTab, oldTab) {
    //     $scope.$parent.$ctrl._placeHolderText = calculatePlaceHolderText(newTab);
    // });

    // function calculatePlaceHolderText (myTab) {
    //     switch (myTab) {
    //         case "pci":
    //             return "Find articles and other materials from scholarly journals, newspapers, and online collections";
    //             break;
    //         case "alma":
    //             return "Find books, movies, music, serials, etc";
    //             break;
    //         case "everything":
    //             return "Find ALL kinds of library resources (books, movies, journal articles, etc)";
    //             break;
    //         case "course":
    //             return "Find books & media on reserve for your class.";
    //             break;
    //         default:
    //             return "unknown-tab placeholder";
    //     }
    // }
}

PrmSearchBarAfterController.$inject = ['$scope', '$window', '$element', '$timeout', '$document', '$rootScope', 'loggingService'];

export default {
    // The < symbol denotes one-way bindings which are available since 1.5.
    bindings: {parentCtrl: '<'},
    controller: PrmSearchBarAfterController,
    template: '',
};
