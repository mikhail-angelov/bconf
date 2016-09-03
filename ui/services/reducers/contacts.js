const actions = require('../actions/index.js');

function getContacts(){
    const contacts = [];
    for(let i=0; i < 10; i++){
        contacts.push('John Doe ' + i);
    }
    console.log(contacts)
    return contacts;
}

function contacts(state = getContacts(),action){

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
