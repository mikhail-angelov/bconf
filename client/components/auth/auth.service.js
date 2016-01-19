'use strict';


export default function AuthService($http, $q, appConfig, UserServiceRest, EventBus, $cookies) {
    var currentUser = null;
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
                    return this._loadCurrentUserAndCompleteAuth();
                });
        },
        loginGuest: function (params) {
            return $http.post('/auth/local/guest', params)
                .then(res => {
                    Auth.storeToken(res.data.token);
                    isAuthenticated = true;
                    return this._loadCurrentUserAndCompleteAuth();
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
                    return this._loadCurrentUserAndCompleteAuth();
                })
                .catch(err=> {
                    Auth.logout();
                    return null;
                });
        },

        changePassword: function (oldPassword, newPassword) {
            return UserServiceRest.changePassword({id: currentUser._id}, {
                oldPassword: oldPassword,
                newPassword: newPassword
            });
        },

        validateAuthState: function () {
            var token = $cookies.get('token');
            if(token){
                localStorage.setItem('token', token);
            }
            token = localStorage.getItem('token');
            if(token) {
                return this._loadCurrentUserAndCompleteAuth();
            }else{
                return $q.reject();
            }
        },

        isLoggedIn: function (role) {
            return isAuthenticated;
        },

        getToken: function () {
            return localStorage.getItem('token');
        },

        storeToken: function (token) {
            token = token || '';
            localStorage.setItem('token', token);
            $cookies.remove('token');
        },
        
        _loadCurrentUserAndCompleteAuth: function () {
            return UserServiceRest.get().then(user=> {
                isAuthenticated = true;
                EventBus.emit(EventBus.profile.LOAD, user);
                EventBus.emit(EventBus.auth.IN);
                return user;
            });
        }
    };

    return Auth;
}

