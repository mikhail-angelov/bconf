'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var _index = require('./config/environment/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./components/connectionManager/index.js');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('./components/eventBus/index.js');

var _index6 = _interopRequireDefault(_index5);

var _session = require('./components/store/session');

var _session2 = _interopRequireDefault(_session);

var _index7 = require('./components/peerjs/index.js');

var _index8 = _interopRequireDefault(_index7);

var _user = require('./api/user/user.model');

var _user2 = _interopRequireDefault(_user);

var _robotMaster = require('./components/robots/robotMaster.js');

var _robotMaster2 = _interopRequireDefault(_robotMaster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var webSocketPath = '/peerjs'; //to config

// Connect to MongoDB
_mongoose2.default.connect(_index2.default.mongo.uri, _index2.default.mongo.options);
_mongoose2.default.connection.on('error', function (err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (_index2.default.seedDB) {
  require('./config/seed');
}

var di = {};
di.eventBus = new _index6.default();

// Setup server
var app = (0, _express2.default)();
var server = _http2.default.createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
function startServer() {
  var serv = server.listen(_index2.default.port, _index2.default.ip, function () {
    console.log('Express server listening on %d, in %s mode', _index2.default.port, app.get('env'));
  });

  // Create WebSocket server
  di.wss = new _ws2.default.Server({ path: webSocketPath, server: serv });
  di.connectionManager = new _index4.default(di.wss, di.eventBus);
  di.peerjs = new _index8.default(di.eventBus, _session2.default, _user2.default);
  di.robotMaster = new _robotMaster2.default(di.eventBus);
}

setImmediate(startServer);

// Expose app
module.exports = {
  app: app,
  di: di
};
//# sourceMappingURL=app.js.map
