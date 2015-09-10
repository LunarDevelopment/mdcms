'use strict';

/**
 * @ngdoc function
 * @name tweadsApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the tweadsApp
 */
angular.module('tweadsApp')
  .controller('DashboardCtrl', function (Design, $window) {
    var vm = this;
    vm.design = Design;
    vm.design.getOrders();
    vm.design.getUsers();
    vm.getUserClass = function (val) {
      return {
        'border-left': 'solid 2px',
        'border-left-color': '#' + val
      };
    };
  });
