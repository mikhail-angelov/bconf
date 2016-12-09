const actions = require('../actions/index.js')

const user = localStorage.getItem('user');
const defaultUser = user?JSON.parse(user):{
    firstName:'Guest',
    secondName:''
}

function auth (state = defaultUser, action){
    switch(action.type){
        case actions.auth.LOGIN_COMPLETE:{
            return action.user;
        }
        case actions.auth.LOGOUT_COMPLETE:{
            return null;
        }

        default:
            return state;
    }
}

module.exports = auth;
