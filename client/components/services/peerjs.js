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
        this.call = null;

        EventBus.on(EventBus.auth.IN, ()=>this.init());
    }

    init() {
        let token = localStorage.getItem('token');
        let key = 'peerjs';
        let id = '123';
        this.peerId = token;
        this.peer = new Peer(id, {
            debug: 3, // 1: Errors, 2: Warnings, 3: All logs
            host: location.host,
            port: location.port || '80',
            key: key, //'peerjs',
            path: '/',
            token: token
        });

        this.peer.on('connection', (conn) =>{
            this.EventBus.emit(this.EventBus.peer.START_CHAT, {conn: conn});
        });
        this.peer.on('error',  (err)=> {
            console.log('on peer error ' + err);
        });
        this.peer.on('disconnected', function () {
            console.log('on peer disconnected');
        });
        this.peer.on('message',  (msg) =>{
            console.log('on peer message ' + msg);
        });
        this.peer.on('presence',  (presence) =>{
            this.EventBus.emit(this.EventBus.peer.PRESENCE, presence);
        });
        this.peer.on('call',  (incomingCall)=> {
            this.call = incomingCall;
            this.EventBus.emit(this.EventBus.peer.INCOMING_CALL, this.call);
        });
        this.peer.on('bot-message',  (message) =>{
            message.type = 'in';
            this.EventBus.emit(this.EventBus.messages.ADD, message);
        });
    }

    sendHostMessage(message) {
        if (this.peer) {
            this.peer.socket.send(message);
        }
    }

    originateCall(peerId) {
        var deferred = $q.defer();
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        navigator.getUserMedia({video: false, audio: true},  (stream) =>{
            this.call = this.peer.call(peerId, stream);
            this.subscribeCall(this.call);
            deferred.resolve();
        },  (err) =>{
            console.log('Failed to get local stream', err);
            deferred.reject();
        });
        return deferred.promise;
    }

    answerCall(callData) {
        this.call = callData;
        var deferred = $q.defer();
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        navigator.getUserMedia({video: false, audio: true},  (stream)=> {
            this.call.answer(stream); // Answer the call with an A/V stream.
            this.subscribeCall(this.call);
            deferred.resolve();
        },  (err) =>{
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
        conn.on('open', onOpen);
        conn.on('data', onMessage);
        conn.on('close', onClose);
    }

    subscribeCall(call) {
        call.on('error',  (err) =>{
            console.log('call error ' + err);
            this.EventBus.emit(this.Event.peer.ERROR_CALL, err);
        });
        call.on('close',  ()=> {
            console.log('call is closed ');
            this.EventBus.emit(this.Event.peer.CLOSE_CALL);
        });
        call.on('stream',  (remoteStream) =>{
            console.log('call stream ' + JSON.stringify(remoteStream));
            this.Audio.playStream(remoteStream);
            remoteStream.onended =  () =>{
                console.log('ma: stream ended');
            }
            remoteStream.onaddtrack =  ()=> {
                console.log('ma: stream onaddtrack');
            }
            remoteStream.onremovetrack =  ()=> {
                console.log('ma: stream onremovetrack');
            }
            // Show stream in some <video> element.
            this.EventBus.emit(this.Event.peer.CONNECTED_CALL);
        });
    }
}


export default PeerJs;
