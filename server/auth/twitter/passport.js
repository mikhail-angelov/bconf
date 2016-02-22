'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportTwitter = require('passport-twitter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.setup = function (User, config) {
  _passport2.default.use(new _passportTwitter.Strategy({
    consumerKey: config.twitter.clientID,
    consumerSecret: config.twitter.clientSecret,
    callbackURL: config.twitter.callbackURL
  }, function (token, tokenSecret, profile, done) {
    User.findOneAsync({
      'twitter.id_str': profile.id
    }).then(function (user) {
      if (!user) {
        user = new User({
          name: profile.displayName,
          username: profile.username,
          role: 'user',
          provider: 'twitter',
          twitter: profile._json
        });
        user.saveAsync().then(function (user) {
          return done(null, user);
        }).catch(function (err) {
          return done(err);
        });
      } else {
        return done(null, user);
      }
    }).catch(function (err) {
      return done(err);
    });
  }));
};
//# sourceMappingURL=passport.js.map
