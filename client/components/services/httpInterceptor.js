export default function ($q) {
  return {
    'request': function (config) {
      var token = localStorage.getItem('token');
      if(token) {
        config.headers['token'] = token;
      }
      return config;
    },

    'requestError': function (rejection) {
      return $q.reject(rejection);
    },

    'response': function (response) {
      return response;
    },

    'responseError': function (rejection) {
      if (rejection.code == 401) {
        console.log('auth is needed')
      }
      return $q.reject(rejection);
    }
  };
};
