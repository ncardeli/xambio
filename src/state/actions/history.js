import { fetchCollection } from "state/api";
import {
  HISTORY_FETCH_INIT,
  HISTORY_FETCH_SUCCESS,
  HISTORY_FETCH_ERROR,
} from "./actionTypes";

const doFetchHistoryInit = () => ({
  type: HISTORY_FETCH_INIT,
});

const doFetchHistorySuccess = (payload) => ({
  type: HISTORY_FETCH_SUCCESS,
  payload,
});

const doFetchHistoryError = (payload) => ({
  type: HISTORY_FETCH_ERROR,
  payload,
});

const doFetchHistory = (payload) => async (dispatch) => {
  dispatch(doFetchHistoryInit());

  const bids = await fetchCollection("bids", {
    filterBy: "uid",
    value: payload.uid,
  });
  dispatch(doFetchHistorySuccess({ data: bids }));
  try {
  } catch (error) {
    dispatch(doFetchHistoryError({ error }));
  }
};

export {
  doFetchHistory,
  doFetchHistoryInit,
  doFetchHistorySuccess,
  doFetchHistoryError,
};
