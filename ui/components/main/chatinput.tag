<chatinput>
    <div class="chatinput toflex">
        
            <textarea id='text' rows="4"  onkeyup={this.opts.onsendmessage} onkeydown={keydown}  placeholder="Введите сообщение"
                    style="width: 400px; overflow: auto; height: 50px; background: #fff;"></textarea>
                <material-button onclick={this.opts.onsendmessagebutton} class="ui">
                    <div class="text">Send</div>
                </material-button>
        
        
    </div>
<style>
    .chatinput {
    justify-content: center;
    align-items: center;
    flex: 1 1 100%;
    height: 100%;
    flex-wrap: nowrap;
    }
    .chatinput input {
        
    }
</style>
<script>
   
</script>
</chatinput>