const config = require('../config')
const http = require('../http')


const props = {
    SET_LIST: 'setContactList',
    ADD: 'addContact',
    REMOVE: 'removeContact',
    SEARCH: 'searchContact',
    SELECT_CONTACT: 'selectContact',
    CONTACT_LIST_UPLOAD: 'contactListUpload'
}

function setContactList(){
    return function(dispatch, getState) {
    return http.get(config.host+'api/contact')
      .then(function(result) {
          console.log('--', result)
        dispatch(contactListUpload(result));
      })
      .catch(function(err) {
        console.log("Oops...", "Couldn't upload contacts: " + err);
      });
    }
}

function contactListUpload(list) {
    return {
        type: props.CONTACT_LIST_UPLOAD,
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
function selectContact(contact){
    return {
        type: props.SELECT_CONTACT,
        contact
    }
}

module.exports = {
    contact: props,
    setContactList,
    addContact,
    removeContact,
    selectContact,
    searchContact
}