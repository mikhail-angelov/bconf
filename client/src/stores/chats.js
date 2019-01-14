import { observable, flow, action } from 'mobx'
import { CHAT_URL, doJsonAuthRequest } from './helper'
import _ from 'lodash'
import chatsStore from './chats'

export default class Chats {
  @observable chats = []

  getChats = flow(function*() {
    try {
      let chats = yield doJsonAuthRequest({
        url: CHAT_URL,
        method: 'get',
      })
      this.chats = _.map(chats, chat => ({
        ...chat,
        chatColor: chat.chatColor || getRandomColor(chat.chatId),
      }))
    } catch (e) {
      console.log('Get chats error:', e)
    }
  })
}

function getRandomColor(chatId) {
  const rand = chatId.charCodeAt(0) % colors.length
  return colors[rand]
}

const colors = [
  '#FFCCFF',
  '#9999FF',
  '#66CCCC',
  '#11AAFF',
  '#22AAAA',
  '#FFCC00',
  '#FFCCCC',
  '#996699',
  '#66CCFF',
  '#332244',
]
