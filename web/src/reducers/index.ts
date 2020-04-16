import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import auth from "./auth-reducer";

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth,
  } as any);

export default rootReducer;