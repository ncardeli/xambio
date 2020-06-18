function getHistory(state) {
	return state.history;
}

function getHistoryOperation(state, id) {
	return state.history.find((operation) => operation.id === id);
}

export { getHistory, getHistoryOperation };
