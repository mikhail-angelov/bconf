
const actions = require('../actions/index.js')
const _ = require('lodash')

const TEMP_INIT_STATE = {
    active: 'test',
    filtered: [],
    chats: {
       'test':{
           contact: {"id":"test","firstName":"Vasya","secondName":"Vasin"},
            unread:0,
            messages:[]
       } 
    }
}

function chats(state = TEMP_INIT_STATE, action) {
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
        case actions.chats.CHAT_MESSAGE: {
            const message = {
                type: 'IN',
                text: action.payload.content,
                date: new Date(),
            }
            state.chats[action.payload.author] = state.chats[action.payload.author] || {messages:[]}
            state.chats[action.payload.author].messages = [message].concat(state.chats[action.payload.author].messages)
            if(state.active == action.payload.author){
                state.filtered = [message].concat(state.filtered);
            }

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