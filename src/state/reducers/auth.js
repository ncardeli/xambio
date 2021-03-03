import {
  AUTH_PROVIDER_INIT,
  AUTH_PROVIDER_SUCCESS,
  AUTH_PROVIDER_ERROR,
  AUTH_CLEAN_UP,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  userData: {
    id: null,
  },
  loading: false,
  error: null,
};

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_PROVIDER_INIT:
      return applyAuthProviderInit(state);
    case AUTH_PROVIDER_SUCCESS:
      return applyAuthProviderSuccess(state, action);
    case AUTH_PROVIDER_ERROR:
      return applyAuthProviderError(state, action);
    case AUTH_CLEAN_UP:
      return applyAuthCleanUp(state);
    default:
      return state;
  }
}

function applyAuthProviderInit(state) {
  return {
    ...state,
    loading: true,
  };
}

function applyAuthProviderError(state, { payload }) {
  return {
    ...state,
    error: payload.error,
    loading: false,
  };
}

function applyAuthProviderSuccess(state, { payload }) {
  return {
    ...state,
    userData: {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      location: payload.location,
      logoUrl: payload.logoUrl,
      createdAt: payload.createdAt,
    },
    error: null,
    loading: false,
  };
}

function applyAuthCleanUp() {
  return { ...INITIAL_STATE };
}

export default authReducer;
