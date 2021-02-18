import { fetchDocument, pushDocument } from "state/api";
import {
  ACTIVE_BID_START_SUCCESS,
  ACTIVE_BID_FETCH_SUCCESS,
  ACTIVE_BID_FETCH_ERROR,
  ACTIVE_BID_CANCEL_SUCCESS,
  ACTIVE_BID_MATCH,
  ACTIVE_BID_START_INIT,
  ACTIVE_BID_START_ERROR,
} from "./actionTypes";

const doStartActiveBidInit = () => ({
  type: ACTIVE_BID_START_INIT,
});

const doStartActiveBidSuccess = (payload) => ({
  type: ACTIVE_BID_START_SUCCESS,
  payload,
});

const doStartActiveBidError = (payload) => ({
  type: ACTIVE_BID_START_ERROR,
  payload,
});

const doStartActiveBid = (payload) => async (dispatch) => {
  dispatch(doStartActiveBidInit());

  try {
    const bidRef = await pushDocument("bids", payload);
    bidRef.on("value", (snapshot) => {
      const value = snapshot.val();
      if (value.timestamp) {
        dispatch(doStartActiveBidSuccess(value));
        bidRef.off();
      }
    });
  } catch (error) {
    dispatch(doStartActiveBidError(error));
  }
};

const doCancelActiveBidSuccess = (payload) => ({
  type: ACTIVE_BID_CANCEL_SUCCESS,
  payload,
});

const doFetchActiveBidSuccess = () => ({
  type: ACTIVE_BID_FETCH_SUCCESS,
});

const doFetchActiveBidError = (error) => ({
  type: ACTIVE_BID_FETCH_ERROR,
  error,
});

const doMatchActiveBid = (match) => ({
  type: ACTIVE_BID_MATCH,
  match,
});

export {
  doStartActiveBid,
  doStartActiveBidInit,
  doStartActiveBidSuccess,
  doStartActiveBidError,
  doCancelActiveBidSuccess,
  doFetchActiveBidSuccess,
  doFetchActiveBidError,
  doMatchActiveBid,
};
