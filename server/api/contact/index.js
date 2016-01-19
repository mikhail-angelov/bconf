'use strict';

import express from 'express';
import controller from './contact.controller';
import auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), controller.add);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.post('/createGuest', auth.isAuthenticated(), controller.createGuest);
router.get('/search', auth.isAuthenticated(), controller.search);


module.exports = router;
