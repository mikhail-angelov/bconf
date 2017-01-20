'use strict';

const passport = require('passport')
const router = require('express').Router()
const passportConfig = require('./passport')

module.exports = (auth, config) => {
  passportConfig(auth, config)

  router
    .get('/', passport.authenticate('google', {
      failureRedirect: '/#login',
      scope: [
        'profile',
        'email'
      ],
      session: false
    }))

    .get('/callback', passport.authenticate('google', {
      failureRedirect: '/#login',
      session: false
    }), auth.setTokenCookie)

  return {
    router
  }
}