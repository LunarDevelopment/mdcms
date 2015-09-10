'use strict';

/**
 * @ngdoc function
 * @name tweadsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tweadsApp
 */
angular.module('tweadsApp')
  .controller('LoginCtrl', function ($scope, $auth, $window, $rootScope) {
    var vm = this;
    vm.login = function () {
      $auth.login({
          email: vm.email,
          password: vm.password
        })
        .then(function () {
          $rootScope.authenticated = true;
          $window.Materialize.toast('You have successfully logged in', 3000);
        })
        .catch(function (response) {
          $window.Materialize.toast(response.data.message, 3000);
        });
    };
    vm.authenticate = function (provider) {
      $auth.authenticate(provider)
        .then(function () {
          $window.Materialize.toast('You have successfully logged in', 3000);
        })
        .catch(function (response) {
          console.log(response);
        });
    };
  });
