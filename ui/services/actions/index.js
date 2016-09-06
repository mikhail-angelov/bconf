const auth = require('./auth')
const contact = require('./contact')
const message = require('./message')

module.exports = Object.assign(
    {},
    auth,
    contact,
    message
)
