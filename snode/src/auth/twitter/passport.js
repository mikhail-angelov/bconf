'use strict'

const passport = require('passport')
const Strategy = require('passport-twitter').Strategy

module.exports = (auth, config) => {
  passport.use(new Strategy({
    consumerKey: config.clientID,
    consumerSecret: config.clientSecret,
    callbackURL: config.callbackURL
  }, (accessToken, refreshToken, profile, done) => authenticate(accessToken, refreshToken, profile, done)))

  function authenticate (accessToken, refreshToken, profile, done) {
    console.log('login with twitter id', profile.id)
    const userQuery = {
      'twitter.id': profile.id
    }
    return auth.findUser(userQuery)
      .then(user => {
        if (!user) {
          console.log('twitter', profile)
          return createUser(userQuery, profile, accessToken, refreshToken)
            .then(user => done(null, user))
            .catch(err => {
              return done(err)
            })
        } else {
          return done(null, user)
        }
      })
      .catch(err => {
        return done(err)
      })
  }

  function createUser (userQuery, profile, accessToken, refreshToken) {
    return auth.createUser({
      name: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      username: profile.username,
      role: 'user',
      provider: 'twitter',
      twitter: profile._json
    }, userQuery)
  }
}
