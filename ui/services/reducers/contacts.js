const actions = require('../actions/index.js')
const _ = require('lodash')


function contacts(state=[],action){
    switch(action.type){
        case actions.contact.ADD:{
            state.push(action.contact)
            return state
        }
        case actions.contact.REMOVE:{
            return _.filter(state,item => item.id != action.contactId)
        }
        case actions.contact.SET_LIST:{
            return action.list
        }
        case actions.contact.SEARCH:{
            return _.filter(state,item => item.name !=actions.contactName)
        }
        default:
            return state
    }
}

module.exports = contacts
