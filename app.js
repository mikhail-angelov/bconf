var express = require('express')
  , config = require('./config')
  , routes = require('./routes')
  , AuthHandler = require('./handlers/AuthHandler')
  , UserHandler = require('./handlers/UserHandler')
  , passport = require('passport')
  , refresh = require('passport-oauth2-refresh')
  , mongoose = require('mongoose')
  , strategy = require('./auth/strategy')
  ,connectionManager = require('./peerjs/connectionManager');
//  , ExpressPeerServer = require('./peerjs/index').ExpressPeerServer;

var app = express();

app.configure(function () {

  app.set('client-url', 'http://localhost:8000');
  app.set('client-google-signin', '/google?action=signin');
  app.disable('x-powered-by');

  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(passport.initialize());
  app.use(app.router);
  app.use(express.static(__dirname + '/app'));
  app.use('/bower_components', express.static(__dirname + '/bower_components'));
});

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

app.configure('development', function () {
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
  console.log("Starting in development mode");
});


mongoose.connect(config.MONGO_DB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log("Connected to db");
});

passport.use(strategy.yandex);
passport.use(strategy.facebook);
passport.use(strategy.googlePlus);
refresh.use(strategy.googlePlus);

var handlers = {
  auth: new AuthHandler(),
  user: new UserHandler()
};

routes.setup(app, handlers);

var server = app.listen(3000);
console.log('Listening on port 3000');

//add peer2peer
var options = {
  debug: true,
  key:'bconf',
  allow_discovery:true
};

//app.use('/peer', ExpressPeerServer(server, options));
app.use(connectionManager.init(server));


