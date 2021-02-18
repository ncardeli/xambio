function isAuthenticated(state) {
  return state.auth.userData.id !== null;
}

export { isAuthenticated };
