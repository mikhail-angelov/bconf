angular.module('bconfApp').factory('Peer', function ($q, $rootScope, constant, $rootScope, Audio) {
  var peer;
  var peerId;
  var call;

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
      peer.on('presence', function (presence) {
        $rootScope.$broadcast('presence', presence);
      });
      peer.on('call', function (call) {
        $rootScope.$broadcast('incomingCall', call);
      });
    },
    originateCall: function (peerId) {
      var deferred = $q.defer();
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      navigator.getUserMedia({video: false, audio: true}, function (stream) {
        call = peer.call(peerId, stream);
        call.on('stream', function (remoteStream) {
          deferred.resolve();
          Audio.play(remoteStream);
          // Show stream in some <video> element.
        });
      }, function (err) {
        console.log('Failed to get local stream', err);
        deferred.reject();
      });
      return deferred.promise;
    },
    answerCall: function (callData) {
      call = callData;
      var deferred = $q.defer();
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      navigator.getUserMedia({video: false, audio: true}, function (stream) {
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', function (remoteStream) {
          deferred.resolve();
          Audio.play(remoteStream);
          // Show stream in some <video> element.
        });
      }, function (err) {
        console.log('Failed to get local stream', err);
        deferred.reject();
      });
      return deferred.promise;
    },
    hangUp: function () {
      console.log('hang up');
      call.close();
      Audio.stop();
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
