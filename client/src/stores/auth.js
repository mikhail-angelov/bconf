import { observable, flow, action } from 'mobx'
import { LOGIN_URL, REGISTER_URL, doAuthRequest, setAuth, doJsonRequest } from './helper'

export default class Auth {
    @observable authenticated = false
    @observable user = {}
    @observable state = 'pending'

    login = flow(function*({ email, password }) {
        this.state = 'pending'
        try {
            const data = yield doAuthRequest({
                url: LOGIN_URL,
                method: 'POST',
                data: { email, password },
            })
            console.log('--', data)
            this.authenticated = true
            this.user = data.user
            this.state = 'done'
            localStorage.setItem('bconf', JSON.stringify({ user: data.user, token: data.token }))
            setAuth(data)
        } catch (err) {
            console.log('auth error', err)
            this.state = 'error'
        }
    })

    @action
    relogin = userData => {
        this.authenticated = true
        this.user = userData.user
        this.state = 'done'
        setAuth(userData)
    }
    logout = () => {
        setAuth({})
        this.authenticated = false
        localStorage.removeItem('bconf')
    }

    register = flow(function*({ email, name, password }) {
        this.state = 'pending'
        try {
            const data = yield doJsonRequest({
                url: REGISTER_URL,
                method: 'POST',
                data: { email, name, password },
            })
            console.log('--', data)
            this.authenticated = true
            this.user = data.user
            this.state = 'done'
            console.log(data)
            setAuth(data)
        } catch (err) {
            console.log('auth error', err)
            this.state = 'error'
        }
    })

    resetPassword = flow(function*({ email }) {
        this.state = 'pending'
        try {
            //todo
            this.state = 'done'
        } catch (err) {
            console.log('auth error', err)
            this.state = 'error'
        }
    })
}
