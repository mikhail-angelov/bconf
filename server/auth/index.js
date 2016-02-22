'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _index = require('../config/environment/index');

var _index2 = _interopRequireDefault(_index);

var _user = require('../api/user/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Passport Configuration
require('./local/passport').setup(_user2.default, _index2.default);
require('./facebook/passport').setup(_user2.default, _index2.default);
require('./google/passport').setup(_user2.default, _index2.default);
require('./twitter/passport').setup(_user2.default, _index2.default);
require('./yandex/passport').setup(_user2.default, _index2.default);

var router = _express2.default.Router();

router.use('/local', require('./local'));
router.use('/facebook', require('./facebook'));
router.use('/twitter', require('./twitter'));
router.use('/google', require('./google'));
router.use('/yandex', require('./yandex'));

module.exports = router;
//# sourceMappingURL=index.js.map
