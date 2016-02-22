'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _contact = require('./contact.controller');

var _contact2 = _interopRequireDefault(_contact);

var _auth = require('../../auth/auth.service');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _auth2.default.isAuthenticated(), _contact2.default.index);
router.put('/:id', _auth2.default.isAuthenticated(), _contact2.default.update);
router.delete('/:id', _auth2.default.isAuthenticated(), _contact2.default.destroy);
router.post('/createGuest', _auth2.default.isAuthenticated(), _contact2.default.createGuest);
router.get('/search', _auth2.default.isAuthenticated(), _contact2.default.search);
router.post('/invite', _auth2.default.hasRole('user'), _contact2.default.add);
router.post('/accept', _auth2.default.hasRole('user'), _contact2.default.accept);

module.exports = router;
//# sourceMappingURL=index.js.map
