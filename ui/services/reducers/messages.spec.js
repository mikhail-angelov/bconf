const expect = require('chai').expect

const actions = require('../actions')
const reducer = require('./messages')

describe('message reducer', ()=>{

    it('should add message',()=>{
        const MESSAGE = {userId:'test',type:'in/out',text:'testMessage', id:'id'}
        const action = actions.addMessage(MESSAGE)

        const newState = reducer({}, action)

        expect(newState['test'].length).to.equal(1)
        expect(newState['test'][0].id).to.equal(MESSAGE.id)
    })
    
    it('should remove message',()=>{
        const MESSAGES = {
            'test':[{type:'in/out',text:'testMessage', id:'id'},
                   {type:'in/out',text:'testMessage1', id:'id1'}]
        }

        const action = actions.removeMessage({userId:'test',id:'id1'})
        const newState = reducer(MESSAGES, action)
        
        expect(newState['test'].length).to.equal(1)
        expect(newState['test'].id).to.equal(MESSAGES.id)
    })
    
    it('should load messages', ()=>{
        const OLD_MESSAGES = {'test':[{type:'in',text:'testMessage', id:'id'}]}
        const MESSAGES = {'test2':[{type:'out',text:'testMessage1', id:'id1'}]}
        const action = actions.loadMessages(MESSAGES)
        
        const newState = reducer(OLD_MESSAGES, action)
        
        expect(newState['test'].length).to.equal(1)
        expect(newState['test'][0].id).to.equal('id')
        expect(newState['test2'].length).to.equal(1)
        expect(newState['test2'][0].id).to.equal('id1')
    })
})
