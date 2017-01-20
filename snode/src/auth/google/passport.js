'use strict'

const passport = require('passport')
const Strategy = require('passport-google-oauth').OAuth2Strategy

module.exports = (auth, config) => {
  passport.use(new Strategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL
  }, (accessToken, refreshToken, profile, done) => authenticate(accessToken, refreshToken, profile, done)))

  function authenticate(accessToken, refreshToken, profile, done) {
    console.log('login with google id', profile.id)
    const userQuery = {
      'google.id': profile.id
    }
    return auth.findUser(userQuery)
      .then(user => {
        if (!user) {
          console.log('google', profile)
          return createUser(userQuery, profile, accessToken, refreshToken)
            .then(user=> done(null, user))
            .catch(err => {
              return done(err)
            });
        } else {
          return done(null, user)
        }
      })
      .catch(err => {
        return done(err)
      });
  }

  function createUser(userQuery, profile, accessToken, refreshToken) {
    return auth.createUser({
            name: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            role: 'user',
            username: profile.emails[0].value.split('@')[0],
            provider: 'google',
            google: profile._json,
            avatar:profile._json.image.url
          }, userQuery)
  }
}
