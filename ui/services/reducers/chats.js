const actions = require('../actions/index.js')
const _ = require('lodash')
const uuid = require('uuid');

const init = loadChats();
function chats(state=init,action){
    switch(action.type){
        case actions.chats.START:{
            const chat = createChat(action.contact)
            const activeChat = Object.keys(chat)[0]
            const newState = Object.assign(state,{
                active: activeChat,
                chats: Object.assign(state.chats,chat)
            })
            return newState
        }
        case actions.chats.SELECT:{
            const activeChatId = action.chatId
            const activeChat = state.chats[activeChatId]
            //todo, make in immutable
            if(activeChat.unread > 0){
                state.unread = state.unread - activeChat.unread
                activeChat.unread = 0
            }
            const chat = {}
            chat[activeChatId] = activeChat
            const newState = Object.assign(state,{
                active: activeChatId,
                chats: Object.assign(state.chats,chat)
            })
            return newState
        }
        case actions.chats.SEND_MESSAGE:{
            const activeChatData = state.chats[state.active]
            const chatData = Object.assign(activeChatData,{
                messages: activeChatData.push(action.message)
            })
            const chat = {}
            chat[state.active] = chatData
            const newState = Object.assign(state,{
                chats: Object.assign(state.chats,chat)
            })
            return newState
        }
        case actions.chats.RECEIVE_MESSAGE:{
            const messageChat = getMessageChat(state.chats, action.contact)
            const chatKey = Object.keys(messageChat)[0]
            //todo, make in immutable
            messageChat.messages.push(action.message)
            if(chatKey != state.active){
                messageChat.unread++
                state.unread++
            }
            const newState = Object.assign(state,{
                chats: Object.assign(state.chats,messageChat)
            })
            return newState
        }
        default:
            return state
    }
}

function createChat(contact) {
    const chat = {}
    const id = uuid.v4()
    chat[id] = {
        contact,
        name: contact.name,
        messages: [],
        unread:0
    }
    return chat
}

function getMessageChat(chats,contact) {
    const key = _.findKey(chats,(value, key)=>{
        return value.contact.id === contact.id
    })
    const result = {}
    result[key] = chats[key]
    return result
}

function loadChats(){
    //todo: implement
    return {
        active:'test',
        unread:0,
        chats : {
            test:{
                name: 'test',
                messages: [{
                    text:'test',
                    direction: 'in',
                    read:true,
                    time: new Date()
                }],
                unread:0
            }
        }
    }
}

module.exports = chats