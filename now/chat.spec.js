const expect = require('chai').expect
const mongoUnit = require('mongo-unit')
const chat = require('./chat')
const data = require('./tests/db/chat.json')
const USER_ID = '5ba6532c43c528a283a86f54'
const CHAT_ID = '5ba6532c43c528a283a86f57'

describe('chat', () => {
  beforeEach(() => mongoUnit.load(data))
  afterEach(() => mongoUnit.drop())


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
    const response = await chat.updateChat({
      user: { _id: USER_ID },
      request: { _id: CHAT_ID, name: 'test' }
    })
    expect(response.name).eql('test')
  })

  it('should get all chat messages', async () => {
    const messages = await chat.getMessages({
      user:{ _id: USER_ID },
      chatId: CHAT_ID
    })
    expect(messages.length).eql(2)
  })
})
