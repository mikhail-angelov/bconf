var User = require('../models/user');
var Session = require('../models/session');
var mongooseMask = require('mongoosemask');
var connectionManager = require('../peerjs/connectionManager')
var _ = require('lodash-node');

var UserHandler = function () {
  this.get = get;
  this.createGuest = createGuest;
  this.getFriends = getFriends;
};

function get(req, res) {
  var userId = req.param('userId');
  console.log('get user info ' + userId);
  User.findOne({id: userId}, function (err, user) {
    if (user) {
      res.send(toDTO(user));
    } else {
      res.status(404);
    }
    res.end();
  });
}
function createGuest(req, res) {
  var referId = req.body.refer;
  var referToken = req.body.sharedToken;
  console.log('create new guest for ' + referId);
  User.findOne({id: referId, sharedToken: referToken}, function (err, refer) {
    if (refer) {
      User.createGuest({
        friends: [refer.id]
      }).then(function (user) {
        res.send(toDTO(user));
        res.end();
      });
    } else {
      res.status(404);
      res.end();
    }
  });
}

function getFriends(req, res) {
  var userId = req.param('userId');
  console.log('get user info ' + userId);
  User.getFriends(userId).then(function (friends) {
    var dto = _.map(friends, function (value) {
      return toDTO(value);
    });
    //set status
    dto.forEach(function(client){
      client.status = 'offline';
      if(connectionManager.getClient(client.id)){
        client.status = 'online';
      }
    });
    res.send(dto);
    res.end();
  }, function(){
    res.status(404);
    res.end();
  });
}

function toDTO(user) {
  return mongooseMask.mask(user, ['_id', 'providerId', 'providerToken', 'providerRefreshToken']);
}

module.exports = UserHandler;
