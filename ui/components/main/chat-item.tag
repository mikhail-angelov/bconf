<chat-item onclick={setActiveChat}>
    <div class='chat_item {selected_chat: this.opts.active}'>
            <a class="friend_photo" href="#">
                <img class="chat_photo_img" src="">
            </a>
        <div class="chat_name">
            {this.opts.chat.contact.firstName}
            {this.opts.chat.contact.secondName}</br>
            last message
        </div>
    </div>

<script>
    this.setActiveChat = ()=> {
        console.log('setactivechat')

        this.opts.setactive(this.opts.chatid);
    }
</script>
<style>
    .selected_chat {
        color: #fff;
        background: #cc0044;        
    }
    .chat_item {
        display: flex;
        min-height: 45px;
    }
    .chat_item:hover {
        cursor: pointer;
        color: #000;
        background: #e9eaec;
    }
    
    .chat_photo_img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        float: left;
        margin: 10;
    }
    .chat_name {
        display: flex;
        flex: 1 1 100%;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
</style>
</chat-item>