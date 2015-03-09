var User = require('../models/user');
var Session = require('../models/session');

var AuthHandler = function () {
  this.login = login;
  this.logout = logout;
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
    if (session && session.token_expires > now) {
      res.status(200);
    } else {
      res.status(401);
    }
    res.end();
  });
}

function logout(req, res, next) {
  var token = req.headers.token;
  console.log('remove token - ' + token);

  Session.findOneAndRemove({token: token}, function (err, session) {
    res.status(204);
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
    User.findOne({email: user._json.email}, function (err, usr) {
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
    User.findOne({email: user.id}, function (err, usr) {
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
    console.log(user);
  })(req, res, next);
}

function yandexSignInCallback(req, res, next) {
  passport = req._passport.instance;
  if(passport.ykey == req.query.code){
    return;
  }else{
    passport.ykey = req.query.code;
  }
  passport.authenticate('yandex', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('http://localhost:3000/#/error?redirect=yandex');
    }
    User.findOne({provider_id: user.id, provider: 'yandex'}, function (err, usr) {
      if (usr) {
        Session.findOne({user_id: usr.id}, function (err, session) {

          if (!session) {
            Session.createSession(usr.id).then(function (session) {
              redirect(res, session.token, usr.id);
            })
          } else {
            redirect(res, session.token, usr.id);
          }
        });
      }
    });
  })(req, res, next);
}
function redirect(res, token, userId) {
  res.writeHead(302, {
    'Location': 'http://localhost:3000/#/redirect?token=' + token + '&user=' + userId
  });
  res.end();
}

module.exports = AuthHandler;
