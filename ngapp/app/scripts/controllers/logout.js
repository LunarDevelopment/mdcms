'use strict';

/**
 * @ngdoc function
 * @name tweadsApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the tweadsApp
 */
angular.module('tweadsApp')
  .controller('LogoutCtrl', function ($auth, $rootScope) {
    var vm = this;
    if (!$auth.isAuthenticated()) {
      return;
    }
    $auth.logout()
      .then(function () {
        $rootScope.authenticated = false;
        console.log({
          content: 'You have been logged out',
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
        });
      });
  });
