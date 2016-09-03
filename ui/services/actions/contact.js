
const props = {
    SET_LIST: 'setContactList',
    ADD: 'addContact',
    REMOVE: 'removeContact'
}

function setContactList(list){
    return {
        type: props.SET_LIST,
        list
    }
}

function addContact(contact) {
    return {
        type: props.ADD,
        contact
    }
}

function removeContact(contactId){
    return {
        type: props.REMOVE,
        contactId
    }
}

module.exports = {
    contact: props,
    setContactList,
    addContact,
    removeContact
}