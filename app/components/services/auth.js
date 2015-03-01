angular.module('bconfApp').factory('Auth', function($q, $http){
  return{
    getToken: function(){
      return localStorage.getItem('token')
    },
    setToken: function(token){
      localStorage.setItem('token', token);
    },
    logout:function(){
      var deferred = $q.defer();
      $http.post('logout').success(function () {
        localStorage.removeItem('token');
        deferred.resolve();
      }).error(function () {
        localStorage.removeItem('token');
        deferred.resolve();
      });
      return deferred.promise;
    }
  };
});
