var User = require('../models/user');
var Session = require('../models/session');

var UserHandler = function () {
  this.get = get;
};

function get(req, res, next) {
  var userId = req.param('userId');

  console.log(JSON.stringify(req.params));

  User.findOne({id: userId}, function (err, user) {
    if (user) {
      res.send(user);
    } else {
      res.status(404);
    }
    res.end();
  });
}

module.exports = UserHandler;
