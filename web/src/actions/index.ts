import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { State } from "../store/types";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, State, unknown, Action<string>>;

export enum ActionTypeEnum {
  // auth
  AuthRequest = "auth/AUTH_REQUEST",
  AuthSuccess = "auth/AUTH_SUCCESS",
  AuthFailure = "auth/AUTH_FAILURE",
  Logout = "auth/LOGOUT",

}