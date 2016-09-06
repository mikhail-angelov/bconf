const props = {
    LOAD_MESSAGES: 'loadMessages',
    ADD_MESSAGE: 'addMessage',
    REMOVE_MESSAGE: 'removeMessage'
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

module.exports = {
    message: props,
    loadMessages,
    addMessage,
    removeMessage
}