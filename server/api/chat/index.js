'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _chat = require('./chat.controller');

var _chat2 = _interopRequireDefault(_chat);

var _auth = require('../../auth/auth.service');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _auth2.default.isAuthenticated(), _chat2.default.index);
router.post('/', _auth2.default.isAuthenticated(), _chat2.default.create);
router.delete('/:id', _auth2.default.isAuthenticated(), _chat2.default.remove);
router.post('/:id/:userId', _auth2.default.isAuthenticated(), _chat2.default.addUser);
router.post('/:id/:userId', _auth2.default.isAuthenticated(), _chat2.default.removeUser);

module.exports = router;
//# sourceMappingURL=index.js.map
