import React, { Component } from 'react';
import { connect } from 'react-redux'
import Login from './Login/Login'
import Main from './Main/Main'
// import './App.css';

const Root = ({ authenticated }) => {
  if (!authenticated) {
    return <Login />
  } else {
    return <Main />
  }
}

const mapStateToProps = ({ auth }) => auth

export default connect(mapStateToProps)(Root)