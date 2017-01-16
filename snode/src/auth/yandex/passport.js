'use strict'

const passport = require('passport')
const Strategy = require('passport-yandex').Strategy

module.exports = (auth, config) => {
  passport.use(new Strategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL
  },
    function (accessToken, refreshToken, profile, done) {
      console.log('login with yandex id', profile.id)
      const userQuery = {
        'yandex.id': profile.id
      }
      auth.findUser(userQuery)
        .then(function (user) {
          if (!user) {
            //console.log('ya', profile)
            createUser(userQuery, profile, accessToken, refreshToken)
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

  function createUser(userQuery, profile, accessToken, refreshToken) {
    return auth.createUser({
      name: profile.displayName,
      email: profile.emails[0].value,
      role: 'user',
      username: profile.emails[0].value.split('@')[0],
      provider: 'yandex',
      accessToken: accessToken,
      refreshToken: refreshToken,
      contacts: [],
      yandex: profile._json
    }, userQuery)
  }
};
