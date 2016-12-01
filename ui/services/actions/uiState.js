const props = {
    uiState: {
        SET: 'setUIState',
        main:{
            LOGIN: 'login',
            MAIN: 'main'
        },
        sub:{
        CONTACTS: 'contacts',
        CHATS: 'chats',
        SETTINGS: 'settings'
        }
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