'use strict';

angular.module('bconfApp')
  .controller('RedirectController', function ($scope, $state, $stateParams, Auth, constant) {

    if ($stateParams && $stateParams.sharedToken && $stateParams.refer) {
      Auth.getGuestUserInfo($stateParams.refer, $stateParams.sharedToken).then(function (guestInfo) {
        Auth.setUserId(guestInfo.id);
        Auth.setToken(guestInfo.accessToken);
        $state.go('main');
      }, function (err) {
        console.log('can not get guest info, refer: ' + $stateParams.refer);
        $state.go('welcome');
      })
    } else {
      $state.go('welcome');
    }

  });

