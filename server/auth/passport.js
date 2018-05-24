const passport = require('passport')
const User = require('../model/user')
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const security = require('./security')
const config = require('../config')


const localLogin = new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return Promise.reject('invalid login')
      }
      return security.verifyPassword(user, password)
    })
    .then(({ user, correct }) => {
      if (!correct) {
        return Promise.reject('invalid email or password')
      }
      return done(null, { id: user._id })
    })
    .catch(error => {
      done(null, false, { error })
    })
})


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderWithScheme('jwt')]),
  secretOrKey: config.authToken
}

const jwtLogin = new JwtStrategy(jwtOptions, (decodedToken, done) => {
  if (decodedToken.id) {
    done(null, decodedToken)
  } else {
    done(null, false)
  }
})

passport.use(jwtLogin)
passport.use(localLogin)

module.exports = {
  requireAuth: passport.authenticate('jwt', { session: false }),
  requireLogin: passport.authenticate('local', { session: false })
}
