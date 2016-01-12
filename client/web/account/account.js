'use strict';

import LoginController from './login/login.controller.js'
import LoginGuestController from './loginGuest/loginGuest.controller.js'

angular.module('bconfApp.account', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                templateUrl: 'web/account/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .state('loginGuest', {
                templateUrl: 'web/account/loginGuest/loginGuest.html',
                controller: 'LoginGuestController',
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
            });
    })
    .controller('LoginController', LoginController)
    .controller('LoginGuestController', LoginGuestController)
    .run(function ($rootScope) {
        $rootScope.$on('$stateChangeStart', function (event, next, nextParams, current) {
            if (next.name === 'logout' && current && current.name && !current.authenticate) {
                next.referrer = current.name;
            }
        });
    });
