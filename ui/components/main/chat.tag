<chat>
   <div class='chat'>     
            <div each={m in this.messages}>
                {m}
        </div>
        <form onsubmit={onSubmit}>
        <input type='text' name='newMessage' id='newMessage'>
        </form>
    </div>
    </div>
<script>

this.onSubmit = (e)=>{
    const value = e.target.newMessage.value;
    console.log(e.target)
    if(value){
        this.messages = [value].concat(this.messages);
        e.target.newMessage.value = '';
    }
}

</script>

<style>

.chat {
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    width: 100%;
    overflow: auto;
}
    

</style>
</chat>    