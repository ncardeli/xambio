import { fetchDocument, pushDocument, updateDocument } from "state/api";
import {
  ACTIVE_BID_FETCH_INIT,
  ACTIVE_BID_FETCH_SUCCESS,
  ACTIVE_BID_FETCH_ERROR,
  ACTIVE_BID_START_INIT,
  ACTIVE_BID_START_SUCCESS,
  ACTIVE_BID_START_ERROR,
  ACTIVE_BID_CANCEL_INIT,
  ACTIVE_BID_CANCEL_SUCCESS,
  ACTIVE_BID_CANCEL_ERROR,
  ACTIVE_BID_MATCH,
} from "./actionTypes";

const doFetchActiveBidInit = () => ({
  type: ACTIVE_BID_FETCH_INIT,
});

const doFetchActiveBidSuccess = (payload) => ({
  type: ACTIVE_BID_FETCH_SUCCESS,
  payload,
});

const doFetchActiveBidError = (payload) => ({
  type: ACTIVE_BID_FETCH_ERROR,
  payload,
});

const doFetchActiveBid = (payload) => async (dispatch) => {
  dispatch(doFetchActiveBidInit());

  try {
    const user = await fetchDocument("users", payload.uid);
    if (user.lastBid) {
      const bid = await fetchDocument("bids", user.lastBid);
      dispatch(doFetchActiveBidSuccess(bid));
    }
  } catch (error) {
    dispatch(doFetchActiveBidError(error));
  }
};

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

const doCancelActiveBidInit = () => ({
  type: ACTIVE_BID_CANCEL_INIT,
});

const doCancelActiveBidSuccess = () => ({
  type: ACTIVE_BID_CANCEL_SUCCESS,
});

const doCancelActiveBidError = (payload) => ({
  type: ACTIVE_BID_CANCEL_ERROR,
  payload,
});

const doCancelActiveBid = (payload) => async (dispatch) => {
  dispatch(doCancelActiveBidInit());

  try {
    await updateDocument("users", payload.uid, {
      lastBid: null,
    });
    dispatch(doCancelActiveBidSuccess());
  } catch (error) {
    dispatch(doCancelActiveBidError(error));
  }
};

const doMatchActiveBid = (match) => ({
  type: ACTIVE_BID_MATCH,
  match,
});

export {
  doStartActiveBid,
  doStartActiveBidInit,
  doStartActiveBidSuccess,
  doStartActiveBidError,
  doCancelActiveBid,
  doCancelActiveBidInit,
  doCancelActiveBidSuccess,
  doCancelActiveBidError,
  doMatchActiveBid,
  doFetchActiveBid,
  doFetchActiveBidInit,
  doFetchActiveBidSuccess,
  doFetchActiveBidError,
};
