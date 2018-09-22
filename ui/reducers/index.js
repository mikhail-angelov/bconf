const auth = require('./auth')
const contacts = require('./contacts')
const chats = require('./chats')
const channels = require('./channels')
const uiState = require('./uiState')

module.exports = function (state = {}, action) {
  return {
    contacts: contacts(state.contacts, action),
    auth: auth(state.auth, action),
    chats: chats(state.chats, action),
    channels: channels(state.chats, action),
    uiState: uiState(state.uiState, action)
  }
}