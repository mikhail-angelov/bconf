'use strict'

const util = require('util')
const EventEmitter = require('events')
const _ = require('lodash')

function bus() {
  // Initialize necessary properties from `EventEmitter` in this instance
  EventEmitter.call(this)
  _.extend(this, {
    NEW_CONNECTION: 'newConnection',
    SOCKET_CLOSED: 'socketClosed',
    SOCKET_ERROR: 'socketError',
    SOCKET_MESSAGE: 'socketMessage',
    ACCEPT_CLIENT: 'acceptClient',
    DISCONNECT_CLIENT: 'disconnectClient',
    SEND_MESSAGE: 'sendMessage',
  })
}

// Inherit functions from `EventEmitter`'s prototype
util.inherits(bus, EventEmitter)

// let _emit = bus.prototype.emit;
// console.log('init',bus.prototype.emit);
// bus.prototype.emit = function(){
//  _.forEach(arguments,(a,i)=>{
//    if(i<arguments.length-3)console.log('event',i,a)
//  })
//
// _emit.apply(this,arguments)
// }

module.exports = bus
