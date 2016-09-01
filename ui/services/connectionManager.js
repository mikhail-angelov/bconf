//docs: http://peerjs.com/docs/
const _connections = {};
const _mediaConnections = {};
function connectionManager(id, Peer, EventBus, Roster){
    var peer;
    init(location.host.split(':')[0],location.port,'test')

    return {
        init: init,
        sendMessage: sendMessage,
        makeCall: makeCall,
        answerCall: answerCall
    }
    function init(host, port, token){
        peer = new Peer(id, {
            debug: 3, // 1: Errors, 2: Warnings, 3: All logs
            host: host,
            port: port || '80',
            key: 'peerjs', //'peerjs',
            path: '/',
            token: token
        });

        peer.on('error',  (err)=> {
            console.log('on peer error ' + err);
            EventBus.emit(EventBus.peer.ERROR, err);
        });
        peer.on('disconnected', function () {
            console.log('on peer disconnected');
            EventBus.emit(EventBus.peer.DISCONNECT);
        });


        peer.on('open', id => { 
            console.log('connection isopen with ' + id);
        });
        peer.on('connection', (dataConnection) =>{
            addConnection(dataConnection);
        });
        peer.on('call',  mediaConnection => {
            addMediaConnection(mediaConnection)
        });

    }

    function sendMessage(userId, text){
        const peerId = userToPeerId(userId);
        var dataConnection = _connections[peerId];
        if(!dataConnection){
            dataConnection = peer.connect(peerId, {label:userId});
            addConnection(dataConnection);
        }
        dataConnection.send(test);
    }

    function makeCall(userId, stream){
        const peerId = userToPeerId(userId);
        mediaConnection = peer.call(peerId, stream, 'metadata');
        addMediaConnection(mediaConnection);
    }

    function userToPeerId(userId){
        return userId;
    }
    function peerIdToUser(peerId){
        return peerId;
    }

    function addConnection(dataConnection){
        _connections[dataConnection.peer] = dataConnection;
        const userId = peerIdToUser(dataConnection.peer);
        dataConnection.on('open',()=>{
            console.log('on peer data connection open ' + dataConnection.peer);
        })
        dataConnection.on('data',data=>{
            const mgs = {
                userId: userId,
                data: data
            }
            EventBus.emit(EventBus.peer.MESSAGE, msg);
        })
        dataConnection.on('close',()=>{
            _connections[dataConnection.peer] = null;
        })
        dataConnection.on('error',err => {
            console.log('on peer data connection error ' + err);
            _connections[dataConnection.peer] = null;
            EventBus.emit(EventBus.peer.ERROR, {userId: userId, err:err});
        })
    }

    function addMediaConnection(mediaConnection) {
        _mediaConnections[mediaConnection.peer] = mediaConnection;
        const userId = peerIdToUser(mediaConnection.peer);

        mediaConnection.on('stream',stream=>{
            const mgs = {
                userId: userId,
                stream: stream
            }
            EventBus.emit(EventBus.peer.MEDIA_STREAM, msg);
        })
        mediaConnection.on('close',()=>{
            _mediaConnections[mediaConnection.peer] = null;
        })
        mediaConnection.on('error',err => {
            console.log('on peer data connection error ' + err);
            _mediaConnections[mediaConnection.peer] = null;
            EventBus.emit(EventBus.peer.ERROR, {userId: userId, err:err});
        })
    }

}
