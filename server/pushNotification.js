const admin = require('firebase-admin')
const USER_CHATS = 'userChats'
const USERS = 'users'
const database = require('./db')
const _ = require('lodash')


async function send({ text, chatId, authorId }) {
    const usersInChat = await getUsersFirebaseTokens(chatId, authorId);
    try {
        let messageCounter = 0
        for (let i = 0; i < usersInChat.length; i++) {
            const user = usersInChat[i]
            if (user.firebaseMsgToken) {
                const pushMessage = {
                    notification: {
                        title: 'New message:',
                        body: text,
                    },
                    android: {
                        priority: 'high',
                        notification: {
                            sound: 'default'
                        },
                        data: {
                            chatId
                        }
                    },
                    token: user.firebaseMsgToken
                }
                await admin.messaging().send(pushMessage)
                messageCounter++

            } else {
                console.log("User doesn't have firebaseMsgToken, user id is", user._id)
            }
        }
        console.log("Push notifications successfully sent to users in chat:", chatId)
        return messageCounter
    } catch (e) {
        console.log(`Error sending push notifications to users of chat: ${chatId} `, e)
    }
}

async function getUsersFirebaseTokens(chatId, authorId) {
    const db = await database.db()
    const userChats = await db.collection(USER_CHATS).find({ chatId }).toArray()
    const usersInChatIds = _.map(userChats, item => item.userId)
    const usersInChatWithoutAuthor = _.filter(usersInChatIds, id => id !== authorId)
    return await db.collection(USERS).find({ _id: { $in: usersInChatWithoutAuthor } }).toArray()
}

module.exports = {
    send
}