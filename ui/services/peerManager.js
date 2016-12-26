'use strict';

const Peer = require('./peerjs/peer')

module.exports = function openPeer (opts) {
  const _peers = {}
  
  console.log('Connecting with username', opts.username);
  const peer = new Peer(opts.username, {
    host: location.hostname,
    port: opts.port || 9000,
    path: opts.path || '/chat'
  });
  peer.on('open', opts.onOpen);
  peer.on('connection',(conn) =>{
    _registerPeer(conn.peer, conn);
    opts.onConnect(conn.peer);
  });

  function connect (username) {
    const conn = peer.connect(username);
    conn.on('open', () => {
      _registerPeer(username, conn);
    })
  };

  function disconnect (username) {
    delete _peers[username]
  }

  function send(username, message) {
    const conn = _peers[username]
    if(conn){
      conn.send(message);
    }else{
      console.log('peer is not connected for',username)
    }
  }

  function _registerPeer(username, conn) {
    console.log('Registering', username);
    _peers[username] = conn;
    conn.on('data', (msg) => {
      console.log('Messaga received', msg);
      opts.onMessage({ content: msg, author: username });
    })
  }

  return {
    connect,
    disconnect,
    send
  }
}
