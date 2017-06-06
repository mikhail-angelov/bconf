<chat-input>
<div class="fixed_to_bottom">
    <div class="account_chat">
         <div class="textarea_emodji">
            <textarea ref='text' rows="4"  onkeyup={pressEnter} placeholder="type message" class="textarea"></textarea>
            <div class="emodji">
                <i class="material-icons">insert_emoticon</i>
            </div>
        </div>
        <material-button onclick={sendMessage} class="ui" style="background-color:#cc0044; margin-left: 20px;">
                <div class="text">Send</div>
        </material-button>
    </div>
    <div class="emodji_bar">
        
    </div>
</div>
<script>

this.pressEnter = (e)=>{
    if(e.keyCode=='13'){
        this.sendMessage()
    }
}
this.sendMessage = ()=>{
        const value = this.refs.text.value.trim()
        this.opts.vm.sendMessage(value)
        this.refs.text.value = ''
        this.update()
}
</script>
<style>
    .test{}
    .account_chat{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
    }

    .textarea {
        width: 400px;
        padding-right: 25px;
        overflow: auto;
        height: 50px;
        background: #fff;
        border-left: none;
        border-right: none;
        border-top: none;
        border-bottom: solid 1px #e4e6e9;
        text-decoration: none;
        transition: 0.7s;
        font-size: 20px;
    }
    .textarea:focus {
        border-bottom: solid 1px #cc0044;
    }
    .fixed_to_bottom {
        bottom: 20px;
        border-top: solid 1px #e4e6e9;
        padding-top: 25px;
    }
    .textarea_emodji {
        position: relative;
        padding: 0px 0px 0px 10px;
        width: 400px;
    }
    .emodji_bar {
        height: 15px;
    }
    .emodji i {
        float: right;
        position: absolute;
        right: 5px;
        top: 5px;
        font-size: 20px;
        opacity: 0.5;
    }
    .emodji i:hover {
        color: #cc0044;
        opacity: 1;
    }
</style>

</chat-input>