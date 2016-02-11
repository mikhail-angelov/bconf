import BaseStore from './baseStore.js'

class ChatsStore extends BaseStore{

    constructor(EventBus){
        super(EventBus);
        this.id = 'ChatsStore';

        this.data = {
            chats: [],
            currentChatIndex: null
        };
        EventBus.on(EventBus.chats.LOAD_ALL, (scope,chats)=>{
            this.data.chats = chats;
            this.emitChanges();
        });
        EventBus.on(EventBus.chats.SELECT_CHAT, (scope,index)=>{
            this.data.currentChatIndex = index;
            this.emitChanges();
        });

    }

    getAllChat(){
        return this.data.chats;
    }

    getCurrentChat(){
        return this.data.chats[this.data.currentChatIndex];
    }

    getCurrentChatIndex(){
        return this.data.currentChatIndex;
    }
}

export default ChatsStore;