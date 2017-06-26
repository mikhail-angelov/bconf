'use strict'

const http = require('http')
const createPeerServer = require('./peer')
const app = require('./app')
const config = require('./config')

app.start(config.dbUrl)
    .then(expressApp => {
      const server = http.createServer(expressApp)
      require('./src/ws')(server)

      const serv = server.listen(config.port, function () {
        console.log('Express server listening on %d, in %s mode', config.port)
      })
      createPeerServer(serv)
    })
