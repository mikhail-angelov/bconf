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
                contacts: _.filter(state.contacts,item => item.userId != action.contactId),
                filtered: _.filter(state.filtered,item => item.userId != action.contactId),
            }
        }
        case actions.contact.SET_LIST:{
            return {
                contacts: action.list,
                filtered: action.list
            }
        }
        case actions.contact.SEARCH:{
            var filtred 
            if (action.contactName) {
                filtred = _.filter(state.contacts,item => {
                    return item.firstName.indexOf(action.contactName)>=0;
                })
            }else{
                filtred = state.contacts
            }
            return {
                contacts: state.contacts,
                filtered: filtred
            }
        }
        default:
            return state
    }
}

module.exports = contacts
