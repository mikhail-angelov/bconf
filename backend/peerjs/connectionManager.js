var util = require('./util');
var WebSocketServer = require('ws').Server;
var url = require('url');
var clientFactory = require('./client');
var presenceManager = require('./presenceManager');
var express = require('express');
var app = express();
var logger = require('../logger');

var _clients = {};

function init(server) {
  var self = this;

  presenceManager.init(this);

  var path = '/peer/peerjs';

  // Create WebSocket server as well.
  this._wss = new WebSocketServer({path: path, server: server});

  this._wss.on('connection', function (socket) {
    var query = url.parse(socket.upgradeReq.url, true).query;
    var id = query.id;
    var token = query.token;
    var key = query.key;
    var ip = socket.upgradeReq.socket.remoteAddress;

    if (!id || !token || !key) {
      socket.send(JSON.stringify({type: 'ERROR', payload: {msg: 'No id, token, or key supplied to websocket server'}}));
      socket.close();
      return;
    }

    if (_clients[id]) {
      // ID-taken, invalid token
      socket.send(JSON.stringify({type: 'ID-TAKEN', payload: {msg: 'ID is taken'}}));
      socket.close();
      return;
    }

    var client = clientFactory.create(socket, id, token, ip,
      function (client, message) {
        var type = message.type;
        var src = message.src;
        var dst = message.dst;
        var data = JSON.stringify(message);

        var destination = _clients[dst];

        // User is connected!
        if (destination) {
          try {
            //this._log(type, 'from', src, 'to', dst);
            console.log('send message to ' + dst);
            if (destination.socket) {
              destination.sendMessage(data);
            } else {
              // Neither socket no res available. Peer dead?
              throw "Peer dead";
            }
          } catch (e) {
            // This happens when a peer disconnects without closing connections and
            // the associated WebSocket has not closed.
            // Tell other side to stop trying.
            console.log('peer is disconnected do something');
            //this._removePeer(key, dst);
            //this._handleTransmission(key, {
            //  type: 'LEAVE',
            //  src: dst,
            //  dst: src
            //});
          }
        } else {
          // Wait for this client to connect/reconnect (XHR) for important
          // messages.
          if (type !== 'LEAVE' && type !== 'EXPIRE' && dst) {
            console.log('peer is absent do something');
            //var self = this;
            //if (!this._outstanding[key][dst]) {
            //  this._outstanding[key][dst] = [];
            //}
            //this._outstanding[key][dst].push(message);
          } else if (type === 'LEAVE' && !dst) {
            //this._removePeer(key, src);
            console.log('clean up list');
            presenceManager.peerDisconnected(src);
            delete _clients[src];
          } else {
            // Unavailable destination specified with message LEAVE or EXPIRE
            // Ignore
          }
        }
      }, function (client) {
        console.log('Socket closed:', client.id);
        presenceManager.peerDisconnected(client.id);
        delete _clients[client.id];
      }, function (err) {
        socket.send(JSON.stringify({type: 'ERROR', payload: {msg: err}}));
      });

    if (client) {
      logger.info('new client ' + id + ' is created');
      _clients[id] = client;
      presenceManager.peerConnected(id);
    }
  });
  return app;
}

function getClient(clientId) {
  if (_clients[clientId]) {
    return _clients[clientId];
  } else {
    return null;
  }
}

module.exports = {
  init: init,
  getClient: getClient
};
