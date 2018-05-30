import {
  SET_STATE,
} from '../constants/actions'


export const setUiState = (state) => (dispatch) => {
  dispatch({ type: SET_STATE, payload: state })
}