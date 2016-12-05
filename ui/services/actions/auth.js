
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
    logoutComplete
}

function logoutComplete (){
    return {
        type: actions.auth.LOGOUT_COMPLETE
    }
}

function logout (user){
    return function(dispatch, getState) {
<<<<<<< HEAD
    return http.post('http://localhost:3333/logout', {})
      .then(function() {
          console.log('--')
        dispatch(logoutComplete());
=======
    var state = getState();
    return http.post('http://localhost:3333/login', user)
      .then(function(result) {
          console.log('--', result)
          localStorage.set('token', null);
        dispatch(logoutComplete(result));
>>>>>>> 003c0363f06182ef2931f1a6584c800f85bc1567
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