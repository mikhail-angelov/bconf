<chat-message class='{shift-right: opts.message.type==="IN"}'>
<div class='chat-message col-xs-6 {chat-message-in: opts.message.type==="IN"}'>
    {format(opts.message.text)}
</div>
<script>
    this.format = text=>{
        return text
    }
</script>
<style>
    .chat-message{
        margin: 5px;
        padding: 7px;
        border: 1px solid gainsboro;
        border-radius: 5px;
        background-color: beige;
    }
    chat-message.shift-right{
        justify-content: flex-end;
        display: flex;
    }
    .chat-message-in{
        background-color: aliceblue;
    }
</style>
</chat-message>