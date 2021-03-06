const PeerServer = require('peer').PeerServer
const socketIO = require('socket.io')
const config = require('./config')

module.exports = createPeerServer

function createPeerServer(expressServer) {
  const io = socketIO(expressServer).listen(expressServer)
  const peerServer = new PeerServer({ port: config.peerServerPort, path: '/chat' })

  peerServer.on('connection', function(id) {
    io.emit('user-connected', id)
    console.log('User connected with #', id)
  })

  peerServer.on('disconnect', function(id) {
    io.emit('used-disconnected', id)
    console.log('User disconnected with #', id)
  })
}
