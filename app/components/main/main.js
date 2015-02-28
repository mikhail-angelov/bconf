'use strict';

angular.module('bconfApp')
  .controller('MainController', function ($scope, $state, $stateParams, Auth, User) {


    if ($stateParams && $stateParams.token) {
      Auth.setToken($stateParams.token);
      loadUser();
    } else if (Auth.getToken()) {
      loadUser();
    } else {
      $state.go('welcome');
    }

    function loadUser() {
      User.query($stateParams.user).then(function () {
        $scope.user = User.get();
      });
    }
  });
