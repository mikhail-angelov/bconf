'use strict'

const express = require('express')
const passport = require('passport')
const dao = require('./src/dao')
const config = require('./config')
const bodyParser = require('body-parser')
const auth = require('./src/auth')
const contacts = require('./src/contacts')

const app = express()

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

module.exports = {
    start
}

function start(dbUrl) {
    return dao.init({
        url: dbUrl
    }).then(() => {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(passport.initialize());
        app.use(passport.session());

        app.use('/auth', auth.router)
        app.use('/api/contact', contacts.router)
        app.use('/', express.static(__dirname + '/../dist'));

        //cors
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*")
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token")
            next()
        });
        return app
    })
}
