<chatinput>
    <div class="chatinput">
    <form onsubmit={onSubmit}>
        <input type='text' name='newMessage' id='newMessage'>
    </form>
    </div>
<style>
    .chatinput {
    justify-content: center;
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