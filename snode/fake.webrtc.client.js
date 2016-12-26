const webrtc = require('wrtc');

global.window = {
  RTCPeerConnection: webrtc.RTCPeerConnection,
  RTCSessionDescription: webrtc.RTCSessionDescription,
  RTCIceCandidate: webrtc.RTCIceCandidate
}
global.location = {
  protocol: 'http'
}

global.WebSocket = require('websocket').w3cwebsocket

module.exports = {
  init
}

function init() {
  const Peer = require('../ui/services/peerjs/peer')

  const peer = new Peer('test', {
    host: '0.0.0.0',
    port: 9000,
    path: '/chat',
    debug: 3
  });
  peer.on('open', () => {
    console.log('open')
  });
  peer.on('connection', (conn) => {
    _registerPeer(conn.peer, conn);
    opts.onConnect(conn.peer);
  });

  function _registerPeer(username, conn) {
    console.log('Registering', username);
    conn.on('data', (msg) => {
      console.log('Messaga received', msg);
      console.log({ content: msg, author: username });
      conn.send(msg + ' your self');
    })
  }

  return peer
}
