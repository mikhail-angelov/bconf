const admin = require('firebase-admin')
const USER_CHATS = 'userChats'

async function send({ text, chatId }) {
    const usersInChat = getUsersFirebaseTokens(chatId);
    try {
        for (let i = 0; i < usersInChat.length - 1; i++) {
            const user = usersInChat[i]
            if (user.firebaseMsgToken) {
                const pushMessage = {
                    data: {
                        text: text
                    },
                    token: user.firebaseMsgToken
                }
                await admin.messaging().send(pushMessage)
            } else {
                console.log("User doesn't have firebaseMsgToken, user id is", user._id)
            }
        }
    } catch (e) {
        console.log(`Error sending push notifications to users of chat: ${chatId} `, e)
    }
}

async function getUsersFirebaseTokens(chatId) {
    const db = await database.db()
    const userChats = await db.collection(USER_CHATS).find({ chatId }).toArray()
    return _.map(userChats, item => ({ _id: item.userId, firebaseMsgToken: item.firebaseMsgToken }))
}

module.exports = {
    send
}