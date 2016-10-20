const expect = require('chai').expect

const actions = require('../actions')
const reducer = require('./chats')

describe('chats reducer', ()=>{

    it('should init with one chat',()=>{
        const action = {type:'any'}

        const newState = reducer(undefined, action)

        expect(newState.active).to.equal('test')
        expect(newState.chats['test'].name).to.equal('test')
    })
    

})
