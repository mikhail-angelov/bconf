import passport from 'passport';
import {Strategy as YandexStrategy} from 'passport-yandex';

exports.setup = function(User, config) {
  passport.use(new YandexStrategy({
    clientID: config.yandex.clientID,
    clientSecret: config.yandex.clientSecret,
    callbackURL: config.yandex.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOneAsync({
      'yandex.id': profile.id
    })
      .then(function(user) {
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'user',
            username: profile.emails[0].value.split('@')[0],
            provider: 'yandex',
            yandex: profile._json
          });
          user.saveAsync()
            .then(function(user) {
              return done(null, user);
            })
            .catch(function(err) {
              return done(err);
            });
        } else {
          return done(null, user);
        }
      })
      .catch(function(err) {
        return done(err);
      });
  }));
};
