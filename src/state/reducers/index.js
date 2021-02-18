import { combineReducers } from "redux";
import activeBidReducer from "./activeBid";
import exchangeRateReducer from "./exchangeRate";
import historyReducer from "./history";

const rootReducer = combineReducers({
  activeBid: activeBidReducer,
  exchangeRate: exchangeRateReducer,
  history: historyReducer,
});

export default rootReducer;
