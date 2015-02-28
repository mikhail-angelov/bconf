var User = require('../models/user');
var Session = require('../models/session');

var UserHandler = function () {
  this.get = get;
};

function get(req, res, next) {
  var userId = req.params.id;

  console.log(JSON.stringify(req));

  User.findOne({id: userId}, function (err, user) {
    if(user){
      res.send(user);
    } else {
      res.status(404);
    }
    res.end();
  });
}

module.exports = UserHandler;
