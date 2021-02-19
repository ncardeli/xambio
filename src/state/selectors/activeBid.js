const MAX_ACTIVE_BID_TTL = 9 * 60 * 60 * 1000;

function getActiveBid(state) {
  return state.activeBid;
}

function hasActiveBid(state) {
  const activeBid = getActiveBid(state);
  const now = new Date().getTime();
  if (activeBid !== null) {
    return activeBid.timestamp + MAX_ACTIVE_BID_TTL > now;
  }
  return false;
}

function isActiveBidMatched(state) {
  const activeBid = getActiveBid(state);
  return activeBid !== null && activeBid.match !== null;
}

export { getActiveBid, hasActiveBid, isActiveBidMatched };
