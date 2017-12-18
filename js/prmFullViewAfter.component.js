
class PrmFullViewAfterController {
    constructor(loggingService) {
        let item = this.parentCtrl.item;
        loggingService.trackViewRecord(item);
    }
}

PrmFullViewAfterController.$inject = ['loggingService'];

export default {
    bindings: {parentCtrl: '<'},
    controller: PrmFullViewAfterController,
    template: '',
};
