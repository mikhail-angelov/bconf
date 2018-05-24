const express = require('express')
const winston = require('winston')
const userService = require('../service/userService')
const passport = require('./passport')
const security = require('./security')

function check(req, res) {
  return userService.getUser(req.user.id)
    .then(user => {
      winston.info('login success', req.user.id)
      const token = security.generateToken(user)
      res.status(200).json({ user, token })
    }).catch(err => {
      winston.error('login error', err)
      res.status(401).json({
        error: 'login error'
      })
    })
}

function changePassword(req, res) {
  return res.status(200).json({ info: 'not implemented' })
}

function renewPassword(req, res) {
  return res.status(200).json({ info: 'not implemented' })
}

function resetPassword(req, res) {
  return res.status(200).json({ info: 'not implemented' })
}

function register(req, res) {
  return userService.createUser(req.body)
    .then(user => {
      const token = security.generateToken(user)
      res.status(200).json({ user, token })
    }).catch(err => {
      winston.error('createUser error', err)
      res.status(400).json(err)
    })
}

const routers = express.Router()
routers.post('/login', passport.requireLogin, check)
routers.post('/check', passport.requireAuth, check)
routers.put('/changepassword', passport.requireAuth, changePassword)
routers.post('/renewpassword', renewPassword)
routers.post('/resetpassword', resetPassword)
routers.post('/register', register)

module.exports = routers 
