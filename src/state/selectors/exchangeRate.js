function getExchangeRate(state) {
  return {
    exchangeRate: state.exchangeRate.rate,
    isFetching: state.exchangeRate.isFetching,
  };
}

export { getExchangeRate };
