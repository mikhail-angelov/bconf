export default function (params) {
    return {
        controller: ContactFormController,
        controllerAs: 'vm',
        templateUrl: 'web/chat/roster/contactForm/contactForm.html'
    };
}

class ContactFormController {
    constructor($mdDialog, ContactService, ContactsStore, EventBus, $scope) {
        this.$mdDialog = $mdDialog;
        this.ContactService = ContactService;
        this.ContactsStore = ContactsStore;
        this.EventBus = EventBus;
        this.searchContact = null;

        ContactsStore.subscribeAndInit($scope, ()=> {
            this.contacts = ContactsStore.getContacts();
            this.currentContactIndex = null;
        })
    }

    onSelect(index) {
        this.EventBus.emit(this.EventBus.contacts.SELECT, index);
    }

    onFindContact() {
        if(this.searchContact && this.searchContact.length>1) {
            this.ContactService.findContacts(this.searchContact);
        }
    }

    onInvite(index) {
        this.onSelect(index);
        let contact = this.ContactsStore.getSelectedContact();
        this.ContactService.addContactAndSendInvitation(contact,'todo: please add me to contact list');
    }

    onClose() {
        this.$mdDialog.cancel();
    }
}