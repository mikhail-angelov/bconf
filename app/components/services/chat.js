angular.module('bconfApp').factory('Chat', function ($q,$http, $interval,constant) {
  var list = [];


  var service = {
    getList: function () {
      var deferred = $q.defer();
      $http.get(constant.URL_TO_DISCOVER).success(function(response){
        list = response;
        deferred.resolve(list);
      });
      return deferred.promise;
    },
    poolList: function(cb){
      $interval(function(){
        service.getList().then(function(data){
          cb(data);
        })
      }, constant.CHAT_POOLING_INTERVAL);
    }
  };
  return service;
});
