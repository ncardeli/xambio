import {
  AUTH_CLEAN_UP,
  HISTORY_FETCH_ERROR,
  HISTORY_FETCH_INIT,
  HISTORY_FETCH_SUCCESS,
} from "state/actions/actionTypes";

const INITIAL_STATE = {
  data: [],
  isFetching: false,
  error: null,
};

function historyReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case HISTORY_FETCH_INIT:
      return applyFetchHistoryInit(state, action);
    case HISTORY_FETCH_SUCCESS:
      return applyFetchHistorySuccess(state, action);
    case HISTORY_FETCH_ERROR:
      return applyFetchHistoryError(state, action);
    case AUTH_CLEAN_UP:
      return applyCleanHistory(state, action);
    default:
      return state;
  }
}

function applyFetchHistoryInit(state) {
  return {
    ...state,
    error: null,
    isFetching: true,
  };
}

function applyFetchHistorySuccess(state, action) {
  return {
    ...state,
    data: action.payload.data,
    error: null,
    isFetching: false,
  };
}

function applyFetchHistoryError(state, action) {
  return {
    ...state,
    error: action.payload.error,
    isFetching: false,
  };
}

function applyCleanHistory() {
  return { ...INITIAL_STATE };
}

export default historyReducer;
