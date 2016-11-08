const actions = require('../actions/index.js')
const _ = require('lodash')

const test = {
    'filtered':[{
        firstName: 'Vasya',
        secondName: 'Pupkin',
        userId: '57',
        info: 'some info'
    }]
}
function contacts(state={
    contacts:[],
    filtered:[],
    test
},action){
    switch(action.type){
        case actions.contact.ADD:{
            state.contacts.push(action.contact)
            state.filtered.push(action.contact)
            return state
        }
        case actions.contact.REMOVE:{
            return {
                contacts: _.filter(state.contacts,item => item.id != action.contactId),
                filtered: _.filter(state.filtered,item => item.id != action.contactId),
            }
        }
        case actions.contact.SET_LIST:{
            return {
                contacts: action.list,
                filtered: action.list
            }
        }
        case actions.contact.SEARCH:{
            return {
                contacts: state.contacts,
                filtered: _.filter(state.contacts,item => item.name == actions.contactName)
            }
        }
        default:
            return state
    }
}

module.exports = contacts
