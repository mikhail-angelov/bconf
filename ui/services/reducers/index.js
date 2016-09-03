const auth = require('./auth')
const contacts = require('./contacts')

module.exports = function (state = {}, action) {
  return {
    contacts: contacts(state.contacts, action),
    auth: auth(state.auth, action)
  }
}
