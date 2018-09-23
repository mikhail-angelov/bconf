const _ = require('lodash')
const nanoid = require('nanoid')
const auth = require('./auth')
const database = require('./db')
const USER_CHATS = 'userChats'
const MESSAGES = 'messages'
const online = {}

function init(server) {
  const io = require('socket.io')(server);
  io.on('connection', onConnection)
}

function onConnection(socket) {
  console.log('onConnection socket', socket)
  const token = socket.headers['authorization']
  if (!token) {
    socket.disconnect()
    return 'invalid token'
  }
  const user = auth.decodeToken(token)
  if (!user) {
    socket.disconnect()
    return 'invalid token'
  }
  online[user._id] = socket

  socket.on('disconnect', () => {
    console.info('user disconnected:', user._id)
    online[user._id] = null
  })

  socket.on('message', (data) => {
    console.info(`message:send  data, ${JSON.stringify(data)}`)
    processMessage({ user, data, online })
  })
}

async function processMessage({ user, data, online }) {
  console.log('data', data)
  //todo: temp common broadcast
  _.each(online, socket => {
    socket.send(data)
  })
}

async function getChat(chatId) {
  const db = await database.db()
  const userChats = await db.collection(USER_CHATS).find({ chatId }).toArray()
  return {
    _id: _.get(userChats, '0.chatId'),
    name: _.get(userChats, '0.chatName'),
    users: _.map(userChats, item => ({ _id: item.userId, name: item.userName }))
  }
}

async function getChats(user) {
  const db = await database.db()
  const userChats = await db.collection(USER_CHATS).find({ userId: user._id }).toArray()
  return _.map(userChats, item => ({ _id: item.chatId, name: item.chatName }))
}

async function createChat({ user, request }) {
  const { users, name } = request
  const chatId = nanoid()
  const db = await database.db()
  await db.collection(USER_CHATS).insertOne({
    chatId, chatName: name,
    userId: user._id, userName: user.name
  })
  if(_.get(users,'length')>0){
    for(let contact of users){
      await db.collection(USER_CHATS).insertOne({
        chatId, chatName: name,
        userId: contact._id, userName: contact.name
      })
    }
  }
  return getChat(chatId)
}

async function updateChatName({ user, request }) {
  const { _id, name } = request
  const db = await database.db()
  const response = await db.collection(USER_CHATS).update(
    { chatId: _id },
    { $set: { chatName: name } },
    { multy: true }
  )
  if (!response.result.ok) {
    return Promise.reject('invalid params')
  }
  return getChat(_id)
}

async function getMessages({ user, chatId }) {
  const db = await database.db()
  const messages = await db.collection(MESSAGES).find({ chatId }).toArray()
  return messages
}

module.exports = {
  init,
  getChat,
  getChats,
  createChat,
  updateChatName,
  getMessages,
}