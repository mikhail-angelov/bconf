'use strict';

//import app from '../..';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../eventBus/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ConnectionManager', function () {

  var manager = undefined;
  var eventBus = new _index4.default();
  var testId = 'test';
  var connect = undefined;
  var socketEvent = {};
  var ws = { on: function on(message, onConnect) {
      return connect = onConnect;
    } };
  var socketMock = {
    send: sinon.spy(function (m) {
      console.log('sending..', m);
    }),
    close: sinon.spy(),
    on: sinon.spy(function (event, cb) {
      return socketEvent[event] = cb;
    }),
    upgradeReq: { url: 'ws://localhost:80/?id=' + testId + '&token=test&key=test', socket: { remoteAddress: '1.1.1.1' } }
  };

  var testClient = { id: testId, key: 'test', token: 'test', ip: '1.1.1.1', socket: socketMock };
  before(function () {
    manager = new _index2.default(ws, eventBus);
  });

  it('should begin defined', function () {
    manager.should.be.defined;
    connect.should.be.defined;
  });

  it('should open connection properly', function (done) {

    eventBus.once(eventBus.NEW_CONNECTION, function (client) {

      socketMock.send.reset();
      client.should.be.defined;
      eventBus.emit(eventBus.ACCEPT_CLIENT, client);
      socketMock.send.withArgs('{"type":"OPEN"}').should.have.been.calledOnce;
      done();
    });

    connect(socketMock);
  });

  it('should emit event on new message', function (done) {
    var message = 'test';

    eventBus.once(eventBus.SOCKET_MESSAGE, function (client, data) {

      console.log('message sent');
      data.should.be.equal(message);
      done();
    });

    socketEvent['message'](message);
  });

  it('should send message on message event', function () {
    var message = '{"src":"' + testId + '","dst":"' + testId + '","type":"OFFER"}';

    socketMock.send.reset();
    eventBus.emit(eventBus.SEND_MESSAGE, testClient, message);
    socketMock.send.should.have.been.calledOnce;
  });
});
//# sourceMappingURL=index.spec.js.map
