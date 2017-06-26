const webrtc = require('wrtc')

global.window = {
  RTCPeerConnection: webrtc.RTCPeerConnection,
  RTCSessionDescription: webrtc.RTCSessionDescription,
  RTCIceCandidate: webrtc.RTCIceCandidate
}
global.location = {
  protocol: 'http'
}

global.WebSocket = require('websocket').w3cwebsocket
global.Blob = Uint8Array
global.FileReader = FR

function FR () { }

FR.prototype.readAsBinaryString = function (data) {
  console.log('readAsBinaryString', data)

  this.onload({
    target: {
      result: 'data'
    }
  })
}
FR.prototype.readAsArrayBuffer = function (data) {
  console.log('readAsArrayBuffer', data)
  this.onload({
    target: {
      result: data
    }
  })
}

module.exports = {
  connect
}

function connect (username) {
  const Peer = require('../ui/services/peerjs/peer')

  const peer = new Peer(username, {
    host: '0.0.0.0',
    port: 9001,
    path: '/chat',
    serialization: 'json',
    debug: 3
  })
  peer.on('open', () => {
    console.log('open')
  })
  peer.on('connection', (conn) => {
    _registerPeer(conn.peer, conn)
  })

  function _registerPeer (username, conn) {
    console.log('Registering', username)
    conn.on('data', (msg) => {
      console.log('Messaga received', msg)
      console.log({ content: msg, author: username })
      conn.send(msg + ' your self')
    })
  }

  return peer
}
