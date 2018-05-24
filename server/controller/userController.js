const express = require('express')
const winston = require('winston')
const userService = require('../service/userService')
const passport = require('../auth/passport')
const routers = express.Router()

function getMe(req, res){
  return userService.getUser(req.user.id)
    .then(user => {
      res.status(200).json(user)
    }).catch(err => {
      winston.error('getMe error', err)
      res.status(400).json(err)
    })
}

function getUser(req, res){
  return userService.getUser(req.params.id)
    .then(user => {
      res.status(200).json(user)
    }).catch(err => {
      winston.error('getUser error', err)
      res.status(400).json(err)
    })
}

function updateMe(req, res){
  return res.status(200).json({info:'not implemented'})
}

function searchUsers(req, res){
  return res.status(200).json({info:'not implemented'})
}

routers.get('/', passport.requireAuth, getMe)
routers.get('/:id', passport.requireAuth, getUser)
routers.put('/', passport.requireAuth, updateMe)
routers.get('/search', passport.requireAuth, searchUsers)

module.exports = routers 