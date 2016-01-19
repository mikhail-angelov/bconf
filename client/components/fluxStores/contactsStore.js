import BaseStore from './BaseStore.js'

class ContactsStore extends BaseStore{

    constructor(EventBus){
        super(EventBus);
        this.id = 'ContactsStore';

        this.data = {
            contacts: [],
            selectedIndex:0
        };
        EventBus.on(EventBus.contacts.LOAD, (scope,contacts)=>{
            this.data.contacts = contacts || [];
            this.data.selectedIndex = 0;
            this.emitChanges();
        });
        EventBus.on(EventBus.contacts.SELECT, (scope,index)=>{
            this.data.selectedIndex = index;
            this.emitChanges();
        });
    }

    getContacts(){
        return this.data.contacts;
    }

    getSelectedContact(){
        return this.data.contacts[this.data.selectedIndex];
    }
}

export default ContactsStore;