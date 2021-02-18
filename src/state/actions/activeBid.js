import {
  ACTIVE_BID_START_SUCCESS,
  ACTIVE_BID_FETCH_SUCCESS,
  ACTIVE_BID_FETCH_ERROR,
  ACTIVE_BID_CANCEL_SUCCESS,
  ACTIVE_BID_MATCH,
} from "./actionTypes";

const doStartActiveBidSuccess = (payload) => ({
  type: ACTIVE_BID_START_SUCCESS,
  payload,
});

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
  doStartActiveBidSuccess,
  doCancelActiveBidSuccess,
  doFetchActiveBidSuccess,
  doFetchActiveBidError,
  doMatchActiveBid,
};
