'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var contactCtrlStub = {
  index: 'contactCtrl.index',
  destroy: 'contactCtrl.destroy',
  add: 'contactCtrl.add',
  createGuest: 'contactCtrl.createGuest'
};

var authServiceStub = {
  isAuthenticated: function() {
    return 'authService.isAuthenticated';
  },
  hasRole: function(role) {
    return 'authService.hasRole.' + role;
  }
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var contactIndex = proxyquire('./index', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './contact.controller': contactCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Contact API Router:', function() {

  it('should return an express router instance', function() {
    contactIndex.should.equal(routerStub);
  });

  describe('GET /api/contacts', function() {

    it('should be authenticated and route to user.controller.index', function() {
      routerStub.get
        .withArgs('/', 'authService.isAuthenticated', 'contactCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/contacts/:id', function() {

    it('should be authenticated and route to user.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'authService.isAuthenticated', 'contactCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/contacts/add', function() {

    it('should be authenticated and route to contact.controller.add', function() {
      routerStub.post
        .withArgs('/', 'authService.isAuthenticated', 'contactCtrl.add')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/contacts/createGuest', function() {

    it('should be authenticated and route to contact.controller.createGuest', function() {
      routerStub.post
        .withArgs('/createGuest', 'authService.isAuthenticated', 'contactCtrl.createGuest')
        .should.have.been.calledOnce;
    });

  });


});
