/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import WebSocket from 'ws';

import config from './config/environment/index.js';
import connectionManager from './components/connectionManager/index.js';
import eventBusFactory from './components/eventBus/index.js'
import session  from './components/store/session';
import peerjsFactory from './components/peerjs/index.js'
import User from './api/user/user.model';

const webSocketPath = '/peer/peerjs'; //to config

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }


var eventBus = new eventBusFactory();

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
function startServer() {
  let serv = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });

  // Create WebSocket server
  let wss = new WebSocket.Server({path: webSocketPath, server: serv});
  let cm = new connectionManager(wss, eventBus);
  let peerjs = new peerjsFactory(eventBus, session, User);
}

setImmediate(startServer);

// Expose app
module.exports = app;
