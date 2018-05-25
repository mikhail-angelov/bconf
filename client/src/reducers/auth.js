import {
  AUTH_USER,
  DEAUTH_USER,
} from '../actions/constants'

const initialState = {
  bootstrapped: false,
  error: '',
  authenticated: false,
  user: {},
}

const auth = (state = initialState, action) => {

  switch (action.type) {
    case AUTH_USER: {
      const user = action.payload
      return { ...initialState, authenticated: true, bootstrapped: true, user }
    }
    case DEAUTH_USER: {
      return { ...initialState, bootstrapped: true, error: action.payload }
    }
    default:
      return state
  }
}

export default auth
