
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

    const testMessages1 = [{
        text:'hey',
        type:'in',
        from: {
            name: 'Ivan',
            surname:'Dmitriev'
        },
        date: new Date()
    },{
        text: 'hello',
        type:'out',
        from: {
            name: 'Petya',
            surname: 'Petin'
        },
        date: new Date()
    }];

function messages(state={
        active:  'test1',
        filtered: testMessages,
        chats:{
            'test1':testMessages,
            'test2':testMessages1
            
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
            state.filtered = [message].concat(state.filtered);
            return state
        }
        case actions.message.REMOVE_MESSAGE:{
            const userId = action.message.userId


            //state[userId].splice(message)
            //state[userId].messages = _.filter(state[userId],message => message.id != action.message.id)
           // state.filtered = _.filter(state[userId],message => message.id != action.message.id)
             return state
        }


        case actions.message.SEARCH_MESSAGE:{
            const userId = state.active;
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
                'test':{
                    messages: state[userId].messages,
                    filtered: filtred
                }
            }
        }
        case actions.message.SET_ACTIVE:{
            state.active = action.active;
            state.filtered = state.chats[state.active];
            return state
        }
        
        default:
            return state
    }
}

module.exports = messages