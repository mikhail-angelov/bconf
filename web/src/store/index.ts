import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

import history from "./history";
import createRootReducer from "../reducers";

const middleware = [routerMiddleware(history), thunk];

export default function configureStore() {
  const composeEnhancer: typeof compose =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(createRootReducer(history), composeEnhancer(applyMiddleware(...middleware)));
  return { store };
}