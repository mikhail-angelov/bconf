module.exports = function init(url, listner){
    const service = {
        close: close,
        sendMessage: sendMessage
    }

    const websocket = new WebSocket(`wss://${url}`);
    websocket.onmessage = function (event) {
      listner(event.data)
    }

    function sendMessage(message){
        websocket.send(message);
    }

    function close(){
       websocket.close(); 
    }

    return service;
}