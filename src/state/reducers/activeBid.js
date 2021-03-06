import {
  ACTIVE_BID_START_SUCCESS,
  ACTIVE_BID_FETCH_ERROR,
  ACTIVE_BID_CANCEL_SUCCESS,
  ACTIVE_BID_MATCH,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  error: null,
};

function activeBidReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIVE_BID_START_SUCCESS:
      return applyStartActiveBid(state, action);
    case ACTIVE_BID_CANCEL_SUCCESS:
      return applyCancelActiveBid(state, action);
    case ACTIVE_BID_FETCH_ERROR:
      return applyFetchErrorActiveBid(state, action);
    case ACTIVE_BID_MATCH:
      return applyMatchActiveBid(state, action);
    default:
      return state;
  }
}

function applyStartActiveBid(_, action) {
  const { type, dollars, local, timestamp } = action.payload;
  return {
    type,
    dollars,
    local,
    timestamp,
    match: null,
    error: null,
  };
}

function applyFetchErrorActiveBid(state, action) {
  return {
    ...state,
    error: action.error,
  };
}

function applyCancelActiveBid() {
  return null;
}

function applyMatchActiveBid(state, action) {
  return {
    ...state,
    match: action.match,
  };
}

export default activeBidReducer;
