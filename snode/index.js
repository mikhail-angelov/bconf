//process.env.DEBUG= '*'

const app = require('express')()
const server = require('http').createServer(app)
const createPeerServer = require('./peer')
const daoService = require('./src/dao')
const config = require('./config')

const expressConfig = require('./expressConfig')(app)

daoService({
    url: 'mongodb://mongo:27017/db'
}).then(dao => {

    const auth = require('./src/auth')(dao, config)
    const contacts = require('./src/contacts')(dao)

    app.use('/auth', auth)
    app.use('/api/contact', contacts.router)

    const ws = require('./src/ws')(server)

    const serv = server.listen(config.port, function () {
        console.log('Express server listening on %d, in %s mode', config.port, app.get('env'))
    })

    createPeerServer(serv)
})





