'use strict';

angular.module('bconfApp')
  .controller('RedirectController', function ($scope, $state, $stateParams, Auth, User) {

    if ($stateParams && $stateParams.token && $stateParams.user) {
      Auth.setToken($stateParams.token);
      User.storeUserId($stateParams.user);
    }
    $state.go('default');

  });

