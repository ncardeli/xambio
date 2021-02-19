import {
  HISTORY_FETCH_ERROR,
  HISTORY_FETCH_INIT,
  HISTORY_FETCH_SUCCESS,
} from "state/actions/actionTypes";

const INITIAL_STATE = {
  data: [
    {
      id: "1",
      timestamp: new Date().getTime(),
      exchangeRate: 42.5,
      local: 42500,
      dollars: 1000,
      match: {
        name: "Juan Perez",
        email: "jperez@aa.aa.com",
        phone: "099212474",
        receivingAccount: "5882543",
        receivingAccountBank: "Itaú",
        depositAccount: "8182773",
        depositAccountBank: "Itaú",
      },
      type: "sell",
      status: "completed",
    },
    {
      id: "2",
      timestamp: new Date().getTime(),
      exchangeRate: 42.5,
      local: 42500,
      dollars: 1000,
      match: {
        name: "Juan Perez",
        email: "jperez@aa.aa.com",
        phone: "099212474",
        receivingAccount: "5882543",
        receivingAccountBank: "Itaú",
        depositAccount: "8182773",
        depositAccountBank: "Itaú",
      },
      type: "buy",
      status: "completed",
    },
    {
      id: "3",
      timestamp: new Date().getTime(),
      exchangeRate: 42.5,
      local: 42500,
      dollars: 1000,
      match: {
        name: "Juan Perez",
        email: "jperez@aa.aa.com",
        phone: "099212474",
        receivingAccount: "5882543",
        receivingAccountBank: "Itaú",
        depositAccount: "8182773",
        depositAccountBank: "Itaú",
      },
      type: "sell",
      status: "aborted",
    },
  ],
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

export default historyReducer;
