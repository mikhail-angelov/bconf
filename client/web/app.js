'use strict';

import  _components from '../components/components.module.js'
import _accounts from './account/account.js'

import MainController from './main/main.controller.js'
import oauthButtons from './oauth-buttons/oauth-buttons.directive.js'
import VoiceCallController from './voiceCall/voiceCall.js'
import ChatController from './chat/chatController.js'
import RosterDirective from './chat/roster/rosterDirective.js'
import MessagesDirective from './chat/messages/messagesDirective.js'


angular.module('bconfApp', [
    'components.module',
    'bconfApp.account',
    'ngSanitize',
    'ui.router',
    'validation.match',
    'ngMaterial'
])
    .controller('MainController', MainController)
    .controller('VoiceCallController', VoiceCallController)
    .controller('ChatController', ChatController)
    .directive('oauthButtons', oauthButtons)
    .directive('roster', RosterDirective)
    .directive('messages', MessagesDirective)


    .config(function ($urlRouterProvider, $locationProvider, $stateProvider, $mdThemingProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'web/main/main.html',
                controller: 'MainController',
                controllerAs: 'vm'
            })
            .state('chat', {
                templateUrl: 'web/chat/chat.html',
                controller: 'ChatController',
                controllerAs: 'vm',
                authenticate: true
            })
            .state('voiceCall', {
                templateUrl: 'web/voiceCall/voiceCall.html',
                controller: 'VoiceCallController',
                controllerAs: 'vm',
                authenticate: true
            });

        $mdThemingProvider.theme('default')
            .primaryPalette('pink')
            .accentPalette('orange');
    });

