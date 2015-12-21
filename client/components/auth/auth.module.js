'use strict';

import authInterceptor from './interceptor.service.js'
import AuthService from './auth.service.js'
import UserResource from './user.service.js'

angular.module('bconfApp.auth', [
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })
  .factory('authInterceptor', authInterceptor)
  .factory('Auth', AuthService)
  .factory('User', UserResource)

  .run(function($rootScope, $state, Auth) {
    // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
    $rootScope.$on('$stateChangeStart', function(event, next) {
      if(next.authenticate && !Auth.isLoggedIn()) {
        $state.go('login')
      }
    });
  });


