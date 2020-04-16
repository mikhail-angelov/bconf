import { ActionTypeEnum, AppThunk } from ".";
import { post, getWithAuth, setToken } from "./api";
import { UserDto } from "../store/types";

const AUTH_URL = "/api/settings";

export interface Credentials {
  username: string;
  password: string;
}
export type UserWithToken = UserDto & { token: string };

export const loginAction = (credentials: Credentials): AppThunk => {
  return async dispatch => {
    try {
      dispatch({ type: ActionTypeEnum.AuthRequest });
      const response = await post(`${AUTH_URL}/login`, credentials);
      const { token, ...user } = response.data;
      setToken(token);
      dispatch({
        type: ActionTypeEnum.AuthSuccess,
        payload: user
      });
    } catch (e) {
      console.log("login error", e);
      dispatch({
        type: ActionTypeEnum.AuthFailure,
        payload: "login failure"
      });
    }
  };
};

export const getUserAction = (): AppThunk => {
  return async dispatch => {
    try {
      dispatch({ type: ActionTypeEnum.AuthRequest });
      const response = await getWithAuth(`${AUTH_URL}/profile`);
      const { token, ...user } = response.data;
      setToken(token);
      dispatch({
        type: ActionTypeEnum.AuthSuccess,
        payload: user
      });
    } catch (e) {
      console.log("get profile error", e);
      dispatch({
        type: ActionTypeEnum.AuthFailure,
        payload: ""
      });
    }
  };
};

export const logoutAction = (): AppThunk => {
  return async dispatch => {
    setToken("");
    dispatch({ type: ActionTypeEnum.Logout });
  };
};