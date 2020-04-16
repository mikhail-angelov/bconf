import { createSelector } from "reselect";
import { AuthState, State } from "../store/types";
import { ActionTypeEnum } from "../actions";
import { createReducer } from "./reducer-utils";
import { UserDto } from "../store/types";

const initialState: AuthState = Object.freeze({
  isRequestInProgress: false,
  authenticated: false
});

export default createReducer<AuthState>(initialState, {
  [ActionTypeEnum.AuthRequest]: () => state => ({
    ...state,
    isRequestInProgress: true,
    error: ""
  }),
  [ActionTypeEnum.AuthSuccess]: (user: UserDto) => state => ({
    ...state,
    isRequestInProgress: false,
    authenticated: true,
    user,
    error: ""
  }),
  [ActionTypeEnum.AuthFailure]: (error: string) => state => ({
    ...state,
    isRequestInProgress: false,
    authenticated: false,
    user: undefined,
    error
  }),
  [ActionTypeEnum.Logout]: () => state => ({
    ...state,
    isRequestInProgress: false,
    authenticated: false,
    user: undefined,
    error: ""
  }),
  
});

export const selectAuth = (state: State) => state.auth;
export const selectAuthenticated = createSelector(
  selectAuth,
  state => state.authenticated
);
export const selectIsAuthRequestInProgress = createSelector(
  selectAuth,
  state => state.isRequestInProgress
);
export const selectUser = createSelector(selectAuth, state => state.user);
export const selectAuthError = createSelector(selectAuth, state => state.error);