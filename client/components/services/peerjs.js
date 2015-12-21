export default function ($q, $rootScope, constant, Audio, Property) {
  var peer;
  var peerId;
  var call;

  var service = {
    init: function (myPeerId) {
      peerId = myPeerId;
      var key = 'bconf';
      peer = new Peer(myPeerId, {
        host: Property.getHost(),
        port: Property.getPort(),
        path: constant.PEER_PATH,
        key: key,
        debug: true
      });
      peer.on('connection', function (conn) {
        $rootScope.$broadcast('startChat', {conn: conn});
      });
      peer.on('error', function (err) {
        console.log('on peer error ' + err);
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
      peer.on('call', function (incomingCall) {
        call = incomingCall;
        $rootScope.$broadcast('incomingCall', call);
      });
    },
    originateCall: function (peerId) {
      var deferred = $q.defer();
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      navigator.getUserMedia({video: false, audio: true}, function (stream) {
        call = peer.call(peerId, stream);
        service.subscribeCall(call);
        deferred.resolve();
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
        service.subscribeCall(call);
        deferred.resolve();
      }, function (err) {
        console.log('Failed to get local stream', err);
        deferred.reject();
      });
      return deferred.promise;
    },
    hangUp: function () {
      console.log('hang up');
      if(call){
        call.close();
      }
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
    },
    subscribeCall: function (call) {
      call.on('error', function (err) {
        console.log('call error ' + err);
          $rootScope.$broadcast('errorCall', err);
      });
      call.on('close', function () {
        console.log('call is closed ');
          $rootScope.$broadcast('closedCall');
      });
      call.on('stream', function (remoteStream) {
        console.log('call stream ' + JSON.stringify(remoteStream));
        Audio.playStream(remoteStream);
        remoteStream.onended = function(){
          console.log('ma: stream ended');
        }
        remoteStream.onaddtrack= function(){
          console.log('ma: stream onaddtrack');
        }
        remoteStream.onremovetrack= function(){
          console.log('ma: stream onremovetrack');
        }
        // Show stream in some <video> element.
          $rootScope.$broadcast('connectedCall');
      });
    }
  };
  return service;


};
