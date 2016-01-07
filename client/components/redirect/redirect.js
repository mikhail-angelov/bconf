'use strict';

class RedirectController {
  constructor($scope, $state, $stateParams, Auth) {

    if ($stateParams && $stateParams.sharedToken && $stateParams.refer) {
      Auth.getGuestUserInfo($stateParams.refer, $stateParams.sharedToken).then(function (guestInfo) {
        Auth.setUserId(guestInfo.id);
        Auth.setToken(guestInfo.accessToken);
        $state.go('main');
      }, function (err) {
        console.log('can not get guest info, refer: ' + $stateParams.refer);
        $state.go('main');
      })
    } else {
      if (Auth.isLoggedIn()) $state.go('chat');
      else $state.go('main');
    }
  }
}

export default RedirectController;

