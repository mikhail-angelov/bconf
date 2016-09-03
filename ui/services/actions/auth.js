
const actions = {
    auth: {
        LOGIN: 'login',
        LOGOUT: 'logout'
    },
    login,
    logout
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

module.exports = actions