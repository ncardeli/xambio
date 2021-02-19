import { combineReducers } from "redux";
import activeBidReducer from "./activeBid";
import authReducer from "./auth";
import exchangeRateReducer from "./exchangeRate";
import historyReducer from "./history";

const rootReducer = combineReducers({
  activeBid: activeBidReducer,
  auth: authReducer,
  exchangeRate: exchangeRateReducer,
  history: historyReducer,
});

export default rootReducer;
