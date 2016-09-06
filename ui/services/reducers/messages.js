
//module.exports = function(state={}, action){
    
    //ADD_MESSAGE: action.message = {userId:'test',type:'in/out',text:'test', id:'id'}
    //LOAD_MESSAGES: action.messages = {'userId': [{id:'1',type:'in/out',text:'test'}]}
    //REMOVE_MESSAGES: action.message =  {userId:'test',id:'id'}
//}

//{
//    'userId' [{id:'1',type:'in/out',text:'test'}]
//}


const actions = require('../actions/index.js')
const _ = require('lodash')


function messages(state={},action){
    switch(action.type){
        case actions.message.ADD_MESSAGE:{
            const userId = action.message.userId
            state[userId] = state[userId] || []
            const message = {
                id: action.message.id,
                type: action.message.type,
                text: action.message.text
            }
            state[userId].push(message)
            return state
        }
        case actions.message.REMOVE_MESSAGE:{
            const userId = action.message.userId
  

            //state[userId].splice(message)
            state[userId] = _.filter(state[userId],message => message.id != action.message.id)
             return state
        }
        case actions.message.LOAD_MESSAGES:{
            return Object.assign (state,action.messages)
        }
        default:
            return state
    }
}

module.exports = messages