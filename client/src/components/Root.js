import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Login from './Auth/Login/Login'
import Register from './Auth/Register/Register'
import ResetPassword from './Auth/ResetPassword/ResetPassword'
import Main from './Main/Main'
import { LOGIN, REGISTER, RESET_PASSWORD } from '../constants/applicationState'

const authComponents = {}
authComponents[LOGIN] = <Login />
authComponents[REGISTER] = <Register />
authComponents[RESET_PASSWORD] = <ResetPassword />

@inject('authStore', 'uiStore')
@observer
export default class Root extends Component {
    render() {
        const { authStore, uiStore } = this.props
        if (!authStore.authenticated) {
            return authComponents[uiStore.state]
        } else {
            return <Main />
        }
    }
}
