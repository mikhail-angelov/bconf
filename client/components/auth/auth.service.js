'use strict';


export default function AuthService($http, $q, appConfig, User, EventBus) {
    var currentUser = null;
    var userRoles = appConfig.userRoles || [];
    var isAuthenticated = false;


    var Auth = {

        login: function (user) {
            return $http.post('/auth/local', {
                email: user.email,
                password: user.password
            })
                .then((res) => {
                    Auth.storeToken(res.data.token);
                    isAuthenticated = true;
                    return this._loadCurrentUser();
                });
        },
        loginGuest: function (params) {
            return $http.post('/auth/local/guest', params)
                .then(res => {
                    Auth.storeToken(res.data.token);
                    isAuthenticated = true;
                    return this._loadCurrentUser();
                });
        },


        logout: function () {
            Auth.storeToken(null);
            currentUser = null;
        },


        createUser: function (user) {
            return User.save(user)
                .then(response=> {
                    Auth.storeToken(response.data.token)
                    return this._loadCurrentUser();
                })
                .catch(err=> {
                    Auth.logout();
                    return null;
                });
        },

        changePassword: function (oldPassword, newPassword) {
            return User.changePassword({id: currentUser._id}, {
                oldPassword: oldPassword,
                newPassword: newPassword
            });
        },

        validateAuthState: function () {
            var token = localStorage.getItem('token');
            if(token) {
                return this._loadCurrentUser().then(()=>isAuthenticated = true);
            }else{
                return $q.reject();
            }
        },

        isLoggedIn: function (role) {
            return isAuthenticated;
        },


        hasRole: function (role) {
            var hasRole = function (r, h) {
                return userRoles.indexOf(r) >= userRoles.indexOf(h);
            };

            if (arguments.length < 2) {
                return hasRole(currentUser.role, role);
            }

            return this._loadCurrentUser()
                .then( (user)=> {
                    var has = (user.hasOwnProperty('role')) ?
                        hasRole(user.role, role) : false;
                    return has;
                });
        }
        ,

        isAdmin: function () {
            return Auth.hasRole
                .apply(Auth, [].concat.apply(['admin'], arguments));
        }
        ,

        getToken: function () {
            return localStorage.getItem('token');
        }
        ,

        storeToken: function (token) {
            token = token || '';
            localStorage.setItem('token', token);
        },

        bootstrap: function () {
            if (!isAuthenticated || Auth.getToken()) {
                return this._loadCurrentUser().then(()=> {
                    isAuthenticated = true;
                    return isAuthenticated;
                })
            } else {
                return $q.when(isAuthenticated);
            }
        },
        _loadCurrentUser: function () {
            return User.get().then(user=> {
                EventBus.emit(EventBus.profile.LOAD, user);
                return user;
            });
        }
    };

    return Auth;
}

