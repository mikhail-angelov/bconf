import axios from 'axios'

export const BASE_URL = '/api/'
export const LOGIN_URL = `${BASE_URL}auth/login`
export const REGISTER_URL = `${BASE_URL}auth/register`
export const CHAT_URL = `${BASE_URL}chat`
export const FIND_USERS_URL = `${BASE_URL}users/search/`

export const auth = {}
export const setAuth = ({ username, password }) => {
  auth.username = username
  auth.password = password
}

export const doAuthRequest = opts => axios(opts).then(response => response.data)

export const doJsonGetRequest = (url, opts = {}) => {
  return axios.get(url).then(response => response.data)
}

export const doJsonAuthRequest = async opts => {
  const token = await getToken()
  opts = { ...opts, headers: { authorization: token } }
  return axios(opts).then(response => response.data)
}

export const getToken = async () => {
  const auth = await localStorage.getItem('bconf')
  const localAuth = JSON.parse(auth)
  console.log('auth', localAuth)
  return localAuth.token
}

export const doJsonRequest = opts => {
  return axios(opts).then(response => response.data)
}
