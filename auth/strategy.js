var config = require('../config')
  , FacebookStrategy = require('passport-facebook').Strategy
  , YandexStrategy = require('passport-yandex').Strategy
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  , User = require('../models/user')
  , Session = require('../models/session')
  , Q = require('q')
  , logger = require('../logger');


var googlePlus = new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  function (accessToken, refreshToken, profile, done) {
    console.log('accessToken ' + accessToken);
    console.log('refreshToken ' + refreshToken);
    User.findOne({provider_id: profile.id, provider: 'google'}, function (err, user) {
      console.log(JSON.stringify(profile));
      if (!user) {
        User.createUser({
          lastName: profile.name.familyName,
          firstName: profile.name.givenName,
          gender: profile.gender,
          providerId: profile.id,
          email: profile._json.email,
          provider: profile.provider,
          displayName: profile.displayName,
          providerToken: accessToken,
          providerRefreshToken: refreshToken,
          birthday: profile._json.birthday,
          avatar: profile._json.picture,
          link: profile._json.link
        }).then(function (newUser) {
          createSession(newUser.id);
        });
      }
      //if (!usr) {
      //  usr = new User({
      //    last_name: profile._json.family_name,
      //    first_name: profile._json.given_name,
      //    email: profile._json.email
      //  })
      //}
      //usr.token = accessToken;
      //usr.save(function (err, usr, num) {
      //  if (err) {
      //    console.log('error saving token');
      //  }
      //});
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
    User.findOne({provider_id: profile.id, provider: 'facebook'}, function (err, user) {
      console.log(JSON.stringify(profile));
      if (!user) {
        User.createUser({
          lastName: profile.name.familyName,
          firstName: profile.name.givenName,
          gender: profile.gender,
          providerId: profile.id,
          email: profile.id,
          provider: profile.provider,
          displayName: profile.displayName,
          providerToken: accessToken,
          providerRefreshToken: refreshToken,
          birthday: profile._json.birthday,
          link: profile.profileUrl
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

var yandex = new YandexStrategy({
    clientID: config.YANDEX_CLIENT_ID,
    clientSecret: config.YANDEX_CLIENT_SECRET,
    callbackURL: config.YANDEX_CB
  },
  function (accessToken, refreshToken, profile, done) {
    logger.info(JSON.stringify(profile));
    User.findOne({provider_id: profile.id, provider: 'yandex'}, function (err, user) {
      if (!user) {
        User.createUser({
          lastName: profile.name.familyName,
          firstName: profile.name.givenName,
          gender: profile.gender,
          providerId: profile.id,
          email: profile.emails[0].value,
          provider: profile.provider,
          displayName: profile.displayName,
          providerToken: accessToken,
          providerRefreshToken: refreshToken,
          birthday: profile._json.birthday
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


function createSession(userId) {
  Session.createSession(userId);
}

var Strategy = {
  googlePlus: googlePlus,
  facebook: facebook,
  yandex: yandex
};
module.exports = Strategy;
