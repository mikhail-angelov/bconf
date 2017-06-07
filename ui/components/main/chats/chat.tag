import './chatMessages.tag'
import './chatInput.tag'

<chat>
    <chat-messages messages={chatMessages()} />
    <chat-input vm={chatInputVm} />

<script>

const store = this.opts.store
const action = this.opts.action

this.chatMessages = ()=>{
    const chat = store.getState().chats.selected
    return chat?chat.messages:null
}

this.chatInputVm = {
    sendMessage: text=>{
        console.log('senging', text)
        store.dispatch(action.sendMessage(text))
    }
}

</script>

<style>
    chat {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
</style>
</chat>