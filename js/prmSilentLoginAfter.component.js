
class PrmSilentLoginAfterController {
    constructor(loggingService) {
        let userSessionManagerService = this.parentCtrl.userSessionManagerService;
        loggingService.setUserSessionManagerService(userSessionManagerService);
    }
}

PrmSilentLoginAfterController.$inject = ['loggingService'];

export default {
    bindings: {parentCtrl: '<'},
    controller: PrmSilentLoginAfterController,
    template: '',
};
