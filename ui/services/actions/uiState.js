const props = {
    uiState: {
        SET: 'setUIState',
        SET_SUB: 'setSubState',
        main:{
            LOGIN: 'login',
            MAIN: 'main'
        },
        sub:{
            CONTACTS: 'contacts',
            CHATS: 'chats',
            SETTINGS: 'settings'
        },
        AUTH:{
            signIn:'signIn',
            signUp:'signUp',
            forget:'forget'
        }
    },
    newState,
    subState
}

function newState(state){
    return {
        type: props.uiState.SET,
        state: state
    }
}

function subState(state){
    return {
        type: props.uiState.SET_SUB,
        state: state
    }
}

module.exports = props;