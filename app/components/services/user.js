angular.module('bconfApp').factory('User', function ($q, $http) {
  var user = {};
  return {
    get: function () {
      return user;
    },
    set: function (newUser) {
      user = newUser;
    },
    query: function (userId) {
      var deferred = $q.defer();
      $http.get('user/' + userId).success(function (newUser) {
        user = newUser;
        deferred.resolve(user);
      }).error(function () {
        deferred.reject();
      });
      return deferred.promise;
    }
  };
});
