class ContactsServiceRest {
    constructor($http) {
        this.$http = $http;
    }

    getContact(contactId) {
        return this.$http.get('/api/users/' + contactId)
    }

    getAllContacts() {
        return this.$http.get('/api/contacts');
    }

    createGuest() {
        return this.$http.post('/api/users/createGuest');
    }

    findContacts(text) {
        return this.$http({
            url: '/api/contacts/search',
            method: "GET",
            params: {text: text}
        });
    }
}


export default ContactsServiceRest;