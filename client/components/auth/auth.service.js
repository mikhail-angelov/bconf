'use strict';



export default function AuthService($http, $q, appConfig, User) {
  var currentUser = null;
  var userRoles = appConfig.userRoles || [];
  var isAuthenticated = false;


  var Auth = {

    login: function(user, callback) {
      return $http.post('/auth/local', {
        email: user.email,
        password: user.password
      })
      .then(function(res) {
          Auth.storeToken(res.data.token);
          isAuthenticated = true;
          return User.get().then(user=>{
            currentUser = user;
            return currentUser;
          });
      })
      .catch(function(err) {
        Auth.logout();
        return null;
      });
    },


    logout: function() {
      Auth.storeToken(null);
      currentUser = null;
    },


    createUser: function(user) {
      return User.save(user,
        function(data) {
          Auth.storeToken(data.token)
          return User.get().then(user=>{
            currentUser = user;
            return currentUser;
          });
        },
        function(err) {
          Auth.logout();
          return null;
        });
    },

    changePassword: function(oldPassword, newPassword) {
      return User.changePassword({ id: currentUser._id }, {
        oldPassword: oldPassword,
        newPassword: newPassword
      });
    },

    getCurrentUser: function() {
      if(currentUser){
        return $q.when(currentUser);
      }else {
        return User.get().then(user=> {
          currentUser = user;
          return currentUser;
        });
      }
    },

    isLoggedIn: function(role) {
      return isAuthenticated;
    },


    hasRole: function(role, callback) {
      var hasRole = function(r, h) {
        return userRoles.indexOf(r) >= userRoles.indexOf(h);
      };

      if (arguments.length < 2) {
        return hasRole(currentUser.role, role);
      }

      return Auth.getCurrentUser(null)
        .then(function(user) {
          var has = (user.hasOwnProperty('role')) ?
            hasRole(user.role, role) : false;
          return has;
        });
    },

    isAdmin: function() {
      return Auth.hasRole
        .apply(Auth, [].concat.apply(['admin'], arguments));
    },

    getToken: function() {
      return localStorage.getItem('token');
    },

    storeToken: function (token) {
      localStorage.setItem('token', token);
    },

    bootstrap: function(){
      if(!isAuthenticated || Auth.getToken()){
        return Auth.getCurrentUser().then(()=>{
          isAuthenticated = true;
          return isAuthenticated;
        })
      }else{
        return $q.when(isAuthenticated);
      }
    }
  };

  return Auth;
}

