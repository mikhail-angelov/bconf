
function getContacts(){
    const contacts = [];
    for(let i=0; i < 200; i++){
        contacts.push('John Doe ' + i);
    }
    console.log(contacts)
    return contacts;
}

function contacts(state = getContacts(),action){
    switch(action.type){
        case 'ADD_CONTACT':{
            state.push(action.contact);
            return state;
        }
        default:
            return state;
    }
}

module.exports = contacts