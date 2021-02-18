import { applyMiddleware, createStore, compose } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";

const logger = createLogger();
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(logger))
);

export default store;
