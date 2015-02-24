var express = require('express')
  , config = require('./config')
  , routes = require('./routes')
  , AuthHandler = require('./handlers/AuthHandler')
  , passport = require('passport')
  , refresh = require('passport-oauth2-refresh')
  , FacebookStrategy = require('passport-facebook').Strategy
  , YandexStrategy = require('passport-yandex').Strategy
  , mongoose = require('mongoose')
  , UserDB = require('./models/user');

var app = express();

var google_strategy = require('passport-google-oauth').OAuth2Strategy;

app.configure(function () {

  app.set('client-url', 'http://localhost:8000');
  app.set('client-google-signin', '/google?action=signin');
  app.disable('x-powered-by');

  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(passport.initialize());
  app.use(app.router);
  app.use(express.static(__dirname + '/app'));
  app.use('/bower_components', express.static(__dirname + '/bower_components'));
});

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

app.configure('development', function () {
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
  console.log("Starting in development mode");
});


mongoose.connect('mongodb://localhost:27017/db');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log("Connected to db");
});


var strategy = new google_strategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  function (accessToken, refreshToken, profile, done) {
    console.log('accessToken ' + accessToken);
    console.log('refreshToken ' + refreshToken);
    UserDB.findOne({email: profile._json.email}, function (err, usr) {
      console.log(JSON.stringify(profile));
      if (!usr) {
        usr = new UserDB({
          last_name: profile._json.family_name,
          first_name: profile._json.given_name,
          email: profile._json.email
        })
      }
      usr.token = accessToken;
      usr.save(function (err, usr, num) {
        if (err) {
          console.log('error saving token');
        }
      });
      process.nextTick(function () {
        return done(null, profile);
      });
    });
  }
);

var fbStrategy = new FacebookStrategy({
    clientID: config.FB_CLIENT_ID,
    clientSecret: config.FB_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    console.log('accessToken ' + accessToken);
    console.log('refreshToken ' + refreshToken);
    console.log(JSON.stringify(profile));
    UserDB.findOne({email: profile.id}, function (err, usr) {
      console.log(JSON.stringify(profile));
      if (!usr) {
        usr = new UserDB({last_name: profile.name.familyName, first_name: profile.name.givenName, email: profile.id})
      }
      usr.token = accessToken;
      usr.save(function (err, usr, num) {
        if (err) {
          console.log('error saving token');
        }
      });
      process.nextTick(function () {
        return done(null, profile);
      });
    });
  }
);

var yandexStrategy = new YandexStrategy({
    clientID: config.YANDEX_CLIENT_ID,
    clientSecret: config.YANDEX_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/yandex/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    UserDB.findOrCreate({yandexId: profile.id}, function (err, user) {
      return done(err, user);
    });
  }
);

passport.use(yandexStrategy);
passport.use(fbStrategy);
passport.use(strategy);
refresh.use(strategy);


var handlers = {
  auth: new AuthHandler()
};

routes.setup(app, handlers);

app.listen(3000);
console.log('Listening on port 3000');


