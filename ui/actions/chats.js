const props = {
    INIT: 'initChats',
    LOAD_MESSAGES: 'loadMessages',
    ADD_MESSAGE: 'addMessage',
    CHAT_MESSAGE: 'chatMessage',
    SEND_MESSAGE: 'sendMessage',
    REMOVE_MESSAGE: 'removeMessage',
    SEARCH_MESSAGE: 'searchMessage',
    SET_ACTIVE: 'setActiveChat',
    START_CHAT:'startChat'
}

function initChats(user){
    return {
        type: props.INIT,
        user
    }
}

function loadMessages(messages){
    return {
        type: props.LOAD_MESSAGES,
        messages
    }
}

function addMessage(message) {
    return {
        type: props.ADD_MESSAGE,
        message
    }
}

function chatMessage(payload, contact) {
    return {
        type: props.CHAT_MESSAGE,
        payload,
        contact
    }
}

function sendMessage(message) {
    return function (dispatch, getState) {
        const activeChat = getState().chats.selected
        if(activeChat){
            dispatch({
                type: props.SEND_MESSAGE,
                message,
                activeChat
            })
            //todo: send to peer
        }else{
            //todo: pispatch error alert
        }
    }
}

function removeMessage(message){
    return {
        type: props.REMOVE_MESSAGE,
        message
    }
}

function searchMessage(messageText){
    return {
        type: props.SEARCH_MESSAGE,
        messageText
    }
}
function setActiveChat(activeChat){
    return {
        type: props.SET_ACTIVE,
        activeChat: activeChat
    }
}
function startChat(contact){
    return {
        type: props.START_CHAT,
        contact
    }
}

module.exports = {
    chats: props,
    initChats,
    loadMessages,
    addMessage,
    chatMessage,
    sendMessage,
    removeMessage,
    searchMessage,
    setActiveChat,
    startChat
}