const _ = require('lodash')
const shortid = require('shortid')
const auth = require('./auth')
const database = require('./db')
const USER_CHATS = 'userChats'
const MESSAGES = 'messages'
const online = {}
const pushNotification = require('./pushNotification')
const WebSocketServer = require('websocket').server;


function init(server) {
  wsServer = new WebSocketServer({
    httpServer: server
  });
  wsServer.on('request', function (request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
    let connection
    if (request.resourceURL.query && request.resourceURL.query.token) {

      const user = auth.decodeToken(request.resourceURL.query.token)

      connection = request.accept(null, request.origin)

      online[user._id] = connection

      connection.on('message', function (message) {
        console.info(`message:send  data, ${JSON.stringify(message)}`)
        if (message.type === 'utf8') {
          processMessage({ user, data: message.utf8Data, online })
        }
      });

      connection.on('close', function (connection) {
        online[user._id] = null
      });

    } else {
      request.reject();
      console.log("Connection to websocket rejected. Auth error.")
    }

  });
}

async function processMessage({ user, data, online }) {
  try {
    const parsed = JSON.parse(data)
    const db = await database.db()
    const message = {
      _id: shortid.generate(),
      chatId: parsed.chatId,
      text: parsed.message.text,
      links: parsed.message.links,
      audioLinks: parsed.message.audioLinks,
      author: user,
      timestamp: Date.now(),
    }
    const chatId = parsed.chatId
    await db.collection(MESSAGES).insertOne(message)
    await db.collection(USER_CHATS).updateMany({ chatId }, {
      $set: {
        lastMessageText: message.text,
        lastMessageId: message._id,
        lastMessageAuthor: user.name,
        lastMessageAuthorId: user._id,
        lastMessageTimestamp: message.timestamp
      }
    })

    await pushNotification.send({ text: parsed.message.text, chatId })

    //todo: temp common broadcast
    _.forEach(online, connection => {
      connection && connection.sendUTF(
        JSON.stringify(message));
    })

  } catch (e) {
    console.error('cannot send message, ', e)
  }
}

async function getChat(chatId) {
  const db = await database.db()
  const userChats = await db.collection(USER_CHATS).find({ chatId }).toArray()
  return {
    chatId: _.get(userChats, '0.chatId'),
    chatName: _.get(userChats, '0.chatName'),
    chatImage: _.get(userChats, '0.chatImage'),
    users: _.map(userChats, item => ({ _id: item.userId, name: item.userName }))
  }
}

async function getChats(user) {
  const db = await database.db()
  const userChats = await db.collection(USER_CHATS).find({ userId: user._id }).toArray()
  return userChats
}

async function createChat({ user, request }) {
  const { users, chatName } = request
  const chatId = shortid.generate()
  const db = await database.db()
  await db.collection(USER_CHATS).insertOne({
    chatId, chatName,
    userId: user._id, userName: user.name
  })
  if (_.get(users, 'length') > 0) {
    for (let contact of users) {
      await db.collection(USER_CHATS).insertOne({
        chatId, chatName,
        userId: contact._id, userName: contact.name
      })
    }
  }
  return getChat(chatId)
}

async function updateChat({ user, request }) {
  const { chatId, chatName, chatImage } = request
  let response
  const db = await database.db()
  const isUserInChat = await db.collection(USER_CHATS).find({ userId: user._id, chatId }).toArray()
  if (isUserInChat.length > 0) {
    response = await db.collection(USER_CHATS).updateMany(
      { chatId },
      { $set: { chatName, chatImage } },
    )
  }
  if (!response.result.ok) {
    return Promise.reject('invalid params')
  }
  return getChat(chatId)
}

async function addUser({ user, request }) {
  const { chat } = request
  const newUser = request.user
  if (!chat || !newUser) {
    return Promise.reject('invalid params')
  }
  const db = await database.db()
  const response = await db.collection(USER_CHATS)
    .find({ chatId: chat.chatId, userId: newUser._id }).toArray()
  if (response.length > 0) {
    return Promise.reject('user already added')
  }
  await db.collection(USER_CHATS).insertOne({
    chatId: chat.chatId, chatName: chat.chatName,
    userId: newUser._id, userName: newUser.name
  })
  //todo: notify this user
  return { ok: 'success' }
}

async function getMessages({ user, chatId, query }) {
  if (chatId && user) {
    const db = await database.db()
    const messages = await db.collection(MESSAGES).find({ chatId, timestamp: { $gt: query.timestamp } }).toArray()
    return messages
  } else {
    return Promise.reject('Invalid param')
  }
}

module.exports = {
  init,
  getChat,
  getChats,
  createChat,
  updateChat,
  addUser,
  getMessages,
  //private method only
  processMessage,
}