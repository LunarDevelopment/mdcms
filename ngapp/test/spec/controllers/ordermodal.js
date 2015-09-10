'use strict';

describe('Controller: OrdermodalCtrl', function () {

  // load the controller's module
  beforeEach(module('tweadsApp'));

  var OrdermodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrdermodalCtrl = $controller('OrdermodalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OrdermodalCtrl.awesomeThings.length).toBe(3);
  });
});
