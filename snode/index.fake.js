'use strict'

const http = require('http')
const createPeerServer = require('./peer')
const app = require('./app')
const config = require('./config')

const fakeWebRTCClient = require('./fake.webrtc.client.js')
const mongoUnit = require('mongo-unit')
const fakeDb = require('./fakeDb')

mongoUnit.start()
    .then(mongoUrl => app.start(mongoUrl))
    .then(expressApp => {
      const server = http.createServer(expressApp)
      require('./src/ws')(server)

      const serv = server.listen(config.port, function () {
        console.log('Express server listening on %d, in %s mode', config.port)
        fakeWebRTCClient.connect('test')
      })
      createPeerServer(serv)
    })
    .then(() => {
      mongoUnit.load(fakeDb)
    })
