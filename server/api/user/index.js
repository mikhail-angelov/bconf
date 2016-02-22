'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('./user.controller');

var _user2 = _interopRequireDefault(_user);

var _auth = require('../../auth/auth.service');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _auth2.default.hasRole('admin'), _user2.default.index);
router.delete('/:id', _auth2.default.hasRole('admin'), _user2.default.destroy);
router.get('/me', _auth2.default.isAuthenticated(), _user2.default.me);
router.put('/:id/password', _auth2.default.isAuthenticated(), _user2.default.changePassword);
router.get('/:id', _auth2.default.isAuthenticated(), _user2.default.show);
router.post('/', _user2.default.create);

module.exports = router;
//# sourceMappingURL=index.js.map
