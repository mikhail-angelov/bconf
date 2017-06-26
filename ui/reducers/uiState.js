const route = require('riot-route')
const actions = require('../actions')
const storage = require('../services/storage')

let defaultState
if (storage.getToken()) {
  defaultState = toMain()
} else {
  defaultState = toLogin()
}

module.exports = uiState

function uiState (state = defaultState, action) {
  switch (action.type) {
    case actions.ui.SET: {
      return action.state
    }
    case actions.ui.SET_MENU: {
      return {
        ...state,
        sub: action.state,
        content: null
      }
    }
    case actions.ui.SET_CONTENT: {
      return {
        ...state,
        content: action.state
      }
    }
    case actions.auth.LOGOUT_COMPLETE: {
      return toLogin()
    }
    case actions.auth.LOGIN_COMPLETE: {
      return toMain()
    }
    default:
      return state
  }
}

function toLogin () {
  delay(() => route('auth'))
  return {
    main: actions.ui.STATE.LOGIN,
    sub: actions.ui.AUTH.SIGN_IN
  }
}
function toMain () {
  delay(() => route('main'))
  return {
    main: actions.ui.STATE.MAIN,
    sub: actions.ui.MAIN_SUB.CHATS,
    content: null
  }
}
function delay (cb) {
  setTimeout(cb)
}
