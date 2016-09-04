const actions = require('../actions/index.js');


function contacts(state=[],action){

    switch(action.type){
        case actions.contact.ADD:{
            state.push(action.contact);
            return state;
        }
        case actions.contact.REMOVE:{
            state.push(action.contact);
            return state;
        }
        default:
            return state;
    }
}

module.exports = contacts
