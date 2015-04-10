var express = require('express')
  , config = require('./config')
  , routes = require('./backend/routes')
  , AuthHandler = require('./backend/handlers/AuthHandler')
  , UserHandler = require('./backend/handlers/UserHandler')
  , passport = require('passport')
  , refresh = require('passport-oauth2-refresh')
  , mongoose = require('mongoose')
  , strategy = require('./backend/auth/strategy')
  ,connectionManager = require('./backend/peerjs/connectionManager')
  ,logger = require('./backend/logger');
//  , ExpressPeerServer = require('./peerjs/index').ExpressPeerServer;

var app = express();

app.configure(function () {
  var loggerStream = {
    write: function(message, encoding){
      logger.info(message);
    }
  };

  app.set('client-url', 'http://localhost:3000');
  //app.set('client-google-signin', '/google?action=signin');
  app.disable('x-powered-by');

  app.use(express.logger({stream:loggerStream}));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(passport.initialize());
  app.use(app.router);
  app.use(express.static(__dirname + '/frontend'));
  app.use('/frontend/bower_components', express.static(__dirname + '/frontend/bower_components'));
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

var port = config.PORT;
var server = app.listen(port);
console.log('Listening on port ' + port);

//add peer2peer
var options = {
  debug: true,
  key:'bconf',
  allow_discovery:true
};

//app.use('/peer', ExpressPeerServer(server, options));
app.use(connectionManager.init(server));


