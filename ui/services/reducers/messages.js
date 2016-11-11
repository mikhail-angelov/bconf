
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

const testMessages = [{
        text:'hey',
        type:'in',
        from: {
            name: 'Ivan',
            surname:'Dmitriev'
        },
        date: new Date()
    },{
        text: 'ho',
        type:'out',
        from: {
            name: 'Vasya',
            surname: 'Vasin'
        },
        date: new Date()
    }];

function messages(state={
        'test':{
            messages:testMessages,
            filtered:testMessages
        }
    },action){
    switch(action.type){
        case actions.message.ADD_MESSAGE:{
            const userId = action.message.userId
            state[userId] = state[userId] || []
            const message = {
                id: action.message.id,
                userId: action.message.userId,
                type: action.message.type,
                text: action.message.text,
                from: action.message.from,
                date: action.message.date,
            }
            //state[userId].push(message)
            state[userId].messages = [message].concat(state[userId].messages);
            state[userId].filtered = [message].concat(state[userId].filtered);
            return state
        }
        case actions.message.REMOVE_MESSAGE:{
            const userId = action.message.userId


            //state[userId].splice(message)
            state[userId].messages = _.filter(state[userId],message => message.id != action.message.id)
            state[userId].filtered = _.filter(state[userId],message => message.id != action.message.id)
             return state
        }


        case actions.message.SEARCH_MESSAGE:{
            const userId = 'test';
            const text = action.messageText
            var filtred
            if (action.messageText) {
                    filtred = _.filter(state[userId].messages,item => {
                    return item.text.indexOf(text)>=0;
                })
            }else{
                filtred = state[userId].messages
            }
            return {
                'test': {
                    messages: state[userId].messages,
                    filtered: filtred
                }
            }
        }
        default:
            return state
    }
}

module.exports = messages