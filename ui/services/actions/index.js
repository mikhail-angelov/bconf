const auth = require('./auth')
const contact = require('./contact')
const message = require('./message')
const chats = require('./chats')


module.exports = Object.assign(
    {},
    auth,
    contact,
    message,
    chats
)
