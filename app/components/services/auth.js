angular.module('bconfApp').factory('Auth', function(){
  return{
    getToken: function(){
      return localStorage.getItem('token')
    },
    setToken: function(token){
      localStorage.setItem('token', token);
    }
  };
});
