import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { LOGIN } from '../../../constants/applicationState'
import './Register.css'

@inject('authStore', 'uiStore')
@observer
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    onChange(field) {
        return e => this.setState({ [field]: e.target.value })
    }

    render() {
        const { email, password } = this.state
        const { authStore, uiStore } = this.props

        return (
            <div className="register">
                <div className="register-wrapper">
                    <div className="register-title">BCONF</div>
                    <div className="register-subtitle">best chat</div>
                    <div className="register-social-icons-wrapper">
                        <button
                            className="icon-button linkedin"
                            onClick={() => console.log('login with social network')}
                        />
                        <button className="icon-button facebook" />
                        <button className="icon-button github" />
                    </div>
                    <input className="email-input" value={email} onChange={this.onChange('email')} />
                    <input
                        type="password"
                        className="password-input"
                        value={password}
                        onChange={this.onChange('password')}
                    />
                    <button className="register-button" onClick={() => authStore.register({ email, password })}>
                        Register
                    </button>
                    <div className="text-buttons-wrapper">
                        <button className="text-button" onClick={() => uiStore.setUiState(LOGIN)}>
                            Already a memeber? Sign in!
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
