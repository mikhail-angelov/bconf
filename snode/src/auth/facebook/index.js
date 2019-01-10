'use strict'

const passport = require('passport')
const router = require('express').Router()
const passportConfig = require('./passport')

module.exports = (auth, config) => {
  passportConfig(auth, config)

  router
    .get(
      '/',
      passport.authenticate('facebook', {
        failureRedirect: '/#login',
        scope: ['user_about_me', 'email'],
        session: false,
      })
    )

    .get(
      '/callback',
      passport.authenticate('facebook', {
        failureRedirect: '/#login',
        session: false,
      }),
      auth.setTokenCookie
    )

  return {
    router,
  }
}
