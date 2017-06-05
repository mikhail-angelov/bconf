const auth = require('./auth')
const contact = require('./contact')
const chats = require('./chats')
const ws = require('./ws')
const uiState = require('./uiState')

module.exports = Object.assign(
    {},
    auth,
    contact,
    chats,
    ws,
    uiState
)
