'use strict'

import peerjsFactory from './index'
import eventBusFactory from '../eventBus/index.js'
import session from '../store/session.js'

describe('Peerjs', function () {
  var eventBus = new eventBusFactory()
  var peerjs
  const testId = 'testPeerJs'
  var testClient = {id: testId, key: 'test', token: 'test', ip: '1.1.1.2', socket: {send: sinon.spy(), on: sinon.spy(), close: sinon.spy()}}
  var testUser = {validateUser: () => true, isConnectionAllowed: () => true}

  before(function () {
    peerjs = new peerjsFactory(eventBus, session, testUser)
  })

  it('should begin defined', function () {
    peerjs.should.be.defined
  })

  it('should emit open connection on proper request', function (done) {
    eventBus.once(eventBus.ACCEPT_CLIENT, (client) => {
      console.log('yo')
      client.should.be.defined

      done()
    })

    eventBus.emit(eventBus.NEW_CONNECTION, testClient)
  })
})
