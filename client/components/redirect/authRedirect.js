'use strict';

angular.module('bconfApp')
  .controller('AuthRedirectController', function ($scope, $state, $stateParams, Auth, User) {

    if ($stateParams && $stateParams.token && $stateParams.user) {
      Auth.storeToken($stateParams.token);
      Auth.storeUserId($stateParams.user);
    }
    $state.go('default');

  });
