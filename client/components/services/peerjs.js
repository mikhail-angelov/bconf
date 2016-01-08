import Peer from '../peerjs/peer.js'

class PeerJs {

    constructor($q, $rootScope, constant, Audio, Property, EventBus) {
        this.$q = $q;
        this.$rootScope = $rootScope;
        this.constant = constant;
        this.Audio = Audio;
        this.Property = Property;
        this.EventBus = EventBus;

        this.peer = null;
        this.peerId = null;
        this.call = null
    }

    init(myPeerId, key) {
        this.peerId = myPeerId;
        this.peer = new Peer(myPeerId, {
            host: this.Property.getHost(),
            port: this.Property.getPort(),
            path: this.constant.PEER_PATH,
            key: key,
            debug: true
        });
        this.peer.on('connection', function (conn) {
            this.EventBus.event(this.EventBus.peer.START_CHAT, {conn: conn});
        });
        this.peer.on('error', function (err) {
            console.log('on peer error ' + err);
        });
        this.peer.on('disconnected', function () {
            console.log('on peer disconnected');
        });
        this.peer.on('message', function (msg) {
            console.log('on peer message ' + msg);
        });
        this.peer.on('presence', function (presence) {
            this.EventBus.event(this.EventBus.peer.PRESENCE, presence);
        });
        this.peer.on('call', function (incomingCall) {
            this.call = incomingCall;
            this.EventBus.event(this.EventBus.peer.INCOMING_CALL, this.call);
        });
    }

    originateCall(peerId) {
        var deferred = $q.defer();
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        navigator.getUserMedia({video: false, audio: true}, function (stream) {
            this.call = this.peer.call(peerId, stream);
            this.subscribeCall(this.call);
            deferred.resolve();
        }, function (err) {
            console.log('Failed to get local stream', err);
            deferred.reject();
        });
        return deferred.promise;
    }

    answerCall(callData) {
        this.call = callData;
        var deferred = $q.defer();
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        navigator.getUserMedia({video: false, audio: true}, function (stream) {
            this.call.answer(stream); // Answer the call with an A/V stream.
            this.subscribeCall(this.call);
            deferred.resolve();
        }, function (err) {
            console.log('Failed to get local stream', err);
            deferred.reject();
        });
        return deferred.promise;
    }

    hangUp() {
        console.log('hang up');
        if (this.call) {
            this.call.close();
        }
        this.Audio.stop();
    }

    startChat(peerId) {
        return this.peer.connect(peerId);
    }

    subscribe(conn, onOpen, onMessage, onClose) {
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

    subscribeCall(call) {
        call.on('error', function (err) {
            console.log('call error ' + err);
            this.EventBus.event(this.Event.peer.ERROR_CALL, err);
        });
        call.on('close', function () {
            console.log('call is closed ');
            this.EventBus.event(this.Event.peer.CLOSE_CALL);
        });
        call.on('stream', function (remoteStream) {
            console.log('call stream ' + JSON.stringify(remoteStream));
            this.Audio.playStream(remoteStream);
            remoteStream.onended = function () {
                console.log('ma: stream ended');
            }
            remoteStream.onaddtrack = function () {
                console.log('ma: stream onaddtrack');
            }
            remoteStream.onremovetrack = function () {
                console.log('ma: stream onremovetrack');
            }
            // Show stream in some <video> element.
            this.EventBus.event(this.Event.peer.CONNECTED_CALL);
        });
    }
}


export default PeerJs;
