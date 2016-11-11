const auth = require('./auth')
const contact = require('./contact')
const message = require('./message')
const chats = require('./chats')
const ws = require('./ws')

module.exports = Object.assign(
    {},
    auth,
    contact,
    message,
    chats,
    ws
)
