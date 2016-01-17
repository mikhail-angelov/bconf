'use strict';

import express from 'express';
import passport from 'passport';
import config from '../config/environment/index';
import User from '../api/user/user.model';

// Passport Configuration
require('./local/passport').setup(User, config);
require('./facebook/passport').setup(User, config);
require('./google/passport').setup(User, config);
require('./twitter/passport').setup(User, config);
require('./yandex/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local'));
router.use('/facebook', require('./facebook'));
router.use('/twitter', require('./twitter'));
router.use('/google', require('./google'));
router.use('/yandex', require('./yandex'));

module.exports = router;
