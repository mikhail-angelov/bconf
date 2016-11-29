<contacts>

    <contact-item each={item in this.opts.contacts} contact={item} remove_contact_item={removeContactItem} 
    set_active={activeContact} account_information={information} />
          
<script>

this.activeContact = (active)=>{
    this.opts.setactivechat(active);
}

this.information = (contact)=>this.opts.choose_contact(contact);
this.removeContactItem = (contactId)=>this.opts.removecontact(contactId)

</script>

<style>



</style>
</contacts>