'use strict';

describe('Filter: objFilter', function () {

  // load the filter's module
  beforeEach(module('tweadsApp'));

  // initialize a new instance of the filter before each test
  var objFilter;
  beforeEach(inject(function ($filter) {
    objFilter = $filter('objFilter');
  }));

  it('should return the input prefixed with "objFilter filter:"', function () {
    var text = 'angularjs';
    expect(objFilter(text)).toBe('objFilter filter: ' + text);
  });

});
