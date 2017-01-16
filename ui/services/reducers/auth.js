const actions = require('../actions/index.js')

const userSTR = localStorage.getItem('user') || "null";
const user = JSON.parse(userSTR);
const status = localStorage.getItem('status');
function auth (state = {
    user: user,
    status: status
    }, action){
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
