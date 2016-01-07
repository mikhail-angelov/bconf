import BaseStore from './BaseStore.js'

class ChatsStore extends BaseStore{

    constructor(EventBus){
        super(EventBus);
        this.id = 'ChatsStore';

        this.data = {
            chats: [],
            index: 0
        };
        EventBus.on(EventBus.chats.LOAD_ALL, (scope,chats)=>{
            this.data.chats = chats;
            this.emitChanges();
        });
        EventBus.on(EventBus.chats.SELECT_CHAT, (scope,index)=>{
            this.data.index = index;
            this.emitChanges();
        });

    }

    getCurrentChat(){
        return this.data.chats[this.data.index];
    }
}

export default ChatsStore;