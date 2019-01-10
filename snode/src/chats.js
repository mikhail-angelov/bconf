'use strict'

const router = require('express').Router()
const security = require('./security')
const dao = require('./dao')
const co = require('co')
const _ = require('lodash')

router.get('/', security.authRequired, (req, res) => {
  getChats(req.decoded.id)
    .then(channel => res.json(channel))
    .catch(err => res.status(400).end('get chats error'))
})
router.post('/', security.authRequired, (req, res) => {
  // todo: validate params
  const contact = req.body
  co(function*() {
    yield addChatWithContact(req.decoded.id, contact)
    const chats = getChats(req.decoded.id)
    res.json(chats)
  }).catch(err => res.status(400).end('add chat error'))
})

router.delete('/:id', security.authRequired, (req, res) => {
  removeChat(req.params.id)
    .then(() => res.json({ success: 'ok' }))
    .catch(err => res.status(400).end('remove chat error'))
})

function getChats(userId) {
  return dao.find('chats', {
    userId,
  })
}

function addChatWithChannel(userId, channel) {
  return dao.create('chats', {
    userId,
    type: 'channel',
    contactId: channel._id,
  })
}

function addChatWithContact(userId, contact) {
  return dao.create('chats', {
    userId,
    type: 'contact',
    contactId: contact._id,
  })
}

function removeChat(chatId) {
  return dao.remove('chats', chatId)
}

module.exports = {
  router,
  getChats,
  addChatWithChannel,
  addChatWithContact,
  removeChat,
}
