'use strict'

const router = require('express').Router()

module.exports = (dao) => {
    router.get('/', (req, res) => {
        dao.findById('users', req.decoded.id)
            .then(user => res.json(user.contacts || []))
    })
    router.post('/', (req, res) => {
        dao.findById('users', req.decoded.id)
            .then(user => {
                user.contacts = user.contacts || []
                user.contacts.push(req.body)
                return dao.save(user)
            })
            .then(user => {
                return res.json(user.contacts)
            })
    })

    return router
}