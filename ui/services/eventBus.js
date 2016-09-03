const _listeners = {};
function eventBus(){
    
    return {
        peer:{
            ERROR: 'peerError',
            DISCONNECT: 'peerDisconnect',
            MESSAGE: 'peerMessage',
            CALL_ORIGINATE: 'peerCallOriginate',
            CALL_TERMINATW: 'peerCallTerminate',
            MEDIA_STREAM: 'peerMediaStream'
  
        },

        on: on,
        off: off,
        emit: emit
    }
}

function on(event,cb){
    _listeners[event] = _listeners[event] || []
    _listeners[event].push(cb)
}
function off(event,cb){
    if(_listeners[event]){
        const index = _listeners[event].indexOf(cb)
        if(index >= 0){
           _listeners[event].delete(cb) 
        }
    }
}
function emit(event, data){
    if(_listeners[event]) _listeners[event].forEach(cb=>cb(data))
}
