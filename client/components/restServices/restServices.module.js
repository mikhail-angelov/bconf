
import ContactsService from './contacts.service.js'
import UserService from './user.service.js'

angular.module('restServices.module', [])

    .factory('User', UserService)
    .factory('ContactsService', ContactsService);





