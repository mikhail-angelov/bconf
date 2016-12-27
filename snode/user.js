
module.exports = {
    auth: auth,
    decode: decode,
    getUser: getUser,
    createUser: createUser,
    resetPassword: resetPassword,
    getContacts: getContacts,
    addContact: addContact,
    authGuest: authGuest
}

const USER = {
    id: "test-user",
    firstName: 'Unit',
    secondName: 'Testov',
    userId: 'test1',
    info: 'some information about this contact',
    status: 'I`m cool',
    country: 'USA',
    city: 'California',
    phoneNumber: '123456789',
    birthday: '1 march 1994',
    sex: 'male',
    date: new Date()
}

const CONTACTS = [{
    id: "test",
    firstName: 'Vasya',
    secondName: 'Vasin',
    userId: 'test1',
    info: 'some information about this contact',
    status: 'I`m cool',
    country: 'USA',
    city: 'California',
    phoneNumber: '123456789',
    birthday: '1 march 1994',
    sex: 'male',
    date: new Date()
}, {
    id: "test2",
    firstName: 'Petya',
    secondName: 'Petin',
    userId: 'test2',
    info: 'some information about this contact',
    status: 'I`m cool',
    country: 'USA',
    city: 'California',
    phoneNumber: '123456789',
    birthday: '1 march 1994',
    sex: 'male',
    date: new Date()
}];

const TOKEN = 'test token';
const GUEST = {
    token: "guestToken",
    id: "testGuest",
    firstName: 'Guest',
    secondName: 'Guestovich',
    info: 'some information about this contact',
    status: 'I`m cool',
    country: 'USA',
    city: 'California',
    phoneNumber: '123456789',
    birthday: '1 march 1994',
    sex: 'male',
    date: new Date()
}

function auth(credentials){
    return {
        user: USER,
        token: TOKEN
    }
}

function decode(token) {
    return {
        id: 'text'
    }
}

function getUser(id) {
    return USER;
}

function createUser(user){
    user.id="newUser";
    return user;
}

function resetPassword(){
    return 'reset_link'
}

function getContacts(id){
    return CONTACTS;
}

function addContact(id, contact){
    CONTACTS.push(contact);
    return CONTACTS;
}

function authGuest(){
    return GUEST;
}