'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportFacebook = require('passport-facebook');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.setup = function (User, config) {
  _passport2.default.use(new _passportFacebook.Strategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['displayName', 'emails']
  }, function (accessToken, refreshToken, profile, done) {
    User.findOneAsync({
      'facebook.id': profile.id
    }).then(function (user) {
      if (!user) {
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value + '.facebook',
          role: 'user',
          provider: 'facebook',
          facebook: profile._json
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
