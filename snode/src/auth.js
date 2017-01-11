'use strict'

const router = require('express').Router()
const sequrity = require('./security')

module.exports = (dao) => {
    router.post('/login', (req, res) => {
        console.log('/login', req.body)
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
        return resetPassword(req.body)
            .then(url => res.json({ url: url }))
            .catch(err => res.status(400).end(err))
    })
    router.post('/signUp', (req, res) => {
        console.log('/signUp', req.body)
        return createUser(req.body)
            .then((user) => res.json(user))
            .catch(err => res.status(400).end(err))
    })

    function login(credentials) {
        return dao.findOne('users', { email: credentials.email })
            .then(user => {
                if (user && sequrity.validatePassword(credentials.password, user.password)) {
                    const token = sequrity.encodeToken({
                        id: user.id
                    })
                    user.token = token
                    return user
                } else {
                    return Promise.reject('Invalid password')
                }
            })
    }

    function createUser(user) {
        return dao.findOne('users', { email: user.email })
            .then(exist => {
                if (!exist) {
                    user.password = sequrity.encodePassword(user.password)
                    return dao.create('users', user)
                        .then(result => {
                            const user = result.ops[0]
                            const token = sequrity.encodeToken({
                                id: user.id
                            })
                            user.token = token
                            return user
                        })
                } else {
                    return Promise.reject('The user with this email is already exist.')
                }
            })
    }

    function resetPassword(email) {
        return Promise.resolve('/fake-url') //todo: implement
    }

    return {
        router,

        //private
        login,
        createUser,
        resetPassword
    }
}

