'strict mode'

// origin server code is here https://github.com/peers/peerjs-server.git

class PeerJs {
  constructor (bus, session, User) {
    this.session = session
    this.eventBus = bus
    this.user = User

    this.eventBus.on(this.eventBus.SOCKET_CLOSED, client => this.onClose(client))
    this.eventBus.on(this.eventBus.SOCKET_ERROR, (client, err) => this.onError(client, err))
    this.eventBus.on(this.eventBus.SOCKET_MESSAGE, (client, data) => this.onMessage(client, data))
    this.eventBus.on(this.eventBus.NEW_CONNECTION, client => this.onNewConnection(client))
  }

  onNewConnection (client) {
    if (this.session.getById(client.id)) {
      // ID-taken, invalid token
      console.log('ID-taken', client.id)
      this.eventBus.emit(this.eventBus.SEND_MESSAGE, client, {type: 'ID-TAKEN', payload: {msg: 'ID is taken'}})
      this.eventBus.emit(this.eventBus.DISCONNECT_CLIENT, client)
    } else {
      // check auth
      if (this.user.validateUser(client.id, client.token)) {
        this.session.add(client)
        this.eventBus.emit(this.eventBus.ACCEPT_CLIENT, client)
      } else {
        console.log('user credentials are invalid', client.id, client.token)
        this.eventBus.emit(this.eventBus.SEND_MESSAGE, client, {
          type: 'INCORRECT-TOKEN',
          payload: {msg: 'incorrect token'}
        })
        this.eventBus.emit(this.eventBus.DISCONNECT_CLIENT, client)
      }
    }
  }

  onClose (client) {
    console.log('client Socket closed:', client.id)
    this.session.delete(client)
  }

  onError (client, err) {
    console.log('client Socket error:', client.id, err)
    this.eventBus.emit(this.eventBus.SEND_MESSAGE, client, {type: 'ERROR', payload: {msg: err}})
  }

  onMessage (client, data) {
    try {
      console.log(data)
      var message = JSON.parse(data)

      if (message && message.type && ['LEAVE', 'CANDIDATE', 'OFFER', 'ANSWER'].indexOf(message.type) !== -1) {
        var type = message.type
        var src = message.src
        var dst = message.dst

        if (this.user.isConnectionAllowed(src, dst)) {
          var destinationClient = this.session.getById(dest)
          // User is connected!
          if (destinationClient) {
            try {
              console.log('send message to ' + dst)
              this.eventBus.emit(this.eventBus.SEND_MESSAGE, destinationClient, data)
            } catch (e) {
              // This happens when a peer disconnects without closing connections and
              // the associated WebSocket has not closed.
              // Tell other side to stop trying.
              console.log('peer is disconnected do something', e)
              // this._removePeer(key, dst);
              // this._handleTransmission(key, {
              //  type: 'LEAVE',
              //  src: dst,
              //  dst: src
              // });
            }
          } else {
            // Wait for this client to connect/reconnect (XHR) for important
            // messages.
            if (type !== 'LEAVE' && type !== 'EXPIRE' && dst) {
              console.log('peer is absent do something')
              // var self = this;
              // if (!this._outstanding[key][dst]) {
              //  this._outstanding[key][dst] = [];
              // }
              // this._outstanding[key][dst].push(message);
            } else if (type === 'LEAVE' && !dst) {
              // this._removePeer(key, src);
              console.log('clean up list')
              // _clients[src]=null;
            } else {
              // Unavailable destination specified with message LEAVE or EXPIRE
              // Ignore
            }
          }
        }
      } else {
        console.log('unrecognized (no peerjs message)', data)
      }
    } catch (e) {
      console.log('Invalid message', data, e)
      // throw e;
    }
  }
}

export default PeerJs
