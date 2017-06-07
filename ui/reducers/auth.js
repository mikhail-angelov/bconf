const actions = require('../actions')
const storage = require('../services/storage')

function auth(state = {
    user: storage.getUser(),
    status: 'done',
    error: null
}, action) {
    switch (action.type) {
        case actions.auth.LOGIN_COMPLETE: {
            return toLoginState(action, state)
        }
        case actions.auth.LOGIN_ERROR: {
            return Object.assign(toLogoutState(state),{
                error: action.err
            })
        }
        case actions.auth.LOGIN_REQUEST: {
            return Object.assign({},state,{
                status: 'progress',
                error: null
            })
        }
        case actions.auth.UPDATE_USER: {
            storage.setUser(action.user)
            return Object.assign({},state,{
                status: 'done',
                user:action.user,
                error: null
            })
        }
        case actions.auth.LOGOUT_COMPLETE: {
            return toLogoutState(state)
        }
        case actions.auth.FORGET_REQUEST_COMPLETE: {
            return Object.assign(toLogoutState(state),{
                error: 'forgetComplete'
            })
        }
        case actions.ui.SET_MENU: {
            return Object.assign(state,{
                error: null
            })
        }

        default:
            return state;
    }

    function toLoginState(action, state){
        storage.setUser(action.user)
        storage.setToken(action.token)
        return Object.assign({},state,{
            user: action.user,
            status: 'done',
            error: null
        })
    }

    function toLogoutState(state){
        storage.setUser(null)
        storage.setToken(null)
        return Object.assign({},state,{
            status: 'done',
            user:null,
            error: null
        })
    }
}

module.exports = auth;
