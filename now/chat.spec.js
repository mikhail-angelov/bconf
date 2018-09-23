const expect = require('chai').expect
const mongoUnit = require('mongo-unit')
const chat = require('./chat')
const data = require('./tests/db/chat.json')
const USER_ID = '5ba6532c43c528a283a86f54'
const CHAT_ID = '5ba6532c43c528a283a86f57'

describe('chat', () => {
  beforeEach(() => mongoUnit.load(data))
  afterEach(() => mongoUnit.drop())


  it('should get chat', async () => {
    const response = await chat.getChat(CHAT_ID)
    expect(response.users.length).eql(2)
  })

  it('should get all chats', async () => {
    const response = await chat.getChats({ _id: USER_ID })
    expect(response.length).eql(1)
  })

  it('should create new chat', async () => {
    const response = await chat.createChat({
      user: { _id: USER_ID },
      request: { name: 'test' }
    })
    expect(response.name).eql('test')
  })

  it('should update chat', async () => {
    const response = await chat.updateChatName({
      user: { _id: USER_ID },
      request: { _id: CHAT_ID, name: 'test' }
    })
    expect(response.name).eql('test')
  })
  it('should add user to chat', async () => {
    await chat.addUser({
      user: {},
      request: {
        user: { _id: '5ba6532c43c528a283a86f56' },
        chat: { _id: CHAT_ID, name: 'test' }
      }
    })
    const response = await chat.getChat(CHAT_ID)
    expect(response.users.length).eql(3)
  })

  it('should get all chat messages', async () => {
    const messages = await chat.getMessages({
      user: { _id: USER_ID },
      chatId: CHAT_ID
    })
    expect(messages.length).eql(2)
  })
})
