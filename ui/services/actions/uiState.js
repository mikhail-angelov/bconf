const props = {
    uiState: {
        SET: 'setUIState',
        SET_MENU: 'setMenuState',
        SET_CONTENT: 'setContentState',
        main:{
            LOGIN: 'login',
            MAIN: 'main'
        },
        left:{
            CONTACTS: 'contactsMenu',
            CHATS: 'chatsMenu',
            SETTINGS: 'settingsMenu'
        },
        right:{
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
    subState,
    contentState
}

function newState(state){
    return {
        type: props.uiState.SET,
        state: state
    }
}

function subState(state){
    return {
        type: props.uiState.SET_MENU,
        state: state
    }
}

function contentState(state){
    return {
        type: props.uiState.SET_CONTENT,
        state: state
    }
}

module.exports = props;