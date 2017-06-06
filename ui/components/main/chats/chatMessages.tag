import './chatMessage.tag'
<chat-messages>
    <chat-message each="{message in opts.messages}" message={message}  />


<style>
    chat-messages{
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: flex-end;
    }
</style>
</chat-messages>