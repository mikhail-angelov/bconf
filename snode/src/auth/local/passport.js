'use strict'

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

function localAuthenticate(auth, email, password, done) {
  auth.findUser({
    email: email.toLowerCase()
  })
    .then(function(user) {
      if (!user) {
        return done(null, false, {
          message: 'This email is not registered.'
        });
      }
      const authenticated = auth.authenticate(user, password) 
      if (!authenticated) {
        return done(null, false, {
          message: 'This password is not correct.'
        });
      } else {
        return done(null, authenticated);
      }
    })
    .catch(function(err) {
      return done(err);
    });
}

module.exports = (auth) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    return localAuthenticate(auth, email, password, done);
  }));
}
