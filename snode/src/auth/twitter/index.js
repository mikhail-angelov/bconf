'use strict';

const passport = require('passport')
const router = require('express').Router()
const passportConfig = require('./passport')

module.exports = (auth, config) => {
  passportConfig(auth, config)

  router
    .get('/', passport.authenticate('twitter', {
      failureRedirect: '/#login',
      session: false
    }))

    .get('/callback', passport.authenticate('twitter', {
      failureRedirect: '/#login',
      session: false
    }), auth.setTokenCookie)

  return {
    router
  }
}