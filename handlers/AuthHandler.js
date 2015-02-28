var UserDB = require('../models/user');
var Session = require('../models/session');

var AuthHandler = function () {
  this.login = login;
  this.googleSignIn = googleSignIn;
  this.googleSignInCallback = googleSignInCallback;
  this.facebookSignIn = facebookSignIn;
  this.facebookSignInCallback = facebookSignInCallback;
  this.yandexSignIn = yandexSignIn;
  this.yandexSignInCallback = yandexSignInCallback;
};

function login(req, res, next) {
  var name = req.body.name;
  var token = req.body.token;
  console.log(req.body.token);

  Session.findOne({token: token}, function (err, session) {
    var now = new Date().getTime();
    if(session && session.token_expires > now){
      res.status(200);
    } else {
      res.status(401);
    }
    res.end();
  });
}

function googleSignIn(req, res, next) {
  passport = req._passport.instance;

  passport.authenticate('google', {
    scope: 'https://www.googleapis.com/auth/userinfo.email',
    accessType: 'offline',
    approvalPrompt: 'force'
  }, function (err, user, info) {
  })(req, res, next);

}

function googleSignInCallback(req, res, next) {
  passport = req._passport.instance;
  passport.authenticate('google', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('http://localhost:8000');
    }
    UserDB.findOne({email: user._json.email}, function (err, usr) {
      res.writeHead(302, {
        'Location': 'http://localhost:8000/#/index?token=' + usr.token + '&user=' + usr.email
      });
      res.end();
    });
  })(req, res, next);
}

function facebookSignIn(req, res, next) {
  passport = req._passport.instance;

  passport.authenticate('facebook', function (err, user, info) {
    console.log(info);
    console.log(res);
  })(req, res, next);
}
function facebookSignInCallback(req, res, next) {
  passport = req._passport.instance;
  passport.authenticate('facebook', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('http://localhost:8001');
    }
    UserDB.findOne({email: user.id}, function (err, usr) {
      res.writeHead(302, {
        'Location': 'http://localhost:8001/#/index?token=' + usr.token + '&user=' + usr.email
      });
      res.end();
    });
  })(req, res, next);
}

function yandexSignIn(req, res, next) {
  passport = req._passport.instance;

  passport.authenticate('yandex', function (err, user, info) {
  })(req, res, next);
}

function yandexSignInCallback(req, res, next) {
  passport = req._passport.instance;
  passport.authenticate('yandex', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('http://localhost:8002');
    }
    UserDB.findOne({email: user.id}, function (err, usr) {
      res.writeHead(302, {
        'Location': 'http://localhost:8001/#/index?token=' + usr.token + '&user=' + usr.email
      });
      res.end();
    });
  })(req, res, next);
}
module.exports = AuthHandler;
