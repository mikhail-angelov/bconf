const props = {
    LOAD_MESSAGES: 'loadMessages',
    ADD_MESSAGE: 'addMessage',
    REMOVE_MESSAGE: 'removeMessage',
    SEARCH_MESSAGE: 'searchMessage',
    SET_ACTIVE: 'setActiveChat',
    START_CHAT:'startChat'
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

function removeMessage(message){
    return {
        type: props.REMOVE_MESSAGE,
        message
    }
}

function searchMessage(messageText){
    return {
        type: props.SEARCH_MESSAGE,
        messageText: messageText
    }
}
function setActiveChat(active){
    return {
        type: props.SET_ACTIVE,
        active: active
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
    loadMessages,
    addMessage,
    removeMessage,
    searchMessage,
    setActiveChat,
    startChat
}