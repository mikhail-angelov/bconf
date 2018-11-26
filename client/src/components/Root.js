import React, { Component } from 'react';
import { connect } from 'react-redux'
import Login from './Auth/Login/Login'
import Register from './Auth/Register/Register'
import ResetPassword from './Auth/ResetPassword/ResetPassword'
import Main from './Main/Main'
import { LOGIN, REGISTER, RESET_PASSWORD } from '../constants/applicationState'

const authComponents = {}
authComponents[LOGIN] = <Login />
authComponents[REGISTER] = <Register />
authComponents[RESET_PASSWORD] = <ResetPassword />

const Root = ({ authenticated, applicationState }) => {
  if (!authenticated) {
    return authComponents[applicationState]
  } else {
    return <Main />
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    applicationState: state.ui.state,
  }
}

export default connect(mapStateToProps)(Root)