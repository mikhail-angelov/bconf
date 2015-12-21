'use strict';



export default function authInterceptor($rootScope, $q, $injector, Util) {
  var state;
  return {
    // Add authorization token to headers
    request: function(config) {
      config.headers = config.headers || {};
      var token = localStorage.getItem('token');
      if (token && Util.isSameOrigin(config.url)) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError: function(response) {
      if (response.status === 401) {
        (state || (state = $injector.get('$state'))).go('login');
        // remove any stale tokens
        localStorage.setItem('token', null);
      }
      return $q.reject(response);
    }
  };
}

