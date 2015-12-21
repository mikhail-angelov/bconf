'use strict';

import  _util from '../components/util/util.module.js'
import _auth from '../components/auth/auth.module.js'
import _constatnts from './app.constant.js'
import _account from './account/account.js'

import constant from '../components/common/constants.js'
import MainController from './main/main.controller.js'
import oauthButtons from '../components/oauth-buttons/oauth-buttons.directive.js'
import VoiceCallController from './voiceCall/voiceCall.js'
import ChatController from './chat/chatController.js'
import RedirectController from '../components/redirect/redirect.js'
import ChatModel from '../components/models/chatModel.js'
import ContactsModel from '../components/models/contactsModel.js'
import Peer from '../components/services/peerjs.js'
import Audio from '../components/services/audio.js'
import HttpInterceptor from '../components/services/httpInterceptor.js'
import Property from '../components/services/properties.js'


angular.module('bconfApp', [
  'bconfApp.util',
  'bconfApp.auth',
  'bconfApp.constants',
  'bconfApp.account',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'validation.match',
  'ngMaterial'
])
  .constant('constant', constant)
  .controller('MainController', MainController)
  .controller('VoiceCallController', VoiceCallController)
  .controller('ChatController', ChatController)
  .controller('RedirectController', RedirectController)
  .directive('oauthButtons', oauthButtons)
  .factory('ChatModel', ChatModel)
  .factory('ContactsModel', ContactsModel)
  .factory('Peer', Peer)
  .factory('Audio', Audio)
  .factory('HttpInterceptor', HttpInterceptor)
  .factory('Property', Property)


  .config(function ($urlRouterProvider, $locationProvider, $stateProvider, $mdThemingProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('redirect', {
        template: '<div></div>',
        controller: 'RedirectController'
      })
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('chat', {
        url: '/chat',
        templateUrl: 'app/chat/chat.html',
        controller: 'ChatController',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('voiceCall', {
        url: '/voice-cal',
        templateUrl: 'app/voiceCall/voiceCall.html',
        controller: 'VoiceCallController',
        controllerAs: 'vm',
        authenticate: true
      });

    $mdThemingProvider.theme('default')
      .primaryPalette('pink')
      .accentPalette('orange');
  });

