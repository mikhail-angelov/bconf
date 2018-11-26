import {
  AUTH_USER, DEAUTH_USER,
} from '../constants/actions'
import { LOGIN_URL, REGISTER_URL, doAuthRequest, setAuth, doJsonRequest } from './helper'

export const login = ({ email, password }) => {
  return (dispatch) =>
    doAuthRequest({
      url: LOGIN_URL,
      method: 'POST',
      data: { email, password },
    })
      .then((data) => {
        setAuth(data)
        return dispatch({ type: AUTH_USER, payload: { name: email } })
      })
      .catch(e => {
        console.log('auth error', e)
        return dispatch({ type: DEAUTH_USER, payload: e })
      })
}

export const logout = () => {
  return (dispatch) => {
    setAuth({})
    dispatch({ type: DEAUTH_USER })
  }
}

export const register = ({ email, password }) => {
  return (dispatch) => {
    doJsonRequest({ url: REGISTER_URL, method: 'POST', data: { email, password } })
      .then(data => {
        setAuth(data)
        return dispatch({ type: AUTH_USER, payload: { name: email } })
      })
      .catch(e => {
        console.log('register error', e)
        return dispatch({ type: DEAUTH_USER, payload: e })
      })
  }
}

export const resetPassword = (email) => {
  return (dispatch) => {
    // todo: add reset url
  }
}
