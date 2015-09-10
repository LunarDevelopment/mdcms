'use strict';

/**
 * @ngdoc filter
 * @name tweadsApp.filter:timestampToISO
 * @function
 * @description
 * # timestampToISO
 * Filter in the tweadsApp.
 */
angular.module('tweadsApp')
  .filter('timestampToISO', function() {
    return function(input) {
      input = new Date(input).toISOString();
      return input;
    };
  });
