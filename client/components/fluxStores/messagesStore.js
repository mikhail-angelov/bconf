import BaseStore from './BaseStore.js'

class MessagesStore extends BaseStore {

    constructor(EventBus) {
        super(EventBus);
        this.id = 'MessagesStore';

        this.data = {
            chatMessages: []
        };
        EventBus.on(EventBus.messages.LOAD_ALL, (scope, messages)=> {
            this.data.chatMessages = messages;
            this.emitChanges();
        });
        EventBus.on(EventBus.messages.ADD, (scope, message)=> {
            this.data.chatMessages.push(message);
            this.emitChanges();
        });

    }

    getMessages() {
        return this.data.chatMessages;
    }
}

export default MessagesStore;