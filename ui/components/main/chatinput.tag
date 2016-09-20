<chatinput>
    <div class="chatinput toflex">
        <form onsubmit={onSubmit} >
        <textarea  onsubmit={onSubmit} name='newMessage' id='newMessage' placeholder="Введите сообщение"
                style="height: 50px; width: 400px;"></textarea>
        <input type="submit" onclick={onSubmit}>
        </form>
    </div>
<style>
    .chatinput {
    justify-content: center;
    align-items: center;
    flex: 1 1 100%;
    height: 100%;
    flex-direction: column;
    flex-wrap: nowrap;
    }
    .chatinput input {
        
    }
</style>
<script>
    this.onSubmit = (e)=>{
    const value = e.target.newMessage.value;
    console.log(e.target)
    if(value){
        this.messages = [value].concat(this.messages);
        e.target.newMessage.value = '';
    }
    this.update()
}
</script>
</chatinput>