'use strict'

const router = require('express').Router()
const passportConfig = require('./passport')

module.exports = (auth) => {
    passportConfig(auth)

    router.post('/login', (req, res) => {
        console.log('local/login', req.body.email)
        login(req.body)
            .then(user => res.json(user))
            .catch(err => res.status(401).end(err))
    })
    router.post('/logout', (req, res) => {
        console.log('/logout')
        res.json({})
    })

    router.post('/validate', (req, res) => {
        console.log('/validate')
        if (req.decoded) {
            res.status(200).end()
        } else {
            res.status(401).end()
        }
    })
    router.post('/forgotPassword', (req, res) => {
        console.log('/forgotPassword', req.body)
        return auth.resetPassword(req.body)
            .then(url => res.json({ url: url }))
            .catch(err => res.status(400).end(err))
    })
    router.post('/signUp', (req, res) => {
        console.log('/signUp', req.body)
        return auth.createUser(req.body, { email: req.body.email })
            .then((user) => res.json(user))
            .catch(err => res.status(400).end(err))
    })

    function login(credentials) {
        return auth.findUser({ email: credentials.email })
            .then(user => {
                const autorization = auth.authenticate(user, credentials.password)
                if (autorization) {
                    return autorization
                } else {
                    return Promise.reject('Invalid password')
                }
            })
    }

    return {
        router,

        //private
        login
    }
}
