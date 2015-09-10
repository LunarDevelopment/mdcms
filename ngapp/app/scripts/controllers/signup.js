'use strict';

/**
 * @ngdoc function
 * @name tweadsApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the tweadsApp
 */
angular.module('tweadsApp')
  .controller('SignupCtrl', function ($scope, $auth) {
    var vm = this;
    vm.signup = function() {
      $auth.signup({
        displayName: vm.displayName,
        email: vm.email,
        department: vm.department,
        password: vm.password
      }).catch(function(response) {
        if (typeof response.data.message === 'object') {
          angular.forEach(response.data.message, function(message) {
            console.log({
              content: message[0],
              animation: 'fadeZoomFadeDown',
              type: 'material',
              duration: 3
            });
          });
        } else {
          console.log({
            content: response.data.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        }
      });
    };
  });
