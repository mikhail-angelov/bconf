'use strict'

const passport = require('passport')
const YandexStrategy = require('passport-yandex').Strategy

module.exports = (auth, config) => {
  passport.use(new YandexStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL
  },
    function (accessToken, refreshToken, profile, done) {
      console.log('login with yandex id', profile.id)
      auth.findUser({
        'yandex.id': profile.id
      })
        .then(function (user) {
          if (!user) {
            console.log('ya', profile)
            auth.createUser({
              name: profile.displayName,
              email: profile.emails[0].value,
              role: 'user',
              username: profile.emails[0].value.split('@')[0],
              provider: 'yandex',
              yandex: profile._json
            }, {
              'yandex.id': profile._json.id
              })
              .then(function (user) {
                return done(null, user);
              })
              .catch(function (err) {
                return done(err);
              });
          } else {
            return done(null, user);
          }
        })
        .catch(function (err) {
          return done(err);
        });
    }));
};
