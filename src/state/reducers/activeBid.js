import {
  ACTIVE_BID_START_SUCCESS,
  ACTIVE_BID_FETCH_ERROR,
  ACTIVE_BID_CANCEL_SUCCESS,
  ACTIVE_BID_MATCH,
} from "../actions/actionTypes";

//const INITIAL_STATE = null;
const INITIAL_STATE = {
  type: "sell",
  dollars: 1000,
  local: 42500,
  validUntil: Number.POSITIVE_INFINITY,
  match: {
    name: "Juan Perez",
    email: "jperez@aa.aa.com",
    phone: "099212474",
    receivingAccount: "5882543",
    receivingAccountBank: "Itaú",
    depositAccount: "8182773",
    depositAccountBank: "Itaú",
  },
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
  const { type, dollars, local, validUntil } = action.payload;
  return {
    type,
    dollars,
    local,
    validUntil,
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
