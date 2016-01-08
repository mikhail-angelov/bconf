class ChatService {

    constructor(Peer, EventBus, ContactsModel) {

        EventBus.on(EventBus.peer.INIT, ()=> {
            Peer.init(peerId);
        });

        EventBus.on(EventBus.peer.START_CHAT, (scope, data)=> {
            var chatId = data.conn.peer;
            if (!chat.hasOwnProperty(chatId)) {
                chat[chatId] = {
                    messages: []
                };
            }
            chat[chatId].conn = data.conn;
            chat[chatId].status = 'active';
            subscribe(chat[chatId].conn, chatId);
            if (_.isEmpty(activeChat)) {
                activeChat = chatId;
            }
            ContactsModel.incrementMessageCount(chatId);
        });
    }

    startChat(chatId) {
        //if (!chat.hasOwnProperty(chatId)) {
        //  chat[chatId] = {
        //    conn: Peer.startChat(chatId),
        //    messages: [],
        //    status: 'active'
        //  };
        //  subscribe(chat[chatId].conn, chatId);
        //}
        //model.selectChat(chatId);
    }

    closeChat(chatId) {
        console.log('close chat ' + chatId);
        //chat[chatId].conn.close();
        ////todo implement this
        //delete chat[chatId];
    }

    selectChat(chatId) {
        //activeChat = chatId;
        //ContactsModel.resetMessageCount(chatId);
    }

    getActiveChat() {
        //return chat[activeChat];
    }

    sendMessage(message) {
        //var currentChat = chat[activeChat];
        //if (currentChat) {
        //    currentChat.messages.push({type: 'out', msg: message});
        //    if (currentChat.conn == null) {
        //        console.log('connection is closed');
        //    } else {
        //        currentChat.conn.send(message);
        //    }
        //}
    }

    startCall(chatId) {
        return this.Peer.originateCall(chatId);
    }

    answerCall(call) {
        return this.Peer.answerCall(call);
    }

    hangUp() {
        return this.Peer.hangUp();
    }

}
export default ChatService;
