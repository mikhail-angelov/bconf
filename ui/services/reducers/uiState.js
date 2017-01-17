
const actions = require('../actions')

const token = localStorage.getItem('token');
var defaultState = {
        main: actions.uiState.main.LOGIN,
        sub: null
    }
if (token) {
    defaultState = {
        main: actions.uiState.main.MAIN,
        sub: actions.uiState.sub.CONTACTS
    }
}
function uiState(state = defaultState, action){
    switch(action.type){
        case actions.uiState.SET: {
            localStorage.setItem('uiState', action.state.sub)
            return action.state
        }
        case actions.auth.LOGOUT_COMPLETE:{
            localStorage.setItem('uiState', {
                main: actions.uiState.main.LOGIN,
                sub: null
            });
        }
        default:
            return state
    }
}

module.exports = uiState
// actions.uiState.CONTACTS