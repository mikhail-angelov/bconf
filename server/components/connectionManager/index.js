'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var url = require('url');

var ConnectionManager = function () {
  function ConnectionManager(wss, bus) {
    var _this = this;

    _classCallCheck(this, ConnectionManager);

    wss.on('connection', function (client) {
      return _this.onConnect(client);
    });
    this.eventBus = bus;
    this.sockets = {};

    this.eventBus.on(this.eventBus.ACCEPT_CLIENT, function (client) {
      return _this.onAcceptClient(client);
    });
    this.eventBus.on(this.eventBus.DISCONNECT_CLIENT, function (client) {
      return _this.onDisconnectClient(client);
    });
    this.eventBus.on(this.eventBus.SEND_MESSAGE, function (client, message) {
      return _this.onSendMessage(client, message);
    });
  }

  _createClass(ConnectionManager, [{
    key: '_getSocket',
    value: function _getSocket(id) {
      return this.sockets[id];
    }
  }, {
    key: 'onSendMessage',
    value: function onSendMessage(client, message) {
      if (client && this._getSocket(client.id)) {
        try {
          this._getSocket(client.id).send(JSON.stringify(message));
        } catch (e) {
          console.log('error due sending message, maybe socket is closed');
        }
      }
    }
  }, {
    key: '_getConnectionParams',
    value: function _getConnectionParams(socket) {
      var param = {};
      if (socket && socket.upgradeReq && socket.upgradeReq.url) {
        var query = url.parse(socket.upgradeReq.url, true).query;
        if (query) {
          param = {
            id: query.id,
            token: query.token,
            key: query.key,
            ip: socket.upgradeReq.socket ? socket.upgradeReq.socket.remoteAddress : null
          };
        }
      }
      return param;
    }
  }, {
    key: 'onConnect',
    value: function onConnect(socket) {
      var connectionParam = this._getConnectionParams(socket);
      console.log('onConnect ', connectionParam);

      if (!connectionParam.id || !connectionParam.token || !connectionParam.key) {
        socket.send(JSON.stringify({ type: 'ERROR', payload: { msg: 'No id, token, or key supplied to websocket server' } }));
        socket.close();
        return;
      }
      var client = connectionParam;
      this.sockets[client.id] = socket;
      this.eventBus.emit(this.eventBus.NEW_CONNECTION, client);
    }
  }, {
    key: 'onAcceptClient',
    value: function onAcceptClient(client) {
      var _this2 = this;

      console.log('accept connection');
      var socket = this._getSocket(client.id);
      socket.send(JSON.stringify({ type: 'OPEN' }));
      socket.on('close', function () {
        return _this2.eventBus.emit(_this2.eventBus.SOCKET_CLOSED, client);
      });
      socket.on('error', function (err) {
        return _this2.eventBus.emit(_this2.eventBus.SOCKET_ERROR, client, err);
      });
      socket.on('message', function (data) {
        return _this2.eventBus.emit(_this2.eventBus.SOCKET_MESSAGE, client, data);
      });
    }
  }, {
    key: 'onDisconnectClient',
    value: function onDisconnectClient(client) {
      this._getSocket(client.id).close();
      this.sockets[client.id] = null;
    }
  }]);

  return ConnectionManager;
}();

exports.default = ConnectionManager;
//# sourceMappingURL=index.js.map
