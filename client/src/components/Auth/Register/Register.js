import React, { Component } from 'react';
import { connect } from 'react-redux'

import { register } from '../../../actions/auth'
import { setUiState } from '../../../actions/ui'

import { LOGIN } from '../../../constants/applicationState'

import './Register.css'

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

    return (
      <div className="register">
        <div className="register-wrapper">
          <div className="register-title">BCONF</div>
          <div className="register-subtitle">best chat</div>
          <div className="register-social-icons-wrapper">
            <button className="icon-button linkedin" onClick={() => console.log('login with social network')} />
            <button className="icon-button facebook" />
            <button className="icon-button github" />
          </div>
          <input className="email-input" value={email} onChange={this.onChange('email')} />
          <input type="password" className="password-input" value={password} onChange={this.onChange('password')} />
          <button className="register-button" onClick={() => this.props.register({ email, password })}>Register</button>
          <div className="text-buttons-wrapper">
            <button className="text-button" onClick={() => this.props.setUiState(LOGIN)}>Already a memeber? Sign in!</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => auth
const mapDispatchToProps = {
  register,
  setUiState,
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)