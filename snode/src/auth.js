'use strict'

const router = require('express').Router()
const sequrity = require('./security')

module.exports = (dao) => {
    router.post('/login', (req, res) => {
        console.log('/login', req.body)
        dao.findOne('users', { email: req.body.email })
            .then(user => {
                if (user && sequrity.validatePassword(req.body.password, user.password)) {
                    const token = sequrity.encodeToken({
                        id: user.id
                    })
                    user.token = token
                    res.json(user)
                } else {
                    res.status(401).end('invalid password')
                }
            })
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
        const url = user.resetPassword(req.body)
        res.json({ url: url })
    })
    router.post('/signUp', (req, res) => {
        console.log('/signUp', req.body)
        const user = req.body
        user.password = sequrity.encodePassword(user.password)
        const newUser = dao.create('users', user)
            .then(() => {
                res.json(newUser)
            })
            .catch(err => {
                res.status(400).end(err)
            })

    })

    return router
}

