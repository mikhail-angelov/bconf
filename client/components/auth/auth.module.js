'use strict';

import _restServices from '../restServices/restServices.module.js'

import authInterceptor from './interceptor.service.js'
import AuthService from './auth.service.js'

angular.module('auth.module', [
    'ngCookies',
    'restServices.module',
    'ui.router'
])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    })
    .factory('authInterceptor', authInterceptor)
    .factory('Auth', AuthService)

    .run(function ($rootScope, $state, Auth) {
        // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
        $rootScope.$on('$stateChangeStart', function (event, next) {
            if (next.authenticate && !Auth.isLoggedIn()) {
                $state.go('login')
            }
        });

        //redirect to auth state
        Auth.validateAuthState()
            .then(()=>$state.go('redirect'));
    });


