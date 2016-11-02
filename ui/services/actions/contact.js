
const props = {
    SET_LIST: 'setContactList',
    ADD: 'addContact',
    REMOVE: 'removeContact',
    SEARCH: 'searchContact'
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
function searchContact(contactName){
    return {
        type: props.SEARCH,
        contactName
    }
}

module.exports = {
    contact: props,
    setContactList,
    addContact,
    removeContact,
    searchContact
}