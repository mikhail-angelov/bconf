angular.module('bconfApp').factory('Peer', function ($q,$rootScope, constant,$interval,Audio) {
  var peer;
  var peerId;
  var list = [];

  var service = {
    init: function (myPeerId) {
      peerId = myPeerId;
      var key = 'bconf';
      peer = new Peer(myPeerId, {host: constant.HOST, port: constant.PORT, path:constant.PEER_PATH, key: key, debug: true});
      peer.on('connection', function(conn) {
        $rootScope.$broadcast('startChat', {conn: conn});
      });
      peer.on('error', function() {
        console.log('on peer error');
      });
      peer.on('disconnected', function() {
        console.log('on peer disconnected');
      });
      peer.on('message', function(msg) {
        console.log('on peer message ' + msg);
      });
    },
    getLinkToShare: function(){
      return constant.URL_TO_SHARE + peerId;
    },
    originateCall: function (peerId) {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      navigator.getUserMedia({video: false, audio: true}, function(stream) {
        var call = peer.call(peerId, stream);
        call.on('stream', function(remoteStream) {
          // Show stream in some <video> element.
        });
      }, function(err) {
        console.log('Failed to get local stream' ,err);
      });
    },
    answerCall: function () {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      peer.on('call', function(call) {
        navigator.getUserMedia({video: false, audio: true}, function(stream) {
          call.answer(stream); // Answer the call with an A/V stream.
          call.on('stream', function(remoteStream) {
            // Show stream in some <video> element.
          });
        }, function(err) {
          console.log('Failed to get local stream' ,err);
        });
      });
    },
    startChat:function(peerId) {
      return peer.connect(peerId);
    },
    subscribe: function(conn, onOpen, onMessage, onClose){
      conn.on('open', function(){
        onOpen();
      });
      conn.on('data', function(data){
        onMessage(data);
      });
      conn.on('close', function(data){
        onClose();
      });
    },
    getList: function () {
      var deferred = $q.defer();
      peer.listAllPeers(function(response){
        list = response;
        deferred.resolve(list);
      });
      return deferred.promise;
    },
    poolList: function(cb){
      $interval(function(){
        service.getList().then(function(data){
          cb(data);
        })
      }, constant.CHAT_POOLING_INTERVAL);
    }
  };
  return service;


});
