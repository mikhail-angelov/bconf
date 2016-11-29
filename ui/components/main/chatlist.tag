<chatlist>
    <chat-item each="{chatId, chat in this.opts.chats.chats}" chatid={chatId} chat={chat} active={isActive(chatId)} setActive={activeContact} />
<script>
this.activeContact = (active)=>{
    this.opts.setactivechat(active);
}
this.isActive = (chatId) => chatId == this.opts.chats.active;
</script>


</chatlist>