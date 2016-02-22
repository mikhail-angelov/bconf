'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _auth = require('../auth.service');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _passport2.default.authenticate('facebook', {
  scope: ['email', 'user_about_me'],
  failureRedirect: '/signup',
  session: false
})).get('/callback', _passport2.default.authenticate('facebook', {
  failureRedirect: '/signup',
  session: false
}), _auth2.default.setTokenCookie);

module.exports = router;
//# sourceMappingURL=index.js.map
