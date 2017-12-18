
class PrmActionListAfterController {
    constructor(loggingService, $document, $element) {
        // Note: action list can be part of results list OR record view.
        $document.ready(() => {
            let parentElement = $element.parent()[0];
            let btns = angular.element(parentElement.querySelectorAll('#scrollActionList button'));

            if (!btns.length) {
                console.error('Error: No action buttons found!');
            }

            btns.on('click', (evt) => {
                var sendToType = evt.currentTarget.querySelectorAll('.button-text')[0].getAttribute('translate');
                let item = this.parentCtrl.item;
                loggingService.trackSendTo(sendToType, item);
            });
        });
    }
}

PrmActionListAfterController.$inject = ['loggingService', '$document', '$element'];

export default {
    bindings: {parentCtrl: '<'},
    controller: PrmActionListAfterController,
    template: '',
};
