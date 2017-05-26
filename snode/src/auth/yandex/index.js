'use strict'

const passport = require('passport')
const router = require('express').Router()
const passportConfig = require('./passport')

module.exports = (auth, config) => {
  passportConfig(auth, config)

  router
    .get('/', passport.authenticate('yandex', {
      failureRedirect: '/#login'
    }))

    .get('/callback', passport.authenticate('yandex', {
      failureRedirect: '/#login'
    }), auth.setTokenCookie)

  return {
    router
  }
}
