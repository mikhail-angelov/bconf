import './chatMessage.tag'
<chat-messages>
    <div ref='messagesPanel' class='messages-panel'>
        <chat-message each="{message in opts.messages}" message={message}  />
    </div>
<script>
    this.on('updated', ()=>{
        this.refs.messagesPanel.scrollTop = this.refs.messagesPanel.scrollHeight
    })
</script>
<style>
    chat-messages{
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: flex-end;  
    }
    .messages-panel{
        overflow: auto;
    }
</style>
</chat-messages>