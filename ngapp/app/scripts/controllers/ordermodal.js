'use strict';

/**
 * @ngdoc function
 * @name tweadsApp.controller:OrdermodalCtrl
 * @description
 * # OrdermodalCtrl
 * Controller of the tweadsApp
 */
angular.module('tweadsApp')
  .controller('OrderModal', function (ModalService, Design) {
    var vm = this;
    vm.design = Design;
    vm.design.getUsers();
    console.log(vm.design.users);
    vm.number = 2;
    vm.text1 = 'Herp';
    vm.text2 = 'Derp';

    vm.callFunction = function () {
      ModalService.close();
    };
  });