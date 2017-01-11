const actions = require('../actions/index.js')


function auth (state = {status:'done'}, action){
    switch(action.type){
        case actions.auth.LOGIN_COMPLETE:{
            return {
                user:action.user,
                status:'login'
            }
        }
        case actions.auth.LOGOUT_COMPLETE:{
            return {
                status:'done'    
            };
        }
        case actions.auth.LOGIN_ERROR:{
            return {
                status:'error'
            };
        }
        case actions.auth.LOGIN_REQUEST:{
            return {
                status:'progress'
            };
        }

        default:
            return state;
    }
}

module.exports = auth;
