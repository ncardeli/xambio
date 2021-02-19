function getHistory(state) {
  return state.history.data;
}

function getHistoryOperation(state, id) {
  return getHistory(state).find((operation) => operation.id === id);
}

export { getHistory, getHistoryOperation };
