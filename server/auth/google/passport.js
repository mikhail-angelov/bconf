'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportGoogleOauth = require('passport-google-oauth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.setup = function (User, config) {
  _passport2.default.use(new _passportGoogleOauth.OAuth2Strategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  }, function (accessToken, refreshToken, profile, done) {
    User.findOneAsync({
      'google.id': profile.id
    }).then(function (user) {
      if (!user) {
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          role: 'user',
          username: profile.emails[0].value.split('@')[0],
          provider: 'google',
          google: profile._json,
          avatar: profile._json.image.url
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
