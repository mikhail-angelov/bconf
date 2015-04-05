angular.module('bconfApp').constant('constant', {
    PEER_PATH: '/peer',
    KEY: 'bconf',
    URL_TO_SHARE: _.template('http://${host}:${port}/#/bconf?refer=${refer}&sharedToken=${sharedToken}'),
    CHAT_POOLING_INTERVAL: 5000,
    mode: {ANONYMOUS: 'anonymous', GUEST: 'guest', USER: 'user', ADMIN: 'admin'},
    CALL_STATE: {
        DIALLING: 'dialling',
        CONNECTED: 'connected',
        INCOMING: 'incoming',
        NONE: 'none'
    }
});
