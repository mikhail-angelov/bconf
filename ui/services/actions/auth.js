
const http = require('../http')

const actions = {
    auth: {
        LOGIN: 'login',
        LOGOUT: 'logout',
        LOGIN_COMPLETE: 'loginComplete',
        LOGOUT_COMPLETE: 'logoutComplete'
    },
    login,
    logout,
    loginComplete,
    logoutComplete,
    loginGuest
}

function logoutComplete (){
    return {
        type: actions.auth.LOGOUT_COMPLETE
    }
}

function logout (user){
    return function(dispatch, getState) {
        return http.post('http://localhost:3333/logout', {})
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

function loginComplete (user){
    return {
        type: actions.auth.LOGIN_COMPLETE,
        user
    }
}

function login (credentials, rememberMe) {  
  return function(dispatch, getState) {
    return http.post('http://localhost:3333/login', credentials)
      .then(function(result) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result));
            dispatch(loginComplete(result));
            if(rememberMe){
                localStorage.setItem('credentials', JSON.stringify(credentials))
            }
      })
      .catch(function(err) {
        console.log("Oops...", "Couldn't fetch repos for user: " + credentials, err);
      });
  }
}

function loginGuest () {  
  return function(dispatch, getState) {
    return http.post('http://localhost:3333/loginGuest')
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