function getActiveBid(state) {
	return state.activeBid;
}

function hasActiveBid(state) {
	const activeBid = getActiveBid(state);
	const now = new Date().getTime();
	if (activeBid !== null) {
		return now < activeBid.validUntil;
	}
	return false;
}

export { getActiveBid, hasActiveBid };
