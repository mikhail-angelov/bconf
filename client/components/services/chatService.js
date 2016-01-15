class ChatService {

    constructor(Peer, EventBus, ContactsModel, ChatsStore) {

        this.ChatsStore = ChatsStore;
        this.Peer = Peer;
        this.EventBus = EventBus;


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

    sendMessage(payload) {
        let chat = this.ChatsStore.getCurrentChat();
        if (chat.type === 'bot') {
            let message = {
                bot:chat.id,
                type:'BOT',
                payload
            };
            this.EventBus.emit(this.EventBus.messages.ADD, payload);
            return this.Peer.sendHostMessage(message);
        }
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
