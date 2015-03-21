angular.module('bconfApp').factory('Peer', function ($q, $rootScope, constant, $rootScope, Audio) {
  var peer;
  var peerId;
  var list = [];

  var service = {
    init: function (myPeerId) {
      peerId = myPeerId;
      var key = 'bconf';
      peer = new Peer(myPeerId, {
        host: constant.HOST,
        port: constant.PORT,
        path: constant.PEER_PATH,
        key: key,
        debug: true
      });
      peer.on('connection', function (conn) {
        $rootScope.$broadcast('startChat', {conn: conn});
      });
      peer.on('error', function () {
        console.log('on peer error');
      });
      peer.on('disconnected', function () {
        console.log('on peer disconnected');
      });
      peer.on('message', function (msg) {
        console.log('on peer message ' + msg);
      });
      peer.on('presence', function(presence){
        $rootScope.$broadcast('presence', presence);
      })
    },
    originateCall: function (peerId) {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      navigator.getUserMedia({video: false, audio: true}, function (stream) {
        var call = peer.call(peerId, stream);
        call.on('stream', function (remoteStream) {
          // Show stream in some <video> element.
        });
      }, function (err) {
        console.log('Failed to get local stream', err);
      });
    },
    answerCall: function () {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      peer.on('call', function (call) {
        navigator.getUserMedia({video: false, audio: true}, function (stream) {
          call.answer(stream); // Answer the call with an A/V stream.
          call.on('stream', function (remoteStream) {
            // Show stream in some <video> element.
          });
        }, function (err) {
          console.log('Failed to get local stream', err);
        });
      });
    },
    startChat: function (peerId) {
      return peer.connect(peerId);
    },
    subscribe: function (conn, onOpen, onMessage, onClose) {
      conn.on('open', function () {
        onOpen();
      });
      conn.on('data', function (data) {
        onMessage(data);
      });
      conn.on('close', function (data) {
        onClose();
      });
    }
  };
  return service;


});
