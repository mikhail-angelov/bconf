import { observable, flow, action } from 'mobx'
import { CHAT_URL, doJsonAuthRequest, FIND_USERS_URL } from './helper'
import _ from 'lodash'
import chatsStore from './chats'

export default class Chats {
  @observable chats = []
  @observable users = []

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

  findUsers = flow(function*(username) {
    try {
      const users = yield doJsonAuthRequest({
        url: FIND_USERS_URL + username,
        method: 'get',
        data: { username },
      })
      this.users = users
    } catch (e) {
      console.log('Error :' + e)
    }
  })

  createNewChat = flow(function*(users) {
    let newChatName = ''
    const fistFourUsers = _.take(users, 4)
    _.map(fistFourUsers, user => {
      newChatName += user.name + ' '
    })
    try {
      const newChat = yield doJsonAuthRequest({
        url: CHAT_URL,
        method: 'post',
        data: { users, chatName: newChatName },
      })
      const chatColor = getRandomColor(newChat.chatId)
      const newChatWithColorAndImage = {
        ...newChat,
        chatColor,
      }
      this.chats = [...this.chats, newChatWithColorAndImage]
    } catch (e) {
      console.log('Error :' + e)
    }
  })

  @action clearSearchUsers = () => {
    this.users = []
  }
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
