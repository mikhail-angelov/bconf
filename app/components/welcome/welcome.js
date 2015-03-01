'use strict';

angular.module('bconfApp')
  .controller('WelcomeController', function ($scope, $location) {
    $scope.authProviders = [
      {redirect: '/auth/facebook', icon: 'styles/icons/set/facebook fb social social media.svg', class: 'blue'},
      {redirect: '/auth/google', icon: 'styles/icons/set/google plus.svg', class: 'red'},
      {redirect: '/auth/yandex', icon: 'styles/icons/set/yandex.svg', class: 'yellow'}
    ];

    $scope.onLogin = function(index){
      //$location.path( $scope.authProviders[index].redirect)
console.log(index);
    }
  });
