'use strict';

/**
 * @ngdoc directive
 * @name tweadsApp.directive:mailto
 * @description
 * # mailto
 */
angular.module('tweadsApp')
  .directive('mailto', function () {
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      scope: {email: "="},
      template: '<a class="mailto btn btn-flat waves-effect waves-purple" ng-href="mailto:{{email}}">Email Client</a>'
    };
  });
