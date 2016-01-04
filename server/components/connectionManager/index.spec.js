'use strict';

//import app from '../..';
import managerFactory  from './index';
import eventBusFactory  from '../eventBus/index.js';

describe('ConnectionManager', function () {

  let manager;
  let eventBus = new eventBusFactory();
  const testId = 'test';
  let connect;
  let socketEvent = {};
  let ws = {on: (message, onConnect) => connect = onConnect};
  let socketMock = {
    send: sinon.spy((m)=> {
      console.log('sending..', m)
    }),
    close: sinon.spy(),
    on: sinon.spy((event, cb) => socketEvent[event] = cb),
    upgradeReq: {url: 'ws://localhost:80/?id=' + testId + '&token=test&key=test', socket: {remoteAddress: '1.1.1.1'}}
  };

  var testClient = {id: testId, key: 'test', token: 'test', ip: '1.1.1.1', socket: socketMock};
  before(function () {
    manager = new managerFactory(ws, eventBus);
  });

  it('should begin defined', function () {
    manager.should.be.defined;
    connect.should.be.defined;
  });

  it('should open connection properly', function (done) {

    eventBus.once(eventBus.NEW_CONNECTION, (client)=> {

      socketMock.send.reset();
      client.should.be.defined;
      eventBus.emit(eventBus.ACCEPT_CLIENT, client);
      socketMock.send.withArgs('{"type":"OPEN"}').should.have.been.calledOnce
      done();
    });

    connect(socketMock);
  });


  it('should emit event on new message', function (done) {
    let message = 'test';

    eventBus.once(eventBus.SOCKET_MESSAGE, (client, data)=> {

      console.log('message sent')
      data.should.be.equal(message)
      done();
    });

    socketEvent['message'](message);
  });

  it('should send message on message event', function () {
    let message = '{"src":"' + testId + '","dst":"' + testId + '","type":"OFFER"}';

    socketMock.send.reset();
    eventBus.emit(eventBus.SEND_MESSAGE, testClient, message)
    socketMock.send.should.have.been.calledOnce
  });

});
