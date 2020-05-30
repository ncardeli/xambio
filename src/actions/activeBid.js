import {
	ACTIVE_BID_SET,
	ACTIVE_BID_FETCH,
	ACTIVE_BID_FETCH_ERROR,
	ACTIVE_BID_CLEAR,
} from "../constants/actionTypes";

const doSetActiveBid = (payload) => ({
	type: ACTIVE_BID_SET,
	payload,
});

const doClearActiveBid = (payload) => ({
	type: ACTIVE_BID_CLEAR,
	payload,
});

const doFetchActiveBid = () => ({
	type: ACTIVE_BID_FETCH,
});

const doFetchErrorActiveBid = (error) => ({
	type: ACTIVE_BID_FETCH_ERROR,
	error,
});

export {
	doSetActiveBid,
	doClearActiveBid,
	doFetchActiveBid,
	doFetchErrorActiveBid,
};
