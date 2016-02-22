'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../eventBus/index.js');

var _index4 = _interopRequireDefault(_index3);

var _session = require('../store/session.js');

var _session2 = _interopRequireDefault(_session);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Peerjs', function () {

  var eventBus = new _index4.default();
  var peerjs;
  var testId = 'testPeerJs';
  var testClient = { id: testId, key: 'test', token: 'test', ip: '1.1.1.2', socket: { send: sinon.spy(), on: sinon.spy(), close: sinon.spy() } };
  var testUser = { validateUser: function validateUser() {
      return true;
    }, isConnectionAllowed: function isConnectionAllowed() {
      return true;
    } };

  before(function () {
    peerjs = new _index2.default(eventBus, _session2.default, testUser);
  });

  it('should begin defined', function () {
    peerjs.should.be.defined;
  });

  it('should emit open connection on proper request', function (done) {
    eventBus.once(eventBus.ACCEPT_CLIENT, function (client) {
      console.log('yo');
      client.should.be.defined;

      done();
    });

    eventBus.emit(eventBus.NEW_CONNECTION, testClient);
  });
});
//# sourceMappingURL=index.spec.js.map
