'use strict';

/**
 * @ngdoc function
 * @name tweadsApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the tweadsApp
 */
angular.module('tweadsApp')
  .controller('ProfileCtrl', function ($scope, $auth, Account, $http, $rootScope) {
    var vm = this;
    /**
     * Get user's profile information.
     */
    vm.dump = function () {
      $http.get('/twitter/dump')
        .success(function (data) {
          console.log(data);
        })
        .error(function (error) {
          console.log({
            content: error,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };

      /**
     * Get user's profile information.
     */
    vm.getProfile = function () {
      Account.getProfile()
        .success(function (data) {
          vm.editUser = data;
          $rootScope.$storage.user = data;
        })
        .error(function (error) {
          console.log({
            content: error.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };


    /**
     * Update user's profile information.
     */
    vm.updateProfile = function () {
      Account.updateProfile({
        displayName: vm.editUser.displayName,
        department: vm.editUser.department,
        email: vm.editUser.email
      }).then(function () {
          $rootScope.$storage.user = angular.extend($rootScope.$storage.user, vm.editUser);
          console.log({
          content: 'Profile has been updated',
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
        });
      });
    };

    /**
     * Link third-party provider.
     */
    vm.link = function (provider) {
      $auth.link(provider)
        .then(function () {
          console.log({
            content: 'You have successfully linked ' + provider + ' account',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        })
        .then(function () {
          vm.getProfile();
        })
        .catch(function (response) {
          console.log({
            content: response.data.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };

    /**
     * Unlink third-party provider.
     */
    vm.unlink = function (provider) {
      $auth.unlink(provider)
        .then(function () {
          console.log({
            content: 'You have successfully unlinked ' + provider + ' account',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        })
        .then(function () {
          vm.getProfile();
        })
        .catch(function (response) {
          console.log({
            content: response.data ? response.data.message : 'Could not unlink ' + provider + ' account',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };

    vm.getProfile();
  });