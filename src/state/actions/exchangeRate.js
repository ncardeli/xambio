import firebase from "firebase.js";
import {
  EXCHANGE_RATE_FETCH_INIT,
  EXCHANGE_RATE_FETCH_SUCCESS,
  EXCHANGE_RATE_FETCH_ERROR,
} from "../actions/actionTypes";

const doFetchExchangeRateInit = () => ({
  type: EXCHANGE_RATE_FETCH_INIT,
});

const doFetchExchangeRateSuccess = (payload) => ({
  type: EXCHANGE_RATE_FETCH_SUCCESS,
  payload,
});

const doFetchExchangeRateError = (payload) => ({
  type: EXCHANGE_RATE_FETCH_ERROR,
  payload,
});

const doFetchExchangeRate = () => async (dispatch) => {
  dispatch(doFetchExchangeRateInit());

  const exchangeRate = firebase.functions().httpsCallable("exchangeRate");
  try {
    const result = await exchangeRate();
    dispatch(doFetchExchangeRateSuccess(result.data));
  } catch (error) {
    dispatch(doFetchExchangeRateError(error));
  }
};

export {
  doFetchExchangeRate,
  doFetchExchangeRateInit,
  doFetchExchangeRateSuccess,
  doFetchExchangeRateError,
};
