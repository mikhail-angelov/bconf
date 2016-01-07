import BaseStore from './BaseStore.js'

class MessagesStore extends BaseStore{

    constructor(EventBus){
        super(EventBus);
        this.id = 'MessagesStore';

        this.data = {
            chatMessages: []
        };
        EventBus.on(EventBus.messages.LOAD_ALL, (scope,messages)=>{
            this.data.chatMessages = messages;
            this.emitChanges();
        });
        EventBus.on(EventBus.messages.ADD, (scope,chatId,message)=>{
            this.data.chatMessages[chatId] = this.data.chatMessages[chatId] || [];
            this.data.chatMessages[chatId].push(message);
            this.emitChanges();
        });

    }

    getMessages(chatId){
        return this.data.chatMessages[chatId];
    }
}

export default MessagesStore;