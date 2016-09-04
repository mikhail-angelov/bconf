const expect = require('chai').expect

const actions = require('../actions')
const reducer = require('./contacts')

describe('contact reducer', ()=>{

    it('should add contact',()=>{
        const CONATACT = {name: 'test'}
        const action = actions.addContact(CONATACT)

        const newState = reducer([], action)

        expect(newState.length).to.equal(1)
        expect(newState[0].name).to.equal(CONATACT.name)
    })
})