import {
	ACTIVE_BID_START,
	ACTIVE_BID_FETCH,
	ACTIVE_BID_FETCH_ERROR,
	ACTIVE_BID_CANCEL,
	ACTIVE_BID_MATCH,
} from "../constants/actionTypes";

const doStartActiveBid = (payload) => ({
	type: ACTIVE_BID_START,
	payload,
});

const doCancelActiveBid = (payload) => ({
	type: ACTIVE_BID_CANCEL,
	payload,
});

const doFetchActiveBid = () => ({
	type: ACTIVE_BID_FETCH,
});

const doFetchErrorActiveBid = (error) => ({
	type: ACTIVE_BID_FETCH_ERROR,
	error,
});

const doMatchActiveBid = (match) => ({
	type: ACTIVE_BID_MATCH,
	match,
});

export {
	doStartActiveBid,
	doCancelActiveBid,
	doFetchActiveBid,
	doFetchErrorActiveBid,
	doMatchActiveBid,
};
