import {
  ACTIVE_BID_START_SUCCESS,
  ACTIVE_BID_FETCH_ERROR,
  ACTIVE_BID_CANCEL_SUCCESS,
  ACTIVE_BID_MATCH,
  ACTIVE_BID_CANCEL_ERROR,
  ACTIVE_BID_FETCH_INIT,
  ACTIVE_BID_FETCH_SUCCESS,
  ACTIVE_BID_START_ERROR,
  AUTH_CLEAN_UP,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  error: null,
  isFetching: false,
};

function activeBidReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIVE_BID_FETCH_INIT:
      return applyFetchActiveBidInit(state);
    case ACTIVE_BID_FETCH_SUCCESS:
      return applyFetchActiveBidSuccess(state, action);
    case ACTIVE_BID_FETCH_ERROR:
      return applyFetchActiveBidError(state, action);
    case ACTIVE_BID_START_SUCCESS:
      return applyStartActiveBidSuccess(state, action);
    case ACTIVE_BID_START_ERROR:
      return applyStartActiveBidError(state, action);
    case ACTIVE_BID_CANCEL_SUCCESS:
      return applyCancelActiveBidSuccess(state, action);
    case ACTIVE_BID_CANCEL_ERROR:
      return applyCancelActiveBidError(state, action);
    case ACTIVE_BID_MATCH:
      return applyMatchActiveBid(state, action);
    case AUTH_CLEAN_UP:
      return applyCleanActiveBid(state, action);
    default:
      return state;
  }
}

function applyFetchActiveBidInit(state) {
  return {
    ...state,
    isFetching: true,
    error: null,
  };
}

function applyFetchActiveBidSuccess(state, action) {
  const { type, dollars, local, timestamp } = action.payload;
  return {
    ...state,
    type,
    dollars,
    local,
    timestamp,
    match: null,
    error: null,
  };
}

function applyFetchActiveBidError(state, action) {
  return {
    ...state,
    isFetching: false,
    error: action.payload.error,
  };
}

function applyStartActiveBidSuccess(state, action) {
  const { type, dollars, local, timestamp } = action.payload;
  return {
    ...state,
    type,
    dollars,
    local,
    timestamp,
    match: null,
    error: null,
  };
}

function applyStartActiveBidError(state, action) {
  return {
    ...state,
    error: action.payload.error,
  };
}

function applyCancelActiveBidSuccess() {
  return { ...INITIAL_STATE };
}

function applyCancelActiveBidError(state, action) {
  return {
    ...state,
    error: action.payload.error,
  };
}

function applyMatchActiveBid(state, action) {
  return {
    ...state,
    match: action.payload.match,
  };
}

function applyCleanActiveBid() {
  return { ...INITIAL_STATE };
}

export default activeBidReducer;
