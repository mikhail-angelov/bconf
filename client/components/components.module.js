import  _util from './util/util.module.js'
import _auth from './auth/auth.module.js'
import _constatnts from './app.constant.js'
import _fluxStores from './fluxStores/fluxStores.module.js'
import _restServices from './restServices/restServices.module.js'


import constant from './common/constants.js'
import RedirectController from './redirect/redirect.js'
import ChatModel from './models/chatModel.js'
import ContactsModel from './models/contactsModel.js'
import Peer from './services/peerjs.js'
import Audio from './services/audio.js'
import Property from './services/properties.js'


angular.module('components.module', [
    'util.module',
    'auth.module',
    'fluxStores.module',
    'restServices.module',
    'bconfApp.constants',
    'ngResource',
    'ngSanitize',
    'ui.router'
])
    .constant('constant', constant)
    .controller('RedirectController', RedirectController)
    .factory('ChatModel', ChatModel)
    .factory('ContactsModel', ContactsModel)
    .factory('Peer', Peer)
    .factory('Audio', Audio)
    .factory('Property', Property)


    .config(function ($urlRouterProvider, $locationProvider, $stateProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('redirect', {
                template: '<div></div>',
                controller: 'RedirectController'
            })
        ;

    });