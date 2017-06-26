
const actions = require('../actions/index.js')
const _ = require('lodash')

const TEMP_INIT_STATE = {
  filtered: [],
  list: [
    {
      _id: 'test',
      contact: {'_id': 'test', 'name': 'Vasya Vasin'},
      unread: 0,
      messages: [{
        type: 'IN',
        text: '##test',
        date: new Date()
      },
      {
        type: 'OUT',
        text: 'sent #test message',
        date: new Date()
      }]
    }],
  selected: null
}

function chats (state = TEMP_INIT_STATE, action) {
  switch (action.type) {
    case actions.chats.ADD_MESSAGE: {
      const message = {

        type: action.message.type,
        text: action.message.text,
        date: action.message.date
      }
            // state[userId].push(message)
      state.list[state.active].messages = [message].concat(state.list[state.active].messages)
      state.filtered = [message].concat(state.filtered)

      return Object.assign(state, {
        chats: state.chats,
        filtered: state.filtered
      })
    }
    case actions.chats.CHAT_MESSAGE: {
      const message = {
        type: 'IN',
        text: action.payload.content,
        date: new Date()
      }
      const chat = state.list[action.payload.author] || {
        conatct: action.contact,
        messages: [],
        unread: 0
      }
      chat.messages = [message].concat(state.list[action.payload.author].messages)
      if (state.active == action.payload.author) {
        state.filtered = [message].concat(state.filtered)
      } else {
        chat.unread++
      }

      state.list[action.payload.author] = chat

      return Object.assign(state, {
        list: state.list,
        filtered: state.filtered
      })
    }
    case actions.chats.REMOVE_MESSAGE: {
      const userId = action.chats.userId

            // state[userId].splice(message)
            // state[userId].messages = _.filter(state[userId],message => message.id != action.message.id)
            // state.filtered = _.filter(state[userId],message => message.id != action.message.id)
      return state
    }

    case actions.chats.SEARCH_MESSAGE: {
      const userId = state.active
      const text = action.messageText
      var filtred
      if (action.messageText != '') {
        filtred = _.filter(state.list[state.active].messages, item => {
          return item.text.indexOf(text) >= 0
        })
      } else {
        filtred = state.list[state.active].messages
      }
      return Object.assign(state, {
        filtered: filtred
      })
    }
    case actions.chats.SET_ACTIVE: {
      action.activeChat.unread = 0
      return {
        ...state,
        list: state.list.map(item => {
          item.selected = (item._id === action.activeChat._id)
          return item
        }),
        selected: action.activeChat
      }
    }
    case actions.chats.START_CHAT: {
      var chat = {}
      if (!state.list[action.contact.userId]) {
        chat[action.contact.userId] = {
          contact: action.contact,
          unread: 0,
          messages: []
        }
        const list = Object.assign(
                    state.list,
                    chat)

        return Object.assign(state, {
          list: list
        })
      } else {
        return state
      }
    }
    case actions.chats.SEND_MESSAGE: {
      const selected = {
        ...action.activeChat,
        messages: action.activeChat.messages.concat({
          type: 'OUT',
          text: action.message
        })
      }

      return {
        ...state,
        selected
      }
    }
    default:
      return state
  }
}

module.exports = chats
