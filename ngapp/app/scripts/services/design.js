'use strict';
/**
 * @ngdoc service
 * @name tweadsApp.Design
 * @description
 * # Design
 * Factory in the tweadsApp.
 */
angular.module('tweadsApp')
  .service('Design', function ($http, $window, ModalService, Notify) {
    // Service logic
    // ...
    var vm = this;
    vm.newOrder = {
      soldDate: new Date()
    };
    vm.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    vm.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    vm.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    vm.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    vm.today = 'Today';
    vm.clear = 'Clear';
    vm.close = 'Close';
    vm.statusChoices = ['Not Started', 'Allocated', 'Collateral Recieved', 'Hurried', 'First Draft', 'Amends', 'Signed Off'];
    vm.onStart = function () {
      console.log('onStart');
    };
    vm.onRender = function () {
      console.log('onRender');
    };
    vm.onOpen = function () {
      console.log('onOpen');
    };
    vm.onClose = function () {
      console.log('onClose');
    };
    vm.onSet = function () {
      console.log('onSet');
    };
    vm.onStop = function () {
      console.log('onStop');
    };
    vm.designs = [];
    vm.users = [];
    vm.busy = false;
    vm.outreaches = 0;
    vm.cleanData = function (orders) {
      if (orders) {
        vm.designs = orders;
        console.log('vm.designs: ');
        console.log(vm.designs);
      }
      ModalService.close();
      vm.newOrder = {
        soldDate: new Date()
      };
    };
    vm.new = function () {
      ModalService.open({
        templateUrl: 'views/ordermodal.html',
        controller: 'OrderModal',
        controllerAs: 'vm'
      });
    };
    vm.edit = function (order) {
      vm.newOrder = angular.extend(vm.newOrder, order);
      ModalService.open({
        templateUrl: 'views/editordermodal.html',
        controller: 'OrderModal',
        controllerAs: 'vm'
      });
    };
    vm.createOrder = function () {
      if (vm.busy) {
        return;
      }
      vm.busy = true;
      var url = "/api/orders";
      $http({
        url: url,
        method: "POST",
        data: {
          companyName: vm.newOrder.companyName || null,
          contact: vm.newOrder.contact || null,
          comment: vm.newOrder.comment || null,
          rep: vm.newOrder.rep || null,
          telephone: vm.newOrder.telephone || null,
          email: vm.newOrder.email || null,
          designer: vm.newOrder.designer || null,
          status: vm.newOrder.status || 'Not Started',
          value: vm.newOrder.value || null,
          profit: vm.newOrder.profit || null,
          soldDate: vm.newOrder.soldDate || null,
          firstDraftDate: vm.newOrder.firstDraftDate || null,
          redraftDate: vm.newOrder.redraftDate || null
        }
      }).then(function (response) {
        Notify.new(response.data);
        vm.busy = false;
        vm.cleanData(response.data.orders);
      }, function (response) {
        // called asynchronously if an error occurs
        Notify.errors(response);
        vm.busy = false;
      });
    };
    vm.editOrder = function () {
      if (vm.busy) {
        return;
      } else if (!vm.newOrder.id) {
        return;
      }
      vm.busy = true;
      var url = "/api/orders";
      $http({
        url: url,
        method: "PUT",
        data: {
          id: vm.newOrder.id,
          companyName: vm.newOrder.companyName || null,
          contact: vm.newOrder.contact || null,
          rep: vm.newOrder.rep || null,
          comment: vm.newOrder.comment || null,
          telephone: vm.newOrder.telephone || null,
          email: vm.newOrder.email || null,
          designer: vm.newOrder.designer || null,
          status: vm.newOrder.status || 'Not Started',
          value: vm.newOrder.value || null,
          profit: vm.newOrder.profit || null,
          soldDate: vm.newOrder.soldDate || null,
          firstDraftDate: vm.newOrder.firstDraftDate || null,
          redraftDate: vm.newOrder.redraftDate || null
        }
      }).then(function (response) {
        Notify.new(response.data);
        vm.busy = false;
        vm.cleanData(response.data.orders);
      }, function (response) {
        // called asynchronously if an error occurs
        Notify.errors(response);
        vm.busy = false;
      });
    };
    vm.deleteOrder = function (order) {
      if (vm.busy) {
        return;
      } else if (!order.id) {
        return;
      }
      vm.busy = true;
      var url = "/api/orders";
      $http({
        url: url,
        method: "DELETE",
        params: {
          id: order.id
        }
      }).then(function (response) {
        Notify.new(response.data);
        vm.busy = false;
        vm.cleanData(response.data.orders);
      }, function (response) {
        // called asynchronously if an error occurs
        Notify.errors(response);
        vm.busy = false;
      });
    };
    vm.statusChange = function (order) {
      if (vm.busy) {
        return;
      } else if (!order.id) {
        return;
      }
      vm.busy = true;
      var url = "/api/orders/statusChange";
      $http({
        url: url,
        method: "PUT",
        data: {
          id: order.id,
          credits: order.credits,
          status: order.status || 'Not Started'
        }
      }).then(function (response) {
        Notify.new(response.data);
        vm.busy = false;
        vm.cleanData(response.data.orders);
      }, function (response) {
        // called asynchronously if an error occurs
        Notify.errors(response);
        vm.busy = false;
      });
    };
    vm.getOrders = function () {
      if (vm.busy) {
        return;
      }
      vm.busy = true;
      var url = "/api/orders";
      $http({
        url: url,
        method: "GET"
      }).then(function (response) {
        vm.cleanData(response.data.orders);
        vm.busy = false;
      }, function (response) {
        // called asynchronously if an error occurs
        Notify.errors(response);
        vm.busy = false;
      });
    };
    vm.getUsers = function () {
      if (vm.busy) {
        return;
      }
      vm.busy = true;
      var url = "/api/users";
      $http({
        url: url,
        method: "GET"
      }).then(function (response) {
        vm.users = response.data.users;
        console.log('vm.users: ');
        console.log(vm.users);
        vm.busy = false;
      }, function (response) {
        // called asynchronously if an error occurs
        Notify.errors(response);
        vm.busy = false;
      });
    };
    vm.sendEmailReminder = function () {
      if (vm.busy) {
        return;
      }
      vm.busy = true;
      var url = "/api/orders/sendEmailReminder";
      $http({
        url: url,
        method: "GET"
      }).then(function (response) {
        console.log('sendEmailReminder: ');
        console.log(response);
        vm.busy = false;
      }, function (response) {
        // called asynchronously if an error occurs
        Notify.errors(response);
        vm.busy = false;
      });
    };
  });