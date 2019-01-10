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
            name: '',
            password: '',
            strongPassword: true,
        }
    }
    validatePassword(password) {
        const passwordRegexp = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/)
        password.length > 8 && passwordRegexp.test(password)
            ? this.setState({ strongPassword: true, password })
            : this.setState({ strongPassword: false, password })
    }

    onChange(field) {
        return e => {
            if (field === 'password') {
                this.validatePassword(e.target.value)
            } else {
                this.setState({ [field]: e.target.value })
            }
        }
    }

    render() {
        const { email, name, password } = this.state
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
                    <input className="name-input" value={name} onChange={this.onChange('name')} />
                    <input
                        type="password"
                        className="password-input"
                        value={password}
                        onChange={this.onChange('password')}
                    />
                    {!this.state.strongPassword && (
                        <div className="register-error">
                            Password must contain at least one number, one lowercase and one uppercase letter and be at
                            least six characters
                        </div>
                    )}
                    <button
                        className="register-button"
                        onClick={() => authStore.register({ email, name, password })}
                        disabled={!(this.state.password.length > 0 && this.state.strongPassword)}
                    >
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
