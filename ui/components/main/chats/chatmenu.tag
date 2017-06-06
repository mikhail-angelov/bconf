import './chatItem.tag'
import '../searchbar.tag'

<chat-menu>
<searchbar searchContact={searchContact} />
<chat-item each="{chat in opts.chats}" chat={chat} setactive={parent.selectChat(chat)} />

<script>
    this.selectChat = chat => () => this.opts.setactivechat(chat)
</script>

</chat-menu>