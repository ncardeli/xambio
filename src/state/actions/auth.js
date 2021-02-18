import { createDocument, fetchDocument } from "state/api";
import {
  AUTH_PROVIDER_INIT,
  AUTH_PROVIDER_SUCCESS,
  AUTH_PROVIDER_ERROR,
  AUTH_CLEAN_UP,
} from "./actionTypes";

const doAuthProviderInit = () => ({ type: AUTH_PROVIDER_INIT });

const doAuthProviderSuccess = (payload) => ({
  type: AUTH_PROVIDER_SUCCESS,
  payload,
});

const doAuthProviderError = (payload) => ({
  type: AUTH_PROVIDER_ERROR,
  payload,
});

const doAuthCleanUp = () => ({ type: AUTH_CLEAN_UP });

const doAuthWithSocialMedia = (authResult) => {
  return async (dispatch) => {
    dispatch(doAuthProviderInit());
    const { user, additionalUserInfo } = authResult;
    const { isNewUser, profile } = additionalUserInfo;
    const { uid, photoURL, email, displayName } = user;

    const { location } = profile;

    const userData = {
      email,
      name: displayName,
      createdAt: new Date().getTime(),
      logoUrl: photoURL,
      location: location?.name || null,
    };

    let userFromDb = {};
    if (isNewUser) {
      try {
        await createDocument("users", uid, userData);
      } catch (error) {
        return dispatch(doAuthProviderError({ error }));
      }
    } else {
      try {
        userFromDb = await fetchDocument("users", uid);
      } catch (error) {
        return dispatch(doAuthProviderError({ error }));
      }
    }

    return dispatch(
      doAuthProviderSuccess({ id: uid, ...userData, ...userFromDb })
    );
  };
};

export {
  doAuthWithSocialMedia,
  doAuthProviderInit,
  doAuthProviderSuccess,
  doAuthProviderError,
  doAuthCleanUp,
};
