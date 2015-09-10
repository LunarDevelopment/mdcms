'use strict';

describe('Service: Design', function () {

  // load the service's module
  beforeEach(module('mdcmsApp'));

  // instantiate service
  var Design;
  beforeEach(inject(function (_Design_) {
    Design = _Design_;
  }));

  it('should do something', function () {
    expect(!!Design).toBe(true);
  });

});
