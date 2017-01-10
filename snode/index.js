//process.env.DEBUG= '*'

const app = require('express')()
const server = require('http').createServer(app)
const port = process.env.PORT || 9001
const createPeerServer = require('./peer')
const fakeWebRTCClient = require('./fake.webrtc.client.js')
const mongoUnit = require('mongo-unit')
const daoService = require('./src/dao')
const fakeDb = require('./fakeDb')


const expressConfig = require('./expressConfig')(app)

mongoUnit.start()
    .then(mongoUrl => daoService({
        url: mongoUrl
    }))
    .then(dao => {

        const auth = require('./src/auth')(dao)
        const contacts = require('./src/contacts')(dao)

        app.use('/', auth)
        app.use('/api/contact', contacts)

        const ws = require('./src/ws')(server)

        const serv = server.listen(port, function () {
            console.log('Express server listening on %d, in %s mode', port, app.get('env'));
            fakeWebRTCClient.connect('test');
        })

        createPeerServer(serv)
    })
    .then(()=>{
        mongoUnit.load(fakeDb)
    })





