var config = require('../config')
  , FacebookStrategy = require('passport-facebook').Strategy
  , YandexStrategy = require('passport-yandex').Strategy
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  , User = require('../models/user')
  , Session = require('../models/session')
  , Q = require('q')
  , uuid = require('node-uuid');


var googlePlus = new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  function (accessToken, refreshToken, profile, done) {
    console.log('accessToken ' + accessToken);
    console.log('refreshToken ' + refreshToken);
    User.findOne({email: profile._json.email}, function (err, usr) {
      console.log(JSON.stringify(profile));
      if (!usr) {
        usr = new User({
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

var facebook = new FacebookStrategy({
    clientID: config.FB_CLIENT_ID,
    clientSecret: config.FB_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    console.log('accessToken ' + accessToken);
    console.log('refreshToken ' + refreshToken);
    console.log(JSON.stringify(profile));
    User.findOne({email: profile.id}, function (err, usr) {
      console.log(JSON.stringify(profile));
      if (!usr) {
        usr = new User({last_name: profile.name.familyName, first_name: profile.name.givenName, email: profile.id})
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

var yandex = new YandexStrategy({
    clientID: config.YANDEX_CLIENT_ID,
    clientSecret: config.YANDEX_CLIENT_SECRET,
    callbackURL: config.YANDEX_CB
  },
  function (accessToken, refreshToken, profile, done) {
    console.log(JSON.stringify(profile));
    User.findOne({provider_id: profile.id, provider: 'yandex'}, function (err, user) {
      if (!user) {
        createUser({
          id: uuid.v1(),
          last_name: profile.name.familyName,
          first_name: profile.name.givenName,
          gender: profile.gender,
          provider_id: profile.id,
          email: profile.emails[0].value,
          provider: profile.provider,
          display_name: profile.displayName,
          provider_token: accessToken,
          provider_refresh_token: refreshToken,
          birthday: profile._json.birthday,
          shared_token: uuid.v1(),
          access_token: uuid.v1(),
          refresh_token: uuid.v1()
        }).then(function (newUser) {
          createSession(newUser.id);
        });
      }
      process.nextTick(function () {
        return done(null, profile);
      });
    });
  }
);

function createUser(user) {
  var deferred = Q.defer();
  var newUser = new User(user);
  newUser.save(function (err, newUser, num) {
    if (err) {
      console.log('error saving user');
    }
    deferred.resolve(newUser  );
  });
  return deferred.promise;
}
function createSession(userId) {
  Session.createSession(userId);
}

var Strategy = {
  googlePlus: googlePlus,
  facebook: facebook,
  yandex: yandex
};
module.exports = Strategy;
