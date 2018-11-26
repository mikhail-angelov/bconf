import {
  SET_STATE,
  DEAUTH_USER,
} from '../constants/actions'

import {
  LOGIN,
} from '../constants/applicationState'

const initialState = {
  state: LOGIN,
}

const ui = (state = initialState, action) => {

  switch (action.type) {
    case DEAUTH_USER: {
      return { ...state, state: LOGIN }
    }
    case SET_STATE: {
      return { ...state, state: action.payload }
    }
    default:
      return state
  }
}

export default ui