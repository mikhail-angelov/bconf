const WebSocketServer = require('ws').Server

module.exports = (server) => {
  const wss = new WebSocketServer({ server: server })

    // ws
  wss.on('connection', function connection (ws) {
    console.log('on connect')
    ws.on('message', function message (data) {
      console.log('on message')
      // Broadcast to everyone else.
      wss.clients.forEach(function each (client) {
        if (client === ws) {
          client.send(data)
        }
      })
    })
  })
}
