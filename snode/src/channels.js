'use strict'

const router = require('express').Router()
const security = require('./security')
const dao = require('./dao')
const co = require('co')
const _ = require('lodash')

router.get('/:id', security.authRequired, (req, res) => {
    dao.findById('channels', req.params.id)
        .then(channel => res.json(channel))
        .catch(err => res.status(400).end('get channel error'))
})
router.post('/', security.authRequired, (req, res) => {
    //todo: validate params
    const channel = req.body
    //channel.ownerId = req.decode._id
    co(function*(){
        const contact = yield dao.create('channels', channel)
        res.json(contact)
    }).catch(err => res.status(400).end('add channel error'))
})
router.put('/', security.authRequired, (req, res) => {
    //todo: validate params
    dao.update('channels', req.body)
        .then(channel => res.json(channel))
        .catch(err => res.status(400).end('update channel error'))
})
router.delete('/:id', security.authRequired, (req, res) => {
    //todo: validate params
    dao.remove('channels', req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(400).end('remove channel error'))
})

router.get('/', security.authRequired, (req, res) => {
    const query = req.query //todo: validate params
    dao.find('channels', req.query)
        .then(channels => res.json(channels || []))
        .catch(err => res.status(400).end('search error'))
})

router.post('/addContact/:id', security.authRequired, (req, res) => {
    //todo: validate params, implement
    const contact = req.body
    res.json(contact)
})
router.post('/removeContact/:id', security.authRequired, (req, res) => {
    //todo: validate params, implement
    const contact = req.body
    res.json(contact)
})

module.exports = {
    router

    //private
}