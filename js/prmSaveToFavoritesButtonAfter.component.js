
class PrmSaveToFavoritesButtonAfterController {

    constructor($timeout, $element, loggingService) {
        this.$timeout = $timeout;
        this.$element = $element;
        this.loggingService = loggingService;
    }

    $postLink() {
        this.$timeout(() => {
            let parentElement = this.$element.parent()[0];


            var pinBtn = parentElement.querySelector('button.pin-button'),
                unpinBtn = parentElement.querySelector('button.unpin-button');

            // Limitation: This will only save the first click, since then the
            // button is replaced with another button element. We could add a
            // DOM watcher, but it's not worth it I think.
            if (pinBtn) {
                pinBtn.addEventListener('click', () => {
                    this.loggingService.trackPinRecord(this.parentCtrl.item);
                }, {passive: true, capture: true});
            } else if (unpinBtn) {
                unpinBtn.addEventListener('click', () => {
                    this.loggingService.trackUnpinRecord(this.parentCtrl.item);
                }, {passive: true, capture: true});
            }

        });
    }
}

PrmSaveToFavoritesButtonAfterController.$inject = ['$timeout', '$element', 'loggingService'];

export default {
    bindings: {parentCtrl: '<'},
    controller: PrmSaveToFavoritesButtonAfterController,
    template: '',
};
