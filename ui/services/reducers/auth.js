const actions = require('../actions/index.js')




function auth (state = {
    firstName:'Guest',
    secondName:''
},action){
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
