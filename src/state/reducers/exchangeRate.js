import {
  EXCHANGE_RATE_FETCH_SUCCESS,
  EXCHANGE_RATE_FETCH_ERROR,
  EXCHANGE_RATE_FETCH_INIT,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  rate: 0,
  lastUpdated: Number.POSITIVE_INFINITY,
  error: null,
  isFetching: false,
};

function exchangeRateReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EXCHANGE_RATE_FETCH_INIT:
      return applyFetchInitExchangeRate(state);
    case EXCHANGE_RATE_FETCH_SUCCESS:
      return applyFetchSuccessExchangeRate(state, action);
    case EXCHANGE_RATE_FETCH_ERROR:
      return applyFetchErrorExchangeRate(state, action);
    default:
      return state;
  }
}

function applyFetchInitExchangeRate(state) {
  return {
    ...state,
    lastUpdated: null,
    error: null,
    isFetching: true,
  };
}

function applyFetchSuccessExchangeRate(state, action) {
  return {
    rate: action.payload.rate,
    lastUpdated: action.payload.date,
    error: null,
    isFetching: false,
  };
}

function applyFetchErrorExchangeRate(state, action) {
  return {
    ...state,
    error: action.error,
    isFetching: false,
  };
}

export default exchangeRateReducer;
