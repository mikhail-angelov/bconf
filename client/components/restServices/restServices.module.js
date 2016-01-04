
import ContactsService from './contacts.service.js'
import UserResource from './user.service.js'

angular.module('restServices.module', [])

    .factory('User', UserResource)
    .factory('Contacts', ContactsService);





