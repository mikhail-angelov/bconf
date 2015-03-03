angular.module('bconfApp').factory('Peer', function ($q,$rootScope) {
  var peer;
  return {
    init: function (myPeerId) {
      peer = new Peer(myPeerId, {key: 'bconf.com'});
      peer.on('connection', function(conn) {
        //conn.on('data', function(data){
        //  // Will print 'hi!'
        //  console.log(data);
        //});
        $rootScope.$broadcast('startChat', {conn: conn});
      });
    },
    originateCall: function (peerId) {

    },
    answerCall: function () {

    },
    startChat:function(peerId, onOpen, onMessage, onClose){
      var conn = peer.connect(peerId);
      conn.on('open', function(){
        onOpen();
      });
      conn.on('data', function(data){
        onMessage(data);
      });
      conn.on('close', function(data){
        onClose();
      });
      return conn;
    }
  };
});
