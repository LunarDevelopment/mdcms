'use strict';

/**
 * @ngdoc function
 * @name tweadsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tweadsApp
 */
angular.module('tweadsApp')
  .controller('MainCtrl', function ($window) {
    var vm = this;
    vm.exampleToast = {
      duration: 1000,
      message: 'You reached out!'
    };
  });