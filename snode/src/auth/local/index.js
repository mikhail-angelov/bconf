'use strict'

const express = require('express')
const passportConfig = require('./passport')

module.exports = (auth) => {
    passportConfig(auth)

    const publicRoutes = express.Router()
    const protectedRoutes = express.Router()

    publicRoutes.post('/login', (req, res) => {
        console.log('local/login', req.body.email)
        login(req.body)
            .then(user => res.json(user))
            .catch(err => res.status(401).end(err))
    })
    publicRoutes.post('/logout', (req, res) => {
        console.log('/logout')
        res.json({})
    })

    publicRoutes.post('/forgotPassword', (req, res) => {
        console.log('/forgotPassword', req.body)
        return auth.resetPassword(req.body)
            .then(url => res.json({ url: url }))
            .catch(err => res.status(400).end(err))
    })
    publicRoutes.post('/signUp', (req, res) => {
        console.log('/signUp', req.body)
        return auth.createUser(req.body, { email: req.body.email })
            .then((user) => res.json(user))
            .catch(err => res.status(400).end(err))
    })

    protectedRoutes.post('/validate', (req, res) => {
        console.log('/validate')
        if (req.decoded) {
            res.status(200).end()
        } else {
            res.status(401).end()
        }
    })
    
    protectedRoutes.post('/userInfo', (req, res) => {
        console.log('/userInfo')
        return auth.getUser(req.decoded.id)
            .then((user) => user?res.json(user):Promise.reject('user: '+req.decoded.id+' is absent'))
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
        publicRoutes,
        protectedRoutes,

        //private
        login
    }
}
