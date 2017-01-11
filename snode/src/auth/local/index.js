'use strict';

import express from 'express';
import passport from 'passport';
import auth from '../auth.service';
import util from '../../components/util/index.js'

var router = express.Router();

router.post('/', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        var error = err || info;
        if (error) {
            return res.status(401).json(error);
        }
        if (!user) {
            return res.status(404).json({message: 'Something went wrong, please try again.'});
        }

        var token = auth.signToken(user._id, user.role);
        res.json({token: token});
    })(req, res, next)
});

//guest auth
router.post('/guest', function (req, res, next) {
    //todo: check capture
    var guestId = util.randomId();
    var token = auth.signToken(guestId, 'guest');
    res.json({token: token});
});

module.exports = router;
