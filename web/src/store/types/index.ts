import { RouterState } from "connected-react-router";
import { AuthState } from "./auth";

export interface State {
  auth: AuthState;
  router: RouterState;
}

export * from "./auth";
