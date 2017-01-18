const config = require('../config')
const http = require('../http')

const actions = {
    auth: {
        LOGIN: 'login',
        LOGOUT: 'logout',
        LOGIN_COMPLETE: 'loginComplete',
        LOGOUT_COMPLETE: 'logoutComplete',
        LOGIN_ERROR: 'loginError',
        LOGIN_REQUEST: 'loginRequest',
        UPDATE_USER: 'updateUserInfo',
        FORGET_REQUEST_COMPLETE:'forgetRequestComplete'
    },
    login,
    logout,
    loginComplete,
    logoutComplete,
    loginGuest,
    loginError,
    loginRequest,
    signUp,
    forgetPassword,
    updateUser,
    ensureUserInfo
}

function logoutComplete() {
    return {
        type: actions.auth.LOGOUT_COMPLETE
    }
}

function logout() {
    return (dispatch, getState) => {
        dispatch(logoutComplete());
        return http.post(config.host + 'auth/local/logout', {})
            .then(() => console.log('logout is completed'))
            .catch( err => {
                console.log("Oops...", "Couldn't logout ",  err);
            });
    }
}

function login(credentials, rememberMe) {
    return function (dispatch, getState) {
        dispatch(loginRequest());
        return http.post(config.host + 'auth/local/login', credentials)
            .then(function (result) {

                if (rememberMe) {
                    localStorage.setItem('credentials', JSON.stringify(credentials))
                } else {
                    localStorage.setItem('credentials', "")
                }
                dispatch(loginComplete(result));
            })
            .catch(function (err) {
                console.log("Oops...", "Couldn't login user: " + credentials, err);
                dispatch(loginError(err));
            });
    }
}

function loginComplete(user) {
    return {
        type: actions.auth.LOGIN_COMPLETE,
        user,
        token: user.token
    }
}

function loginError(err) {
    return {
        type: actions.auth.LOGIN_ERROR,
        err
    }
}
function loginRequest() {
    return {
        type: actions.auth.LOGIN_REQUEST,
    }
}

function forgetComplete(url){
    return {
        type: actions.auth.FORGET_REQUEST_COMPLETE,
        url
    }
}

function loginGuest() {
    return (dispatch, getState) => {
        return http.post(config.host + 'auth/local/loginGuest')
            .then( result=>dispatch(loginComplete(result)))
            .catch(err => {
                console.log("Oops...", "login guest error: " + err)
                dispatch(loginError(err))
            });
    }
}

function signUp(newUser) {
    return (dispatch, getState) => {
        return http.post(config.host + 'auth/local/signUp',newUser)
            .then( result=>dispatch(loginComplete(result)))
            .catch(err => {
                console.log("Oops...", "Couldn't sign up user: " + err)
                dispatch(loginError(err))
            });
    }
}

function forgetPassword(email){
    return (dispatch, getState) => {
        return http.post(config.host + 'auth/local/forgetPassword',email)
            .then( result=>dispatch(forgetComplete(result)))
            .catch(err => {
                console.log("Oops...", "Couldn't sign up user: " + err)
                dispatch(loginError(err))
            });
    }
}

function updateUser(user) {
    return {
        type: actions.auth.UPDATE_USER,
        user
    }
}

function ensureUserInfo() {
    return function (dispatch, getState) {
        const user = getState().auth.user
        if(!user){
            return http.post(config.host + 'auth/local/userInfo')
                .then( result => {
                    dispatch(updateUser(result));
                })
                .catch(err => {
                    console.log("Oops...", "Couldn't fetch user: " + err)
                    dispatch(loginError(err))
                });
        }
    }
}

module.exports = actions