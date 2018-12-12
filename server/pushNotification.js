const admin = require('firebase-admin')
const USER_CHATS = 'userChats'
const USERS = 'users'
const database = require('./db')
const _ = require('lodash')


async function send({ text, chatId }) {
    const usersInChat = await getUsersFirebaseTokens(chatId);
    try {
        let messageCounter = 0
        for (let i = 0; i < usersInChat.length - 1; i++) {
            const user = usersInChat[i]
            if (user.firebaseMsgToken) {
                const pushMessage = {
                    notification: {
                        title: 'New chat message:',
                        body: text,
                    },
                    token: user.firebaseMsgToken
                }
                await admin.messaging().send(pushMessage)
                messageCounter++
            } else {
                console.log("User doesn't have firebaseMsgToken, user id is", user._id)
            }
        }
        return messageCounter
    } catch (e) {
        console.log(`Error sending push notifications to users of chat: ${chatId} `, e)
    }
}

async function getUsersFirebaseTokens(chatId) {
    const db = await database.db()
    const userChats = await db.collection(USER_CHATS).find({ chatId }).toArray()
    const usersInChatIds = _.map(userChats, item => item.userId)
    return await db.collection(USERS).find({ _id: { $in: usersInChatIds } }).toArray()
}

module.exports = {
    send
}