
import ContactsServiceRest from './contacts.service.js'
import UserServiceRest from './user.service.js'

angular.module('restServices.module', [])

    .service('UserServiceRest', UserServiceRest)
    .service('ContactsServiceRest', ContactsServiceRest);





