const actions = require('../actions/index.js')
const _ = require('lodash')


function contacts(state = {
    contacts: [],
    filtered: []
}, action) {
    switch (action.type) {
        case actions.contact.ADD: {
            return {
                contacts: _.concat(state.contacts, action.contact),
                filtered: _.concat(state.filtered, action.contact)
            }
        }
        case actions.contact.REMOVE: {
            return {
                contacts: _.filter(state.contacts, item => item.userId != action.contactId),
                filtered: _.filter(state.filtered, item => item.userId != action.contactId),
            }
        }
        case actions.contact.CONTACT_LIST_UPLOAD: {
            const contacts = formatContacts(action.list)
            return {
                contacts: contacts,
                filtered: contacts
            }
        }
        case actions.contact.SEARCH: {
            var filtered
            if (action.contactName) {
                filtered = _.filter(state.contacts, item => {
                    return item.firstName.indexOf(action.contactName) >= 0;
                })
            } else {
                filtered = state.contacts
            }
            return {
                ...state,
                filtered
            }
        }
        case actions.contact.SELECT_CONTACT: {
            return {
                ...state,
                filtered:  state.filtered.map(item => {
                    if (item._id === action.contact._id) {
                        item.selected = true
                    } else {
                        item.selected = false
                    }
                    return item
                })
            }
        }
        default:
            return state
    }
}

function formatContacts(list){
    return list.map(item=>{
        item.initials = getInitials( item.name)
        return item
    })
}

function getInitials( name) {
    const initials = (name||'').split(' ').map(item=>item?item[0].toUpperCase():'')
    return (initials[0]|| '')+(initials[1]|| '')
}

module.exports = contacts
