
const http = require('./http')

module.exports ={
    login,
    logout,
    forgotPassword,
    signIn,
    validate
}

function login(credentials){
    return http.post('/login', credentials);
}

function logout(){
    return http.post('/logpout')
}

function forgotPassword(email){

}

function signIn(credentials){

}

function validate(token){

}