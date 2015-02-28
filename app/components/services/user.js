angular.module('bconfApp').factory('User', function($q,$http){
  var user ={};
  return{
    get: function(){
      return user;
    },
    set: function(newUser){
      user = newUser;
    },
    query: function(userId){
      var deferred = $q.defer();
      $http.get('user',{id:userId}, function(newUser){
        user = newUser;
        deferred.resolve(user);
      });
      return deferred.promise;
    }
  };
});
