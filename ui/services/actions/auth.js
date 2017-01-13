const config = require('../config')
const http = require('../http')

const actions = {
    auth: {
        LOGIN: 'login',
        LOGOUT: 'logout',
        LOGIN_COMPLETE: 'loginComplete',
        LOGOUT_COMPLETE: 'logoutComplete',
        LOGIN_ERROR: 'loginError',
        LOGIN_REQUEST: 'loginRequest'
    },
    login,
    logout,
    loginComplete,
    logoutComplete,
    loginGuest,
    loginError,
    loginRequest
}

function logoutComplete (){
    return {
        type: actions.auth.LOGOUT_COMPLETE
    }
}

function logout (user){
    return function(dispatch, getState) {
        return http.post(config.host+'local/logout', {})
        .then(function() {
            console.log('--')
            localStorage.setItem('token', "");
            localStorage.setItem('uiState', "");
            localStorage.setItem('user', "");
            dispatch(logoutComplete());
        })
        .catch(function(err) {
            console.log("Oops...", "Couldn't logout for user: " + user, err);
        });
  }
}

function login (credentials, rememberMe) {  
  return function(dispatch, getState) {
    dispatch(loginRequest());
    return http.post(config.host+'local/login', credentials)
      .then(function(result) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result));
            if(rememberMe){
                localStorage.setItem('credentials', JSON.stringify(credentials))
            }else{
                localStorage.setItem('credentials', "")
            }
            dispatch(loginComplete(result));
      })
      .catch(function(err) {
        console.log("Oops...", "Couldn't fetch repos for user: " + credentials, err);
        dispatch(loginError(err));
      });
  }
}

function loginComplete (user){
    return {
        type: actions.auth.LOGIN_COMPLETE,
        user
    }
}

function loginError (err){
    return {
        type: actions.auth.LOGIN_ERROR,
        err
    }
}
function loginRequest (){
    return {
        type: actions.auth.LOGIN_REQUEST,
    }
}

function loginGuest () {  
  return function(dispatch, getState) {
    return http.post(config.host+'local/loginGuest')
      .then(function(result) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result));
            dispatch(loginComplete(result));
      })
      .catch(function(err) {
        console.log("Oops...", "Couldn't fetch repos for user: " + err);
      });
  }
}

module.exports = actions