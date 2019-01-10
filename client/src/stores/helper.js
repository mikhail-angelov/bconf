import axios from 'axios'

export const BASE_URL = '/api/'
export const LOGIN_URL = `${BASE_URL}auth/login`
export const REGISTER_URL = `${BASE_URL}auth/register`

export const auth = {}
export const setAuth = ({ username, password }) => {
  auth.username = username
  auth.password = password
}

export const doAuthRequest = opts => axios(opts).then(response => response.data)

export const doJsonGetRequest = (url, opts = {}) => {
  return axios.get(url).then(response => response.data)
}

export const doJsonRequest = opts => {
  const request = { ...opts, auth }
  return axios(request).then(response => response.data)
}
