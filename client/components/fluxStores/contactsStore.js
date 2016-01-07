import BaseStore from './BaseStore.js'

class ContactsStore extends BaseStore{

    constructor(EventBus){
        super(EventBus);
        this.id = 'ContactsStore';

        this.data = {
            contacts: []
        };
        EventBus.on(EventBus.contacts.LOAD_ALL, (scope,contacts)=>{
            this.data.contacts = contacts;
            this.emitChanges();
        });
        EventBus.on(EventBus.contacts.ADD, (scope,contact)=>{
            this.data.contacts.push(contact);
            this.emitChanges();
        });
    }

    getAllContacts(){
        return this.data.contacts;
    }
}

export default ContactsStore;