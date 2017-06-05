
const props = {
    OPEN: 'openWS',
    CLOSE: 'closeWS',
    SEND_MESSAGE: 'sendWSMessage',
    RECEIVE_MESSAGE: 'receiveWSMessage'
}

function openWS(url){
    return {
        type: props.OPEN,
        url
    }
}

function closeWS() {
    return {
        type: props.CLOSE
    }
}

function sendWSMessage(text){
    return {
        type: props.SEND_MESSAGE,
        text
    }
}

function receiveWSMessage(message){
    return {
        type: props.RECEIVE_MESSAGE,
        message
    }
}

module.exports = {
    ws: props,
    openWS,
    closeWS,
    sendWSMessage,
    receiveWSMessage
}