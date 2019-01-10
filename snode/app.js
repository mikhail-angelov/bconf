'use strict'

const express = require('express')
const passport = require('passport')
const path = require('path')
const dao = require('./src/dao')
const bodyParser = require('body-parser')
const auth = require('./src/auth')
const contacts = require('./src/contacts')
const channels = require('./src/channels')
const chats = require('./src/chats')
const chatMessages = require('./src/chatMessages')

const app = express()

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((obj, done) => done(null, obj))

module.exports = {
  start,
}

function start(dbUrl) {
  return dao
    .init({
      url: dbUrl,
    })
    .then(() => {
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(bodyParser.json())
      app.use(passport.initialize())
      app.use(passport.session())

      app.use('/auth', auth.router)
      app.use('/api/contact', contacts.router)
      app.use('/api/channel', channels.router)
      app.use('/api/chats', chats.router)
      app.use('/api/chatMessages', chatMessages.router)
      app.use('/', express.static(path.join(__dirname, '/dist')))

      // cors
      app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
        next()
      })
      return app
    })
}
