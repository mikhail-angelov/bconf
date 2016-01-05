'use strict';

describe('Controller: MainController', function() {

  beforeEach(module('bconfApp'));
  beforeEach(module('web/main/main.html'));


  var scope;
  var MainController;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope, $state) {
    $httpBackend = _$httpBackend_;

    scope = $rootScope.$new();
    state = $state;
    MainController = $controller('MainController', {
      $scope: scope
    });
  }));

  it('should have injected state to the controller', function() {
    expect(!!MainController.$state).toBe(true);
  });
});
