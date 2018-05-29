import React, { Component } from 'react';
import { connect } from 'react-redux'

import { login, register } from '../../actions/auth'

import './Login.css'

class Login extends Component {
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
      <div className="login">
        <div className="login-wrapper">
          <div className="login-title">BCONF</div>
          <div className="login-subtitle">best chat</div>
          <div className="login-social-icons-wrapper">
            <button className="icon-button linkedin" onClick={() => console.log('login with social network')} />
            <button className="icon-button facebook" />
            <button className="icon-button github" />
          </div>
          <input className="email-input" value={email} onChange={this.onChange('email')} />
          <input className="password-input" type="password" value={password} onChange={this.onChange('password')} />
          <div className="login-error">
            Incorrect password. Try again.
          </div>
          <button className="login-button" onClick={() => this.props.login({ email, password })}>Sign In</button>
        </div >
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => auth
const mapDispatchToProps = {
  login,
  register,
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)