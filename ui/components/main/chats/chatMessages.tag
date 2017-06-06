import './chatMessage.tag'
<chat-messages>
    <div class="chatMessages">
        <chat-message each="{message in opts.messages}" message={message}  />
    </div>

<style>
    .chatMessages{
        display: flex;
        flex: 1;
        flex-direction: column;
    }
</style>
</chat-messages>