'use strict';

import  SignupController from './signup/signup.controller.js'
import SettingsController from './settings/settings.controller.js'
import LoginController from './login/login.controller.js'

angular.module('bconfApp.account', [])
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'web/account/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('logout', {
        url: '/logout?referrer',
        referrer: 'main',
        template: '',
        controller: function ($state, Auth) {
          var referrer = $state.params.referrer ||
            $state.current.referrer ||
            'main';
          Auth.logout();
          $state.go(referrer);
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'web/account/signup/signup.html',
        controller: 'SignupController',
        controllerAs: 'vm'
      })
      .state('changePassword', {
        url: '/change-password',
        templateUrl: 'web/account/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        authenticate: true
      });
  })
  .controller('SignupController', SignupController)
  .controller('SettingsController', SettingsController)
  .controller('LoginController', LoginController)
  .run(function ($rootScope) {
    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, current) {
      if (next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  });
