const auth = require('./auth')
const contact = require('./contact')
const chats = require('./chats')
const channel = require('./channel')
const ws = require('./ws')
const uiState = require('./uiState')

module.exports = Object.assign(
    {},
    auth,
    contact,
    chats,
    channel,
    ws,
    uiState
)
