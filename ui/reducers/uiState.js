const route = require('riot-route')
const actions = require('../actions')
const storage = require('../services/storage')

let defaultState
if (storage.getToken()) {
    defaultState = toMain()
}else{
    defaultState = toLogin()
}

module.exports = uiState

function uiState(state = defaultState, action){
    switch(action.type){
        case actions.uiState.SET: {
            return action.state
        }
        case actions.uiState.SET_MENU: {
            return {
                ...state,
                sub:action.state,
                content:null
            }
        }
        case actions.uiState.SET_CONTENT: {
            return {
                ...state,
                content:action.state
            }
        }
        case actions.auth.LOGOUT_COMPLETE:
        case actions.uiState.TO_LOGIN: {
            return toLogin()
        }
        case actions.auth.LOGIN_COMPLETE:
        case actions.uiState.TO_MAIN: {
            return toMain()
        }
        default:
            return state
    }
}

function toLogin(){
    delay(()=>route('auth'))
    return{
        main: actions.uiState.main.LOGIN,
        sub: actions.uiState.AUTH.signIn
    }
}
function toMain(){
    delay(()=>route('main'))
    return{
        main: actions.uiState.main.MAIN,
        sub: actions.uiState.left.CHATS,
        content:null
    }
}
function delay(cb){
    setTimeout(cb)
}


