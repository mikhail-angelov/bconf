'use strict';

import  _util from '../components/util/util.module.js'
import _auth from '../components/auth/auth.module.js'

import _constatnt from './test.js'

import  _constatnts from './app.constant.js'
import  _account from './account/account.js'

import MainController from './main/main.controller.js'
import oauthButtons from '../components/oauth-buttons/oauth-buttons.directive.js'
import VoiceCallController from './voiceCall/voiceCall.js'
import ChatController from './chat/chatController.js'

console.log(_constatnt);

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
  .controller('MainController', MainController)
  .controller('VoiceCallController',VoiceCallController)
  .controller('ChatController', ChatController)
  .directive('oauthButtons',oauthButtons)

  .config(function($urlRouterProvider, $locationProvider,$stateProvider, $mdThemingProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    $stateProvider
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
        controllerAs: 'vm'
      })
      .state('voiceCall', {
        url: '/voice-cal',
        templateUrl: 'app/voiceCall/voiceCall.html',
        controller: 'VoiceCallController',
        controllerAs: 'vm'
      });

    $mdThemingProvider.theme('default')
      .primaryPalette('pink')
      .accentPalette('orange');
  });

