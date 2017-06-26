
'use strict'

const router = require('express').Router()
const log = require('winston')
const security = require('./security')
const dao = require('./dao')

router.get('/:chatId', security.authRequired, (req, res) => {
  getMessages(req.params.chatId)
        .then(messages => res.json(messages))
        .catch(err => {
          log.error('get messages error', err)
          res.status(400).end('get messages error')
        })
})

function getMessages (chatId) {
  return dao.find('chatMessages', {
    chatId
  })
}

module.exports = {
  router,
  getMessages
}
