const expect = require('chai').expect

const actions = require('../actions')
const reducer = require('./contacts')

describe('contact reducer', ()=>{

    it('should add contact',()=>{
        const CONTACT = {id:'test',name: 'test'}
        const action = actions.addContact(CONTACT)

        const newState = reducer([], action)

        expect(newState.length).to.equal(1)
        expect(newState[0].name).to.equal(CONTACT.name)
    })
    
    it('should remove contact',()=>{
        const CONTACTS = [{id:'test',name: 'test'}, {id:'test1',name: 'test1'}]

        const action = actions.removeContact('test')
        const newState = reducer(CONTACTS, action)
        
        expect(newState[0].name).to.equal('test1')
    })
    
    it('should set contact list', ()=>{
        const LIST = [{name: 'test'}, {id:'test',name: 'test'}]
        const action = actions.setContactList(LIST)
        
        const newState = reducer(undefined, action)
        
        expect(newState.length).to.equal(2)
        expect(newState[0].name).to.equal(LIST[0].name)
    })
})
