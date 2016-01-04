
var url = require('url');
//import app from '../..';


class ConnectionManager {

  constructor(wss, bus) {
    wss.on('connection', client=>this.onConnect(client));
    this.eventBus = bus;
    this.sockets = {};

    this.eventBus.on(this.eventBus.ACCEPT_CLIENT, client => this.onAcceptClient(client))
    this.eventBus.on(this.eventBus.DISCONNECT_CLIENT, client=>this.onDisconnectClient(client))
    this.eventBus.on(this.eventBus.SEND_MESSAGE, (client, message)=>this.onSendMessage(client, message))
  }

  _getSocket(id){
    return this.sockets[id];
  }

  onSendMessage(client, message) {
    if (client && this._getSocket(client.id)) {
      try {
        this._getSocket(client.id).send(JSON.stringify(message));
      } catch (e) {
        console.log('error due sending message, maybe socket is closed');
      }
    }
  }
  _getConnectionParams(socket) {
    let param = {};
    if (socket && socket.upgradeReq && socket.upgradeReq.url) {
      var query = url.parse(socket.upgradeReq.url, true).query;
      if (query) {
        param = {
          id: query.id,
          token: query.token,
          key: query.key,
          ip: socket.upgradeReq.socket ? socket.upgradeReq.socket.remoteAddress : null
        }
      }
    }
    return param
  }
  onConnect(socket) {
    var connectionParam = this._getConnectionParams(socket);


    if (!connectionParam.id || !connectionParam.token || !connectionParam.key) {
      socket.send(JSON.stringify({type: 'ERROR', payload: {msg: 'No id, token, or key supplied to websocket server'}}));
      socket.close();
      return;
    }
    let client = connectionParam;
    this.sockets[client.id] = socket;
    this.eventBus.emit(this.eventBus.NEW_CONNECTION, client)
  }

  onAcceptClient (client) {

    console.log('accept connection')
    let socket = this._getSocket(client.id);
    socket.send(JSON.stringify({type: 'OPEN'}));
    socket.on('close', () => this.eventBus.emit(this.eventBus.SOCKET_CLOSED, client));
    socket.on('error', (err) => this.eventBus.emit(this.eventBus.SOCKET_ERROR, client, err));
    socket.on('message', (data) => this.eventBus.emit(this.eventBus.SOCKET_MESSAGE, client, data));
  };

  onDisconnectClient (client) {
    this._getSocket(client.id).close();
    this.sockets[client.id] = null;
  };


}


export default ConnectionManager;
