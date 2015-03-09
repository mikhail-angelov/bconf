var User = require('../models/user');
var Session = require('../models/session');
var mongooseMask = require('mongoosemask');
var uuid = require('node-uuid');

var UserHandler = function () {
  this.get = get;
};

function get(req, res, next) {
  var userId = req.param('userId');

  console.log(JSON.stringify(req.params));
  if(userId == 0){
    var user = {
      id:uuid.v1(),
      display_name:'none',
      provider:'none',
      avatar: '/images/anonymous.png',
      friends:[]
    };
    res.send(user);
    res.end();
  }else {
    User.findOne({id: userId}, function (err, user) {
      if (user) {
        res.send(toDTO(user));
      } else {
        res.status(404);
      }
      res.end();
    });
  }
}

function toDTO(user){
  return mongooseMask.mask(user, ['_id', 'provider_id', 'provider_token', 'provider_refresh_token']);
}

module.exports = UserHandler;
