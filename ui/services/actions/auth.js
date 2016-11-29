
const http = require('../http')

const actions = {
    auth: {
        LOGIN: 'login',
        LOGOUT: 'logout'
    },
    login,
    logout,
    doLogin
}

function login (credentials){
    return {
        type: actions.auth.LOGIN,
        credentials
    }
}

function logout(list){
    return {
        type: actions.auth.LOGOUT
    }
}

function doLogin(credentials){
    http.post('http://localhost:3333/login', credentials)
    .then(response=>{
        console.log('login', response)
    })
    .catch(err=>{
        console.log('login error', err)
    })
}

module.exports = actions