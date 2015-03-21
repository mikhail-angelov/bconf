var User = require('../models/user');
var logger = require('../logger');
var connectionManager = null;

function init(cm) {
  connectionManager = cm;
}

function peerConnected(clientId) {
  logger.info('client ' + clientId + ' is online');
  var message = {type: 'PRESENCE', src: clientId, status: 'online'};
  _broadcastPresence(clientId, message);
}

function peerDisconnected(clientId) {
  logger.info('client ' + clientId + ' is offline');
  var message = {type: 'PRESENCE', src: clientId, status: 'offline'};
  _broadcastPresence(clientId, message);
}

function _broadcastPresence(clientId, message) {
  User.getFriends(clientId).then(function (friends) {
    var activeFriends = [];
    friends.forEach(function (friend) {
      var client = connectionManager.getClient(friend.id);
      if (client) {
        activeFriends.push(client);
      }
    });
    activeFriends.forEach(function (friend) {
      console.log('try to send form ' + clientId + ' to ' + friend.id);
      friend.sendMessage(JSON.stringify(message));
    });
  });
}


module.exports = {
  init: init,
  peerConnected: peerConnected,
  peerDisconnected: peerDisconnected
};
