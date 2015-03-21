angular.module('bconfApp').constant('constant', {
  HOST: 'localhost',
  PORT: 3000,
  PEER_PATH: '/peer',
  KEY: 'bconf',
  URL_TO_SHARE: _.template('http://localhost:3000/#/bconf?refer=${refer}&sharedToken=${sharedToken}'),
  URL_TO_DISCOVER: 'http://localhost:3000/peer/bconf/peers',
  CHAT_POOLING_INTERVAL: 5000,
  mode: {ANONYMOUS: 'anonymous', GUEST: 'guest', USER: 'user', ADMIN: 'admin'}
});
