'use strict';

describe('Directive: ModalDirective', function () {

  // load the directive's module
  beforeEach(module('tweadsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-modal-directive></-modal-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ModalDirective directive');
  }));
});
