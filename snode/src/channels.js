'use strict'

const router = require('express').Router()
const log = require('winston')
const security = require('./security')
const dao = require('./dao')
const co = require('co')
const _ = require('lodash')
const chats = require('./chats')

router.get('/:id', security.authRequired, (req, res) => {
  dao.findById('channels', req.params.id)
        .then(channel => res.json(channel))
        .catch(err => postError(res, 'get channel error'))
})
router.post('/', security.authRequired, (req, res) => {
    // todo: validate params
  const newChannel = req.body
  newChannel.ownerId = req.decode._id
  co(function * () {
    const channel = yield dao.create('channels', newChannel)
    yield chats.addChatWithChannel(req.decode._id, channel)
    const chatList = yield chats.getChats(req.decode._id)
    res.json(chatList)
  }).catch(err => postError(res, 'add channel error'))
})
router.put('/', security.authRequired, (req, res) => {
    // todo: validate params
  dao.update('channels', req.body)
        .then(channel => res.json(channel))
        .catch(err => postError(res, 'update channel error'))
})
router.delete('/:id', security.authRequired, (req, res) => {
    // todo: validate params
  dao.remove('channels', req.params.id)
        .then(result => res.json(result))
        .catch(err => postError(res, 'remove channel error'))
})

router.get('/', security.authRequired, (req, res) => {
  const query = req.query // todo: validate params
  dao.find('channels', req.query)
        .then(channels => res.json(channels || []))
        .catch(err => postError(res, 'search error'))
})

router.post('/addContact/:id', security.authRequired, (req, res) => {
    // todo: validate params, implement
  const contact = req.body
  res.json(contact)
})
router.post('/removeContact/:id', security.authRequired, (req, res) => {
    // todo: validate params, implement
  const contact = req.body
  res.json(contact)
})

function postError (res, error) {
  log.error(error)
  res.status(400).end(error)
}

module.exports = {
  router

    // private
}
