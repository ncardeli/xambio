import { combineReducers } from "redux";
import activeBidReducer from "../reducers/activeBid";
import exchangeRateReducer from "../reducers/exchangeRate";
import historyReducer from "./history";

const rootReducer = combineReducers({
	activeBid: activeBidReducer,
	exchangeRate: exchangeRateReducer,
	history: historyReducer,
});

export default rootReducer;
