import React, { Component } from 'react';
import { connect } from 'react-redux'

import { resetPassword } from '../../../actions/auth'
import { setUiState } from '../../../actions/ui'

import { LOGIN } from '../../../constants/applicationState'

import './ResetPassword.css'

class ResetPassword extends Component {
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

    return (
      <div className="reset-password">
        <div className="reset-password-wrapper">
          <div className="reset-password-title">BCONF</div>
          <div className="reset-password-subtitle">best chat</div>
          <input className="email-input" value={email} onChange={this.onChange('email')} />
          <button className="reset-password-button" onClick={() => this.props.resetPassword(email)}>Reset password</button>
          <div className="text-buttons-wrapper">
            <button className="text-button" onClick={() => this.props.setUiState(LOGIN)}>or Sign In</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => auth
const mapDispatchToProps = {
  resetPassword,
  setUiState,
}
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)