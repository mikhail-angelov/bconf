const props = {
    uiState: {
        SET: 'setUISatate',

        CONTACTS: 'contacts',
        CHATS: 'chats',
        SETTINGS: 'settings'
    },
    newState
}

function newState(state){
    return {
        type: props.uiState.SET,
        state: state
    }
}

module.exports = props;