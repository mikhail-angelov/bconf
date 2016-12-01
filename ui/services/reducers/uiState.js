
const actions = require('../actions')

function uiState(state = {
    main: actions.uiState.main.LOGIN,
    sub: null
}, action){
    switch(action.type){
        case actions.uiState.SET: {
            return action.state
        }
        default:
            return state
    }
}

module.exports = uiState
// actions.uiState.CONTACTS