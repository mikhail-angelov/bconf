<chat>
         
        <div class="messages" each={m in this.messages}>
            {m}
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
    this.update();
}

</script>

<style>


.messages {
    display: flex;
    flex-flow: row wrap;
    max-width: 200px;
    flex: 0 0 auto;
    height: auto;
    width: auto;
    border: 2px solid grey;
    
}
    

</style>
</chat>    