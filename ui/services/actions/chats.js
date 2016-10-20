
const props = {
    START: 'startChat',
    SELECT: 'selectChat',
    SEND_MESSAGE: 'sendChatMessage',
    RECEIVE_MESSAGE: 'receiveChatMessage'
}

function startChat(contact){
    return {
        type: props.START,
        contact
    }
}

function selectChat(chatId) {
    return {
        type: props.SELECT,
        chatId
    }
}

function sendChatMessage(message){
    return {
        type: props.SEND_MESSAGE,
        message
    }
}

function receiveChatMessage(contact, message){
    return {
        type: props.RECEIVE_MESSAGE,
        contact,
        message
    }
}

module.exports = {
    chats: props,
    startChat,
    selectChat,
    sendChatMessage,
    receiveChatMessage
}