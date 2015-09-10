'use strict';

/**
 * @ngdoc service
 * @name tweadsApp.notify
 * @description
 * # notify
 * Factory in the tweadsApp.
 */
angular.module('tweadsApp')
  .factory('Notify', function ($window) {
    // Service logic
    // ...
    var vm = {};
    vm.timing = 3000;
    vm.new = function (status) {
      var notify = {message:''};
      if (status.status === 'OK'){ 
        notify.message = status.message;
      }
      if (status.status === 'ERROR'){ 
        notify.message = status.message;
      }
      vm.push(notify);
    };
    vm.errors = function (response) {
      angular.forEach(response.data.errors, function (value, key) {
        vm.push(value);
      });
    };
    vm.push = function (status) {
      $window.Materialize.toast(status.message, vm.timing);
    };
    // Public API here
    return vm;
  });