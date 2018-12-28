import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import { LOGIN } from '../../../constants/applicationState'
import './ResetPassword.css'

@inject('authStore', 'uiStore')
@observer
export default class ResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
    }
  }

  onChange(field) {
    return e => this.setState({ [field]: e.target.value })
  }

  render() {
    const { email } = this.state
    const { authStore, uiStore } = this.props

    return (
      <div className="reset-password">
        <div className="reset-password-wrapper">
          <div className="reset-password-title">BCONF</div>
          <div className="reset-password-subtitle">best chat</div>
          <input className="email-input" value={email} onChange={this.onChange('email')} />
          <button className="reset-password-button" onClick={() => authStore.resetPassword(email)}>Reset password</button>
          <div className="text-buttons-wrapper">
            <button className="text-button" onClick={() => uiStore.setUiState(LOGIN)}>or Sign In</button>
          </div>
        </div>
      </div>
    )
  }
}
