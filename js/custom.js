(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _prmSearchAfter = require('./prmSearchAfter.component');

var _prmSearchAfter2 = _interopRequireDefault(_prmSearchAfter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = angular.module('viewCustom', ['angularLoad']);

app.component('prmSearchAfter', _prmSearchAfter2.default);

},{"./prmSearchAfter.component":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PrmSearchAfterController = function PrmSearchAfterController($scope, $compile, $timeout, $document) {
  _classCallCheck(this, PrmSearchAfterController);

  $document.ready(function () {
    // Note: At this point, the frontpage HTML template might not yet be ready.
    // We see this problem especially in Firefox for some reason. Until we find a better
    // way to detect when the template is loaded, we use a timeout of 100 msecs.
    $timeout(function () {
      var footer = angular.element(document.querySelector('.uio-footer')),
          footerSpacing = angular.element(document.querySelector('.uio-footer-spacing')),
          prmSearchAfterEl = angular.element(document.querySelector('prm-search-after'));

      if (footer.length) {
        // We are on the front page. Move footer to our scope and make it visible
        prmSearchAfterEl.append(footer.detach().addClass('visible'));
        var fnLink = $compile(footer); // returns a Link function used to bind template to the scope
        fnLink($scope); // Bind scope to the template
      }
    }, 100);
  });
};

PrmSearchAfterController.$inject = ['$scope', '$compile', '$timeout', '$document'];

exports.default = {
  bindings: { parentCtrl: '<' },
  controller: PrmSearchAfterController,
  template: ''
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvbWFpbi5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9qcy9wcm1TZWFyY2hBZnRlci5jb21wb25lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFNLE1BQU0sUUFBUSxNQUFSLENBQWUsWUFBZixFQUE2QixDQUFDLGFBQUQsQ0FBN0IsQ0FBWjs7QUFFQSxJQUFJLFNBQUosQ0FBYyxnQkFBZDs7Ozs7Ozs7Ozs7SUNKTSx3QixHQUVKLGtDQUFZLE1BQVosRUFBb0IsUUFBcEIsRUFBOEIsUUFBOUIsRUFBd0MsU0FBeEMsRUFBbUQ7QUFBQTs7QUFDakQsWUFBVSxLQUFWLENBQWdCLFlBQU07QUFDcEI7QUFDQTtBQUNBO0FBQ0EsYUFBUyxZQUFNO0FBQ2IsVUFBSSxTQUFTLFFBQVEsT0FBUixDQUFnQixTQUFTLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBaEIsQ0FBYjtBQUFBLFVBQ0ksZ0JBQWdCLFFBQVEsT0FBUixDQUFnQixTQUFTLGFBQVQsQ0FBdUIscUJBQXZCLENBQWhCLENBRHBCO0FBQUEsVUFFSSxtQkFBbUIsUUFBUSxPQUFSLENBQWdCLFNBQVMsYUFBVCxDQUF1QixrQkFBdkIsQ0FBaEIsQ0FGdkI7O0FBSUEsVUFBSSxPQUFPLE1BQVgsRUFBbUI7QUFDakI7QUFDQSx5QkFBaUIsTUFBakIsQ0FBd0IsT0FBTyxNQUFQLEdBQWdCLFFBQWhCLENBQXlCLFNBQXpCLENBQXhCO0FBQ0EsWUFBSSxTQUFTLFNBQVMsTUFBVCxDQUFiLENBSGlCLENBR21CO0FBQ3BDLGVBQU8sTUFBUCxFQUppQixDQUltQjtBQUNyQztBQUNGLEtBWEQsRUFXRyxHQVhIO0FBWUQsR0FoQkQ7QUFpQkQsQzs7QUFHSCx5QkFBeUIsT0FBekIsR0FBbUMsQ0FBQyxRQUFELEVBQVcsVUFBWCxFQUF1QixVQUF2QixFQUFtQyxXQUFuQyxDQUFuQzs7a0JBRWU7QUFDYixZQUFVLEVBQUMsWUFBWSxHQUFiLEVBREc7QUFFYixjQUFZLHdCQUZDO0FBR2IsWUFBVTtBQUhHLEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHBybVNlYXJjaEFmdGVyQ29tcG9uZW50IGZyb20gJy4vcHJtU2VhcmNoQWZ0ZXIuY29tcG9uZW50JztcblxuY29uc3QgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3ZpZXdDdXN0b20nLCBbJ2FuZ3VsYXJMb2FkJ10pO1xuXG5hcHAuY29tcG9uZW50KCdwcm1TZWFyY2hBZnRlcicsIHBybVNlYXJjaEFmdGVyQ29tcG9uZW50KTtcbiIsImNsYXNzIFBybVNlYXJjaEFmdGVyQ29udHJvbGxlciB7XG5cbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkY29tcGlsZSwgJHRpbWVvdXQsICRkb2N1bWVudCkge1xuICAgICRkb2N1bWVudC5yZWFkeSgoKSA9PiB7XG4gICAgICAvLyBOb3RlOiBBdCB0aGlzIHBvaW50LCB0aGUgZnJvbnRwYWdlIEhUTUwgdGVtcGxhdGUgbWlnaHQgbm90IHlldCBiZSByZWFkeS5cbiAgICAgIC8vIFdlIHNlZSB0aGlzIHByb2JsZW0gZXNwZWNpYWxseSBpbiBGaXJlZm94IGZvciBzb21lIHJlYXNvbi4gVW50aWwgd2UgZmluZCBhIGJldHRlclxuICAgICAgLy8gd2F5IHRvIGRldGVjdCB3aGVuIHRoZSB0ZW1wbGF0ZSBpcyBsb2FkZWQsIHdlIHVzZSBhIHRpbWVvdXQgb2YgMTAwIG1zZWNzLlxuICAgICAgJHRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBsZXQgZm9vdGVyID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51aW8tZm9vdGVyJykpLFxuICAgICAgICAgICAgZm9vdGVyU3BhY2luZyA9IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudWlvLWZvb3Rlci1zcGFjaW5nJykpLFxuICAgICAgICAgICAgcHJtU2VhcmNoQWZ0ZXJFbCA9IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwcm0tc2VhcmNoLWFmdGVyJykpO1xuXG4gICAgICAgIGlmIChmb290ZXIubGVuZ3RoKSB7XG4gICAgICAgICAgLy8gV2UgYXJlIG9uIHRoZSBmcm9udCBwYWdlLiBNb3ZlIGZvb3RlciB0byBvdXIgc2NvcGUgYW5kIG1ha2UgaXQgdmlzaWJsZVxuICAgICAgICAgIHBybVNlYXJjaEFmdGVyRWwuYXBwZW5kKGZvb3Rlci5kZXRhY2goKS5hZGRDbGFzcygndmlzaWJsZScpKTtcbiAgICAgICAgICBsZXQgZm5MaW5rID0gJGNvbXBpbGUoZm9vdGVyKTsgICAgICAvLyByZXR1cm5zIGEgTGluayBmdW5jdGlvbiB1c2VkIHRvIGJpbmQgdGVtcGxhdGUgdG8gdGhlIHNjb3BlXG4gICAgICAgICAgZm5MaW5rKCRzY29wZSk7ICAgICAgICAgICAgICAgICAgICAgLy8gQmluZCBzY29wZSB0byB0aGUgdGVtcGxhdGVcbiAgICAgICAgfVxuICAgICAgfSwgMTAwKTtcbiAgICB9KTtcbiAgfVxufVxuXG5Qcm1TZWFyY2hBZnRlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRjb21waWxlJywgJyR0aW1lb3V0JywgJyRkb2N1bWVudCddO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGJpbmRpbmdzOiB7cGFyZW50Q3RybDogJzwnfSxcbiAgY29udHJvbGxlcjogUHJtU2VhcmNoQWZ0ZXJDb250cm9sbGVyLFxuICB0ZW1wbGF0ZTogJycsXG59XG4iXX0=
