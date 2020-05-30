import {
	ACTIVE_BID_SET,
	ACTIVE_BID_FETCH_ERROR,
	ACTIVE_BID_CLEAR,
} from "../constants/actionTypes";

const INITIAL_STATE = null;

function activeBidReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case ACTIVE_BID_SET:
			return applySetActiveBid(state, action);
		case ACTIVE_BID_CLEAR:
			return applyClearActiveBid(state, action);
		case ACTIVE_BID_FETCH_ERROR:
			return applyFetchErrorActiveBid(state, action);
		default:
			return state;
	}
}

function applySetActiveBid(_, action) {
	return {
		...action.payload,
		error: null,
	};
}

function applyFetchErrorActiveBid(state, action) {
	return {
		...state,
		error: action.error,
	};
}

function applyClearActiveBid() {
	return null;
}

export default activeBidReducer;
