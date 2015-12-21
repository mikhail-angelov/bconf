angular.module('bconfApp').factory('Auth', function ($q, $http) {
  var userId = null;
  var token = null;
  return {
    getToken: function () {
      if (!token) {
        token = localStorage.getItem('token');
      }
      return token;
    },
    getUserId: function () {
      if (!userId) {
        userId = localStorage.getItem('userId');
      }
      return userId;
    },
    setToken: function (newToken) {
      token = newToken;
    },
    setUserId: function (newUserId) {
      userId = newUserId;
    },
    storeToken: function (token) {
      localStorage.setItem('token', token);
    },
    storeUserId: function (userId) {
      localStorage.setItem('userId', userId);
    },

    logout: function () {
      var deferred = $q.defer();
      $http.post('logout').success(function () {
        localStorage.removeItem('token');
        deferred.resolve();
      }).error(function () {
        localStorage.removeItem('token');
        deferred.resolve();
      });
      return deferred.promise;
    },
    getGuestUserInfo: function (refer, sharedToken) {
      var deferred = $q.defer();
      var data = {
        refer: refer,
        sharedToken: sharedToken
      };
      $http.post('user/createGuest', data).success(function (newUser) {
        user = newUser;
        deferred.resolve(user);
      }).error(function () {
        deferred.reject();
      });
      return deferred.promise;
    }
  };
});
