export default function ($q, $http) {
  var user = {};
  var friends = [];
  return {
    get: function () {
      return user;
    },
    set: function (newUser) {
      user = newUser;
    },
    getUserInfo: function (userId) {
      var deferred = $q.defer();
      $http.get('user/' + userId).success(function (newUser) {
        user = newUser;
        deferred.resolve(user);
      }).error(function () {
        deferred.reject();
      });
      return deferred.promise;
    },

    getFriends: function (userId) {
      var deferred = $q.defer();
      if (_.isEmpty(friends)) {
        $http.get('user/' + userId + '/friends').success(function (friendsList) {
          friends = friendsList;
          deferred.resolve(friends);
        }).error(function () {
          deferred.reject();
        });
      } else {
        deferred.resolve(friends);
      }
      return deferred.promise;
    },
    getContact: function(contactId){
      var result = {};
      friends.forEach(function(friend){
        if(friend.id == contactId){
          result = friend;
        }
      });
        return result;
    }
  };
};
