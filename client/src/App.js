import React, { Component } from 'react';
import { connect } from 'react-redux'
import { login, logout } from './actions/auth'
import './App.css';

class App extends Component {
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
      <div className="App">
        <input value={email} onChange={this.onChange('email')} />
        <br />
        <input type="password" value={password} onChange={this.onChange('password')} />
        <br />
        <div>{this.props.authenticated ? 'logged in' : 'logged out'}</div>
        <br />
        {this.props.authenticated ?
          <button onClick={() => this.props.logout()}>Logout</button> :
          <button onClick={() => this.props.login({ email, password })}>Login</button>}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => auth
const mapDispatchToProps = {
  login,
  logout,
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
