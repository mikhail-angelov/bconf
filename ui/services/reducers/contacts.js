const actions = require('../actions/index.js')
const _ = require('lodash')

const test = [{
        firstName: 'Vasya',
        secondName: 'Vasin',
        userId: 'test1',
        info: 'some information about this contact',
        status: 'I`m cool',
        country: 'USA',
        city: 'California',
        phoneNumber: '123456789',
        birthday: '1 march 1994',
        sex: 'male',
        date: new Date()
    },{
        firstName: 'Petya',
        secondName: 'Petin',
        userId: 'test2',
        info: 'some information about this contact',
        status: 'I`m cool',
        country: 'USA',
        city: 'California',
        phoneNumber: '123456789',
        birthday: '1 march 1994',
        sex: 'male',
        date: new Date()
    }]

function contacts(state={
    contacts:test,
    filtered:test
},action){
    switch(action.type){
        case actions.contact.ADD:{
            return {
                contacts: _.concat(state.contacts,action.contact),
                filtered: _.concat(state.filtered,action.contact)
            }
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
