var User = require('../models/user');
var Session = require('../models/session');
var mongooseMask = require('mongoosemask');

var UserHandler = function () {
  this.get = get;
};

function get(req, res, next) {
  var userId = req.param('userId');

  console.log(JSON.stringify(req.params));

  User.findOne({id: userId}, function (err, user) {
    if (user) {
      res.send(toDTO(user));
    } else {
      res.status(404);
    }
    res.end();
  });
}

function toDTO(user){
  return mongooseMask.mask(user, ['_id', 'provider_id', 'provider_token', 'provider_refresh_token']);
}

module.exports = UserHandler;
