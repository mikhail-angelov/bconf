'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _auth = require('../auth.service');

var _auth2 = _interopRequireDefault(_auth);

var _index = require('../../components/util/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res, next) {
    _passport2.default.authenticate('local', function (err, user, info) {
        var error = err || info;
        if (error) {
            return res.status(401).json(error);
        }
        if (!user) {
            return res.status(404).json({ message: 'Something went wrong, please try again.' });
        }

        var token = _auth2.default.signToken(user._id, user.role);
        res.json({ token: token });
    })(req, res, next);
});

//guest auth
router.post('/guest', function (req, res, next) {
    //todo: check capture
    var guestId = _index2.default.randomId();
    var token = _auth2.default.signToken(guestId, 'guest');
    res.json({ token: token });
});

module.exports = router;
//# sourceMappingURL=index.js.map
