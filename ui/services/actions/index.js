const auth = require('./auth')
const contact = require('./contact')
const message = require('./message')
const chats = require('./chats')
const ws = require('./ws')
const uiState = require('./uiState')

module.exports = Object.assign(
    {},
    auth,
    contact,
    message,
    chats,
    ws,
    uiState
)
