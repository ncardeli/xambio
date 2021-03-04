function isUserAuthenticated(state) {
  return state.auth.userData.id !== null;
}

function getUserData(state) {
  return state.auth.userData;
}

export { getUserData, isUserAuthenticated };
