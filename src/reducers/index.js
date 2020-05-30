import { combineReducers } from "redux";
import activeBidReducer from "../reducers/activeBid";
import exchangeRateReducer from "../reducers/exchangeRate";

const rootReducer = combineReducers({
	activeBid: activeBidReducer,
	exchangeRate: exchangeRateReducer,
});

export default rootReducer;
