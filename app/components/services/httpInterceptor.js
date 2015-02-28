angular.module('bconfApp').factory('HttpInterceptor', function(Auth){
  return{
    'request': function(config) {
      config.headers['token'] = Auth.getToken();
      return config;
    },

    'requestError': function(rejection) {
      return $q.reject(rejection);
    },

    'response': function(response) {
      return response;
    },

    'responseError': function(rejection) {
      if (rejection.code == 401) {
        console.log('auth is needed')
      }
      return $q.reject(rejection);
    }
  };
});
