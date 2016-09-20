<chat class="toflex" style="flex-flow: column-reverse nowrap;">
         
        <div class="messages" each={m in this.opts.messages}>
            {m}
        </div>
    </div>
    
   
<script>

 

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
    margin-bottom: 3;
    word-wrap: break-word;

}
    

</style>
</chat>    