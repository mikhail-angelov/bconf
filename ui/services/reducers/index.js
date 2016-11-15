const auth = require('./auth')
const contacts = require('./contacts')
const messages = require('./messages')
const uiState = require('./uiState')

module.exports = function (state = {}, action) {
  return {
    contacts: contacts(state.contacts, action),
    auth: auth(state.auth, action),
    messages: messages(state.messages, action),
    uiState: uiState(state.uiState, action)
  }
}
