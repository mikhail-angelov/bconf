<contacts>

    <contact-item each={name in this.opts.contacts} item={name} removeContactItem={removeContactItem} />
          
<script>
this.removeContactItem = (contactId)=>this.opts.removecontact(contactId)
</script>

<style>



</style>
</contacts>