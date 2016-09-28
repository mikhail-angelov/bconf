<chat class="toflex" style="flex-flow: column-reverse nowrap; overflow: auto;">
    <div class="message_field"  each={m in this.opts.messages}>
        <div class="account-foto">
            <a class="friend_photo" href="#">
                <img class="account_photo_img" src="cool.png">
            </a>
        </div>
        <div class="messages_textarea toflex">
            <div class="messages">
                {m}
            </div>
        </div>
    </div>
    
   
<script>

 

</script>

<style>
.message_field {
    height: auto;
    padding: 5 0;
}
.messages_textarea {
    justify-content: flex-start;
}
.messages {
    /*flex-flow: row wrap;*/
    /* max-width: 400px; */
    min-width: 300px;
    min-height: 70px;
    /* flex: 0 0 auto; */
    /* height: auto; */
    /* width: auto; */
    border: 2px solid grey;
    border-radius: 15px;
    margin-bottom: 3;
    word-wrap: break-word;
    background: #fff;
    padding-left: 15px;
    padding-right: 15px;
}
    

</style>
</chat>    