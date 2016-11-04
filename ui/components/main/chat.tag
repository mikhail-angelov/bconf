<chat class="toflex main-chat">
    <div class="message_field"  each={m in this.opts.messages}>
            <div class="check_selection">
                <i class="material-icons">check_circle</i>
            </div>
            <div class='user-account-foto toflex' style="float: left;">
                <div class="account-foto">{this.opts.username.firstname.substr(0,1)}{this.opts.username.secondname.substr(0,1)}</div>
            </div> 
            <div class="user_name">
                Ivan Dmitrich {this.opts.username.firstname}
            </div>
            <div class="messages_textarea">
                <div class="messages">
                    {m}
                </div>
            </div>
            <div class="important_msg">
                <i class="material-icons">star rate</i>
            </div>
    </div>
    
<script>

 

</script>

<style>
.main-chat {
    flex-flow: column-reverse nowrap; 
    overflow: auto; 
    height: 100%;
    overflow-x: hidden;
}
.message_field {
    height: auto;
    min-height: 42px;
    padding: 5px 50px 5px 50px;
    position: relative;
}
.user_name {
    color: #42648b;
    font-weight: 700;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    vertical-align: top;
    line-height: 1.23;
}
.friend_foto {
    float: left;
    margin-left: 30px;
}
.messages_textarea {
    overflow: auto;
}
.messages {
    /*flex-flow: row wrap;*/
    /* max-width: 400px; */
   /* min-width: 300px;
    min-height: auto;
    /* flex: 0 0 auto; */
    /* height: auto; */
    /* width: auto; */
    /*border: 1px solid grey;*/
    border-radius: 4px;
    margin-right: 50px;
    word-wrap: break-word;
    background: #fff;
    padding-left: 0px;
    padding-right: 15px;
    padding-top: 2px;
}

.important_msg i {
    margin-left: 10px;
    width: 20px;
    height: 20px;
    font-size: 16px;
    opacity: 0.5;
    visibility: hidden; 
    float: right;
    position: absolute;
    top: 10px;
    right: 10px;
}
.message_field:hover .important_msg i {
    visibility: visible;
}
.check_selection i {
    margin-right: 10px;
    width: 20px;
    height: 20px;
    font-size: 16px;
    opacity: 0.5;
    visibility: hidden; 
    float: left;
    position: absolute;
    top: 10px;
    left: 10px;
}
.message_field:hover .check_selection i {
    visibility: visible;
}
</style>
</chat>    