
const actions = require('../actions')
const storage = require('../storage')

if (storage.getToken()) {
    defaultState = toMain()
}else{
    defaultState = toLogin()
}

function uiState(state = defaultState, action){
    switch(action.type){
        case actions.uiState.SET: {
            return action.state
        }
        case actions.uiState.SET_SUB: {
            return Object.assign(state,{sub:action.state})
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
    delay(()=>riot.route('auth'))
    return{
        main: actions.uiState.main.LOGIN,
        sub: actions.uiState.AUTH.signIn
    }
}
function toMain(){
    delay(()=>riot.route('main'))
    return{
        main: actions.uiState.main.MAIN,
        sub: actions.uiState.sub.CONTACTS
    }
}
function delay(cb){
    setTimeout(cb)
}

module.exports = uiState
