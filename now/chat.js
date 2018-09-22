const _ = require('lodash')
const auth = require('./auth')
const database = require('./db')
const CHATS = 'chats'
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

async function getChats(user) {
  const db = await database.db()
  const userChats = await db.collection(USER_CHATS).findOne({ userId: user._id })
  return userChats.chats
}

async function createChat({ user, request }) {
  const { users, name } = request
  const db = await database.db()
  const response = await db.collection(CHATS).insertOne({
    users, name
  })
  const chatId = _.get(response, 'insertedId')
  if (!chatId) {
    return Promise.reject('invalid params')
  }
  const userChats = await db.collection(USER_CHATS).findOne({ userId: user._id })
  const { _id, userId, chats } = userChats
  chats.push({ _id: chatId })
  await db.collection(USER_CHATS).updateOne(
    { _id },
    { $set: { _id, userId, chats } },
    { upsert: true }
  )
  const chat = await db.collection(CHATS).findOne({ _id: chatId })
  return chat
}

async function updateChat({ user, request }) {
  const { _id, users, name } = request
  const db = await database.db()
  const response = await db.collection(CHATS).updateOne(
    { _id },
    { $set: { _id, users, name } },
    { upsert: true }
  )
  if (!response.result.ok) {
    return Promise.reject('invalid params')
  }
  const chat = await db.collection(CHATS).findOne({ _id })
  return chat
}

async function getMessages({ user, chatId }) {
  const db = await database.db()
  const messages = await db.collection(MESSAGES).find({ chatId }).toArray()
  return messages
}

module.exports = {
  init,
  getChats,
  createChat,
  updateChat,
  getMessages,
}