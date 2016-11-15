<contacts>

    <contact-item each={name in this.opts.contacts} item={name} removeContactItem={removeContactItem} setActive={activeContact} />
          
<script>

this.activeContact = (active)=>{
    this.opts.setactivechat(active);
}

this.removeContactItem = (contactId)=>this.opts.removecontact(contactId)

</script>

<style>



</style>
</contacts>