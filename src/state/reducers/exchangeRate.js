import {
  EXCHANGE_RATE_UPDATE,
  EXCHANGE_RATE_FETCH_ERROR,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  rate: 42.5,
  lastUpdated: Number.POSITIVE_INFINITY,
  error: null,
};

function exchangeRateReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EXCHANGE_RATE_UPDATE:
      return applyUpdateExchangeRate(state, action);
    case EXCHANGE_RATE_FETCH_ERROR:
      return applyFetchErrorExchangeRate(state, action);
    default:
      return state;
  }
}

function applyUpdateExchangeRate(state, action) {
  return {
    rate: action.rate,
    lastUpdated: action.lastUpdated,
    error: null,
  };
}

function applyFetchErrorExchangeRate(state, action) {
  return {
    ...state,
    error: action.error,
  };
}

export default exchangeRateReducer;
