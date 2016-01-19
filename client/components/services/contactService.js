class ContactService {

    constructor(ContactsServiceRest, EventBus) {
        this.ContactsServiceRest = ContactsServiceRest;
        this.EventBus = EventBus;
    }

    getAllContacts() {
        return this.ContactsServiceRest.getAllContacts().then(response=> {
            this.EventBus.emit(this.EventBus.chats.LOAD_ALL, response.data); //todo: redo
        });
    }

    findContacts(text) {
        return this.ContactsServiceRest.findContacts(text).then(response=> {
            this.EventBus.emit(this.EventBus.contacts.LOAD, response.data);
        });
    }

    addContactAndSendInvitation(contact, invitation){

    }
}

export
    default
    ContactService;