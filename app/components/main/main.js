'use strict';

angular.module('bconfApp')
  .controller('MainController', function ($scope, $location) {
    $scope.authProviders = [
      {redirect: '/auth/facebook', icon: 'styles/icons/set/facebook fb social social media.svg', color: 'color:#00f;'},
      {redirect: '/auth/google', icon: 'styles/icons/set/google plus.svg', color: 'color:#f00;'},
      {redirect: '/auth/yandex', icon: 'styles/icons/set/yandex.svg', color: 'color:#fd2;'}
    ];
    $scope.login = function (index) {
      $location.path($scope.authProviders[index].redirect);
    };
  });
