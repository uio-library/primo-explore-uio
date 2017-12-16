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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvbWFpbi5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9qcy9wcm1TZWFyY2hBZnRlci5jb21wb25lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFNLE1BQU0sUUFBUSxNQUFSLENBQWUsWUFBZixFQUE2QixDQUFDLGFBQUQsQ0FBN0IsQ0FBWjs7QUFFQSxJQUFJLFNBQUosQ0FBYyxnQkFBZDs7Ozs7Ozs7Ozs7SUNKTSx3QixHQUVGLGtDQUFZLE1BQVosRUFBb0IsUUFBcEIsRUFBOEIsUUFBOUIsRUFBd0MsU0FBeEMsRUFBbUQ7QUFBQTs7QUFDL0MsY0FBVSxLQUFWLENBQWdCLFlBQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0EsaUJBQVMsWUFBTTtBQUNYLGdCQUFJLFNBQVMsUUFBUSxPQUFSLENBQWdCLFNBQVMsYUFBVCxDQUF1QixhQUF2QixDQUFoQixDQUFiO0FBQUEsZ0JBQ0ksZ0JBQWdCLFFBQVEsT0FBUixDQUFnQixTQUFTLGFBQVQsQ0FBdUIscUJBQXZCLENBQWhCLENBRHBCO0FBQUEsZ0JBRUksbUJBQW1CLFFBQVEsT0FBUixDQUFnQixTQUFTLGFBQVQsQ0FBdUIsa0JBQXZCLENBQWhCLENBRnZCOztBQUlBLGdCQUFJLE9BQU8sTUFBWCxFQUFtQjtBQUNmO0FBQ0EsaUNBQWlCLE1BQWpCLENBQXdCLE9BQU8sTUFBUCxHQUFnQixRQUFoQixDQUF5QixTQUF6QixDQUF4QjtBQUNBLG9CQUFJLFNBQVMsU0FBUyxNQUFULENBQWIsQ0FIZSxDQUdxQjtBQUNwQyx1QkFBTyxNQUFQLEVBSmUsQ0FJcUI7QUFDdkM7QUFDSixTQVhELEVBV0csR0FYSDtBQVlILEtBaEJEO0FBaUJILEM7O0FBR0wseUJBQXlCLE9BQXpCLEdBQW1DLENBQUMsUUFBRCxFQUFXLFVBQVgsRUFBdUIsVUFBdkIsRUFBbUMsV0FBbkMsQ0FBbkM7O2tCQUVlO0FBQ1gsY0FBVSxFQUFDLFlBQVksR0FBYixFQURDO0FBRVgsZ0JBQVksd0JBRkQ7QUFHWCxjQUFVO0FBSEMsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgcHJtU2VhcmNoQWZ0ZXJDb21wb25lbnQgZnJvbSAnLi9wcm1TZWFyY2hBZnRlci5jb21wb25lbnQnO1xuXG5jb25zdCBhcHAgPSBhbmd1bGFyLm1vZHVsZSgndmlld0N1c3RvbScsIFsnYW5ndWxhckxvYWQnXSk7XG5cbmFwcC5jb21wb25lbnQoJ3BybVNlYXJjaEFmdGVyJywgcHJtU2VhcmNoQWZ0ZXJDb21wb25lbnQpO1xuIiwiY2xhc3MgUHJtU2VhcmNoQWZ0ZXJDb250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgJGNvbXBpbGUsICR0aW1lb3V0LCAkZG9jdW1lbnQpIHtcbiAgICAgICAgJGRvY3VtZW50LnJlYWR5KCgpID0+IHtcbiAgICAgICAgICAgIC8vIE5vdGU6IEF0IHRoaXMgcG9pbnQsIHRoZSBmcm9udHBhZ2UgSFRNTCB0ZW1wbGF0ZSBtaWdodCBub3QgeWV0IGJlIHJlYWR5LlxuICAgICAgICAgICAgLy8gV2Ugc2VlIHRoaXMgcHJvYmxlbSBlc3BlY2lhbGx5IGluIEZpcmVmb3ggZm9yIHNvbWUgcmVhc29uLiBVbnRpbCB3ZSBmaW5kIGEgYmV0dGVyXG4gICAgICAgICAgICAvLyB3YXkgdG8gZGV0ZWN0IHdoZW4gdGhlIHRlbXBsYXRlIGlzIGxvYWRlZCwgd2UgdXNlIGEgdGltZW91dCBvZiAxMDAgbXNlY3MuXG4gICAgICAgICAgICAkdGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGZvb3RlciA9IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudWlvLWZvb3RlcicpKSxcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyU3BhY2luZyA9IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudWlvLWZvb3Rlci1zcGFjaW5nJykpLFxuICAgICAgICAgICAgICAgICAgICBwcm1TZWFyY2hBZnRlckVsID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BybS1zZWFyY2gtYWZ0ZXInKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZm9vdGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBXZSBhcmUgb24gdGhlIGZyb250IHBhZ2UuIE1vdmUgZm9vdGVyIHRvIG91ciBzY29wZSBhbmQgbWFrZSBpdCB2aXNpYmxlXG4gICAgICAgICAgICAgICAgICAgIHBybVNlYXJjaEFmdGVyRWwuYXBwZW5kKGZvb3Rlci5kZXRhY2goKS5hZGRDbGFzcygndmlzaWJsZScpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZuTGluayA9ICRjb21waWxlKGZvb3Rlcik7ICAgICAgLy8gcmV0dXJucyBhIExpbmsgZnVuY3Rpb24gdXNlZCB0byBiaW5kIHRlbXBsYXRlIHRvIHRoZSBzY29wZVxuICAgICAgICAgICAgICAgICAgICBmbkxpbmsoJHNjb3BlKTsgICAgICAgICAgICAgICAgICAgICAvLyBCaW5kIHNjb3BlIHRvIHRoZSB0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuUHJtU2VhcmNoQWZ0ZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckY29tcGlsZScsICckdGltZW91dCcsICckZG9jdW1lbnQnXTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGJpbmRpbmdzOiB7cGFyZW50Q3RybDogJzwnfSxcbiAgICBjb250cm9sbGVyOiBQcm1TZWFyY2hBZnRlckNvbnRyb2xsZXIsXG4gICAgdGVtcGxhdGU6ICcnLFxufVxuIl19
