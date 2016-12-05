
const http = require('../http')

const actions = {
    auth: {
        LOGIN: 'login',
        LOGOUT: 'logout',
        LOGIN_COMPLETE: 'loginComplete'
    },
    login,
    logout,
    loginComplete
}

function logoutComplete (){
    return {
        type: actions.auth.LOGOUT_COMPLETE,
        user
    }
}

function logout (user){
    return function(dispatch, getState) {
    var state = getState();
    return http.post('http://localhost:3333/login', user)
      .then(function(result) {
          console.log('--', result)
          localStorage.set('token', null);
        dispatch(logoutComplete(result));
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


function login (credentials) {  
  return function(dispatch, getState) {
    var state = getState();
    
    //dispatch(loadingChangedAction(true));

    return http.post('http://localhost:3333/login', credentials)
      .then(function(result) {
          console.log('--', result)
        dispatch(loginComplete(result));
        localStorage.set('token', result.token);
      })
      .catch(function(err) {
        console.log("Oops...", "Couldn't fetch repos for user: " + credentials.user, err);
      });
  }
}

module.exports = actions