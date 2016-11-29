
const actions = require('../actions')

function uiState(state=actions.uiState.CONTACTS, action){
    switch(action.type){
        case actions.uiState.SET: {
            return action.state
        }
        default:
            return state
    }
}

module.exports = uiState