'use strict';

export default function() {
    return {
      templateUrl: 'components/oauth-buttons/oauth-buttons.html',
      restrict: 'EA',
      controller: function($window) {
        this.loginOauth = function(provider) {
          $window.location.href = '/auth/' + provider;
        };
      },
      controllerAs: 'OauthButtons',
      scope: {
        classes: '@'
      }
    };
  };