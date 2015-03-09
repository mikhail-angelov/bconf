angular.module('bconfApp').constant('constant',{
  HOST : 'localhost',
  PORT : 3000,
  PEER_PATH : '/peer',
  KEY : 'bconf',
  URL_TO_SHARE : 'http://localhost:3000/redirect?user=',
  URL_TO_DISCOVER : 'http://localhost:3000/peer/bconf/peers',
  CHAT_POOLING_INTERVAL: 5000
});
