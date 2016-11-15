
const actions = require('../actions')

function uiState(state=actions.uiState.CONTACT, action){
    switch(action.type){
        case actions.uiState.SET: {
            return action.state
        }
        default:
            return state
    }
}

module.exports = uiState