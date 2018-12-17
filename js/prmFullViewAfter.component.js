
class PrmFullViewAfterController {
    constructor(loggingService) {
        this.loggingService = loggingService;
        this.item = this.parentCtrl.item;
        this.loggingService.trackViewRecord(this.item);
    }

    $onDestroy() {
        this.loggingService.leaveViewRecord(this.item);
    }
}

PrmFullViewAfterController.$inject = ['loggingService'];

export default {
    bindings: {parentCtrl: '<'},
    controller: PrmFullViewAfterController,
    template: '',  // `<div style="background:red; color:white; padding: 20px;">Heia</div>`,
};
