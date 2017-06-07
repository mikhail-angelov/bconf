import './contactTopMenu.tag'

<contact-information>
    <contact-top-menu vm={contactMenuVm()}/>
    <div if={!selectedContact()} class="row">
        select contact
    </div>
    <div if={selectedContact()} class="row">
        {selectedContact().name}
    </div>

<script>
const store = this.opts.store
const action = this.opts.action

this.contactMenuVm = ()=>{
    const contact = store.getState().contacts.selected
    return {
        contact,
        logout: ()=>store.dispatch(action.logout()),
        add: ()=>store.dispatch(action.addContactState()),
        search: ()=>store.dispatch(action.addContactState())
    }
}

this.selectedContact = ()=>store.getState().contacts.selected

</script>
</contact-information>