const express = require('express')
const passport = require('passport')
const authController = require('./auth/authController')
const userController = require('./controller/userController')
require('./auth/passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireLogin = passport.authenticate('local', { session: false })

const routers = express.Router()
routers.use('/auth', authController)
routers.use('/user', userController)

module.exports = routers 
