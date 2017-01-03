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
    return new Promise((resolve, reject)=>{
      const conn = peer.connect(username,{
        serialization: 'json'
      });
      if(conn){
        conn.on('open', () => {
          _registerPeer(username, conn);
          resolve(conn)
        })
        conn.on('error', (err) => {
          reject(err)
        })
        conn.on('end', (err) => {
          reject(err)
        })
      }else{
        reject('disconnected :(')
      }
    })
  }

  function disconnect (username) {
    delete _peers[username]
  }

  function send(data) {
    const conn = _peers[data.username]
    if(conn){
      conn.send(data.message);
    }else{
      console.log('peer is not connected for',data.username)
      connect(data.username)
      .then((conn)=>{
        conn.send(data.message);
      })
      .catch(err=>{
        console.log('cannot connect to ', data.username, err)
      })
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
