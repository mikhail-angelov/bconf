const props = {
  ui: {
    SET: 'seMainState',
    SET_MENU: 'setSubState',
    SET_CONTENT: 'setContentState',
    STATE: {
      LOGIN: 'login',
      MAIN: 'main'
    },
    MAIN_SUB: {
      CONTACTS: 'contactsMenu',
      CHATS: 'chatsMenu',
      SETTINGS: 'settingsMenu'
    },
    MAIN_CONTENT: {
      CONTACTS: 'contacts',
      CONTACT_SEARCH: 'contactSearch',
      ADD_CHANNEL: 'addChannel',
      EDIT_CHANNEL: 'editChannel',
      VIEW_CHANNEL: 'viewChannel',
      CHATS: 'chats',
      SETTINGS: 'settings'
    },
    AUTH: {
      SIGN_IN: 'signIn',
      SIGN_UP: 'signUp',
      FORGET: 'forget'
    }
  },
  setSubState,
  setContentState
}

function setSubState (state) {
  return {
    type: props.ui.SET_MENU,
    state: state
  }
}

function setContentState (state) {
  return {
    type: props.ui.SET_CONTENT,
    state: state
  }
}

module.exports = props
