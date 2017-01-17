const actions = require('../actions/index.js')
const storage = require('../storage')

function auth(state = {
    user: storage.getUser(),
    status: 'done'
}, action) {
    switch (action.type) {
        case actions.auth.LOGIN_COMPLETE: {
            storage.setUser(action.user)
            return Object.assign({},state,{
                user: action.user,
                status: 'done'
            })
        }
        case actions.auth.LOGIN_ERROR: {
            return Object.assign({},state,{
                status: 'error'
            })
        }
        case actions.auth.LOGIN_REQUEST: {
            return Object.assign({},state,{
                status: 'progress'
            })
        }
        case actions.auth.UPDATE_USER: {
            storage.setUser(action.user)
            return Object.assign({},state,{
                status: 'done',
                user:action.user
            })
        }
        case actions.auth.LOGOUT_COMPLETE: {
            storage.setUser(null)
            storage.setToken(null)
            return Object.assign({},state,{
                status: 'done',
                user:null
            })
        }

        default:
            return state;
    }
}

module.exports = auth;
