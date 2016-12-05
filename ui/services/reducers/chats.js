
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


const chat1 = {
    contact:{
        firstName: 'Ivan',
        secondName: 'Dmitriev'
    },
    unread: 0,
    messages:[{
        text: 'hey',
        type: 'in',
        date: new Date()
    },
    {
        text: 'ho',
        type: 'out',
        date: new Date()
    }]
};
const chat2 = {
    contact:{
        firstName: 'Ivan',
        secondName: 'Dmitriev'
    },
    unread: 0,
    messages:[{
        text: 'hey',
        type: 'in',
        date: new Date()
    },
    {
        text: 'hello',
        type: 'out',
        date: new Date()
    }]
};

function chats(state = {
    active: 'test1',
    filtered: [],
    chats: {
        
    }
}, action) {
    switch (action.type) {
        case actions.chats.ADD_MESSAGE: {
            //state.chats[state.active].messages = state.chats[state.active].messages || []
            const message = {
                
                type: action.message.type,
                text: action.message.text,
                date: action.message.date,
            }
            //state[userId].push(message)
            state.chats[state.active].messages = [message].concat(state.chats[state.active].messages);
            state.filtered = [message].concat(state.filtered);

            return Object.assign(state, {
                chats: state.chats,
                filtered: state.filtered
            })
        }
        case actions.chats.REMOVE_MESSAGE: {
            const userId = action.chats.userId


            //state[userId].splice(message)
            //state[userId].messages = _.filter(state[userId],message => message.id != action.message.id)
            // state.filtered = _.filter(state[userId],message => message.id != action.message.id)
            return state
        }


        case actions.chats.SEARCH_MESSAGE: {
            const userId = state.active;
            const text = action.messageText
            var filtred
            if (action.messageText != '') {
                filtred = _.filter(state.chats[state.active].messages, item => {
                    return item.text.indexOf(text) >= 0;
                })
            } else {
                filtred = state.chats[state.active].messages
            }
            return Object.assign(state, {
                filtered: filtred
            })
        }
        case actions.chats.SET_ACTIVE: {
            return Object.assign(state, {
                active: action.active,
                filtered: state.chats[action.active].messages
            })
        }
        case actions.chats.START_CHAT:{
            var chat = {};
            if(!state.chats[action.contact.userId]){
                chat[action.contact.userId] = {
                    contact: action.contact,
                    unread:0,
                    messages:[]
                }
                const chats = Object.assign(
                    state.chats,
                    chat);

                return Object.assign(state,{
                    chats: chats
                })
            }else{
                return state
            }
        }

        default:
            return state
    }
}

module.exports = chats