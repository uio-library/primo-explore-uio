class PrmSearchAfterController {

  constructor($scope, $compile, $timeout, $document) {
    $document.ready(() => {
      // Note: At this point, the frontpage HTML template might not yet be ready.
      // We see this problem especially in Firefox for some reason. Until we find a better
      // way to detect when the template is loaded, we use a timeout of 100 msecs.
      $timeout(() => {
        let footer = angular.element(document.querySelector('.uio-footer')),
            footerSpacing = angular.element(document.querySelector('.uio-footer-spacing')),
            prmSearchAfterEl = angular.element(document.querySelector('prm-search-after'));

        if (footer.length) {
          // We are on the front page. Move footer to our scope and make it visible
          prmSearchAfterEl.append(footer.detach().addClass('visible'));
          let fnLink = $compile(footer);      // returns a Link function used to bind template to the scope
          fnLink($scope);                     // Bind scope to the template
        }
      }, 100);
    });
  }
}

PrmSearchAfterController.$inject = ['$scope', '$compile', '$timeout', '$document'];

export default {
  bindings: {parentCtrl: '<'},
  controller: PrmSearchAfterController,
  template: '',
}
