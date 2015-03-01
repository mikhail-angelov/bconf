'use strict';

angular.module('bconfApp')
  .controller('MainController', function ($scope, $state, $stateParams, Auth, User) {


    if ($stateParams && $stateParams.token) {
      Auth.setToken($stateParams.token);
      User.storeUserId($stateParams.user);
      loadUser();
    } else if (Auth.getToken()) {
      loadUser();
    } else {
      $state.go('welcome');
    }

    function loadUser() {
      var userId = User.getUserId();
      User.query(userId).then(function () {
        $scope.user = User.get();
      });
    }

    $scope.onLogout = function(){
      Auth.logout();
      $state.go('welcome');
    };
  });
