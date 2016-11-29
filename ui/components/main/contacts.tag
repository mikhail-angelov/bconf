<contacts>

    <contact-item each={item in this.opts.contacts} contact={item} chatWith={startChatWithContact} removeContactItem={removeContactItem} 
    setActive={activeContact} accountInformation={information} />
          
<script>

this.activeContact = (active)=>{
    this.opts.setactivechat(active);
}
this.startChatWithContact = (contact) =>{
    this.opts.startchat(contact)
}
this.information = (contact)=>this.opts.choosecontact(contact);
this.removeContactItem = (contactId)=>this.opts.removecontact(contactId)

</script>

<style>



</style>
</contacts>