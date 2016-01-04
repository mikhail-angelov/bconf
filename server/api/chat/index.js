'use strict';

import express from 'express';
import controller from './chat.controller';
import auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), controller.create);
router.delete('/:id', auth.isAuthenticated(), controller.remove);
router.post('/:id/:userId', auth.isAuthenticated(), controller.addUser);
router.post('/:id/:userId', auth.isAuthenticated(), controller.removeUser);



module.exports = router;
