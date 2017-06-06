<chat-message>
<div class='chat-message {chat-message-in: opts.message.type==="IN"}'>
    {format(opts.message.text)}
</div>
<script>
    this.format = text=>{
        return text
    }
</script>
<style>
    .chat-message{

    }
    .chat-message-in{

    }
</style>
</chat-message>