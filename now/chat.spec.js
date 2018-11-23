const expect = require('chai').expect
const mongoUnit = require('mongo-unit')
const chat = require('./chat')
const data = require('./tests/db/chat.json')
const USER_ID = '5ba6532c43c528a283a86f54'
const USER_ID2 = '5ba6532c43c528a283a86f56'
const CHAT_ID = '5ba6532c43c528a283a86f57'
const CHAT_ID2 = '5ba6532c43c528a283a86f58'

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
      request: { chatName: 'test' }
    })
    expect(response.chatName).eql('test')
  })

  it('should update chat', async () => {
    const response = await chat.updateChat({
      user: { _id: USER_ID },
      request: { chatId: CHAT_ID, chatName: 'test', chatImage: "src-to-pic" }
    })
    expect(response.chatName).eql('test')
    expect(response.chatImage).eql("src-to-pic")
  })
  it('should add user to chat', async () => {
    await chat.addUser({
      user: {},
      request: {
        user: { _id: '5ba6532c43c528a283a86f56' },
        chat: { chatId: CHAT_ID, chatName: 'test' }
      }
    })
    const response = await chat.getChat(CHAT_ID)
    expect(response.users.length).eql(3)
  })

  it('should fail on get chat messages if chatId blank', async () => {
    return chat.getMessages({
      user: { _id: USER_ID },
      chatId: null
    })
      .catch(err => expect(err).eql('Invalid param'))
  })

  it('should get all chat messages', async () => {
    const messages = await chat.getMessages({
      user: { _id: USER_ID },
      chatId: CHAT_ID
    })
    expect(messages.length).eql(2)
  })

  it('should change last message in chat', async () => {
    await chat.processMessage({
      user: {
        _id: USER_ID,
        name: "kkk"
      },
      data: JSON.stringify({
        chatId: "5ba6532c43c528a283a86f57",
        message: {
          text: "new message"
        }
      }
      )
    })
    const response = await chat.getChats({ _id: USER_ID })
    expect(response[0].lastMessageText).eql("new message")
  })

  it('should send file in chat', async () => {
    await chat.processMessage({
      user: {
        _id: USER_ID2,
        name: "kkk"
      },
      data: JSON.stringify({
        chatId: "5ba6532c43c528a283a86f58",
        message: {
          text: "new message",
          links: ["pic1", "pic2"]
        }
      }
      )
    })
    const response = await chat.getMessages({
      user: { _id: USER_ID2 },
      chatId: CHAT_ID2
    })
    expect(response[0].links.length).eql(2)
  })

  it('should send messages delta', async () => {
    const messagesDelta = await chat.getMessagesDelta(
      {
        user: {
          _id: USER_ID,
          name: "kkk"
        },
        chatId: "5ba6532c43c528a283a86f57",
        lastMessageTimestamp: "1538038661171"

      })
    expect(messagesDelta.length).eql(2);
  })

  it('should send messages delta (empty case)', async () => {
    const messagesDelta = await chat.getMessagesDelta(
      {
        user: {
          _id: USER_ID,
          name: "kkk"
        },
        chatId: "5ba6532c43c528a283a86f57",
        lastMessageTimestamp: "1538038661471"

      })
    expect(messagesDelta.length).eql(0);
  })
})
