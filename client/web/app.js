'use strict';

import  _components from '../components/components.module.js'
import _accounts from './account/account.js'

import MainController from './main/main.controller.js'
import oauthButtons from './oauth-buttons/oauth-buttons.directive.js'
import VoiceCallController from './voiceCall/voiceCall.js'
import ChatController from './chat/chatController.js'


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
        url: '/chat',
        templateUrl: 'web/chat/chat.html',
        controller: 'ChatController',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('voiceCall', {
        url: '/voice-cal',
        templateUrl: 'web/voiceCall/voiceCall.html',
        controller: 'VoiceCallController',
        controllerAs: 'vm',
        authenticate: true
      });

    $mdThemingProvider.theme('default')
      .primaryPalette('pink')
      .accentPalette('orange');
  });

