'use strict'

const passport = require('passport')
const router = require('express').Router()

module.exports = (auth) => {

  router
    .get('/', passport.authenticate('yandex', {
      failureRedirect: '/signup',
      scope: [
        'profile',
        'email'
      ],
      session: false
    }))

    .get('/callback', passport.authenticate('yandex', {
      failureRedirect: '/signup',
      session: false
    }), auth.setTokenCookie);

  return router;
}
