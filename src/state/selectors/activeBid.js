const MAX_ACTIVE_BID_TTL = 9 * 60 * 60 * 1000;

function getActiveBid(state) {
  return state.activeBid;
}

function hasActiveBid(state) {
  const activeBid = getActiveBid(state);
  return activeBid !== null && isBidTimestampActive(activeBid.timestamp);
}

function isActiveBidMatched(state) {
  const activeBid = getActiveBid(state);
  return activeBid !== null && activeBid.match !== null;
}

function isBidTimestampActive(timestamp) {
  const now = new Date().getTime();
  return timestamp + MAX_ACTIVE_BID_TTL > now;
}

export { getActiveBid, hasActiveBid, isActiveBidMatched, isBidTimestampActive };
