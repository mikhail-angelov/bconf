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
            return {
                contacts: action.list,
                filtered: action.list
            }
        }
        case actions.contact.SEARCH: {
            var filtred
            if (action.contactName) {
                filtred = _.filter(state.contacts, item => {
                    return item.firstName.indexOf(action.contactName) >= 0;
                })
            } else {
                filtred = state.contacts
            }
            return {
                contacts: state.contacts,
                filtered: filtred
            }
        }
        case actions.contact.SELECT_CONTACT: {
            return {
                contacts: state.contacts,
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

module.exports = contacts
