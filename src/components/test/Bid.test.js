import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Bid from "../Bid";

const bidType = "buy";
const submitButtonLabel = "Submit button text";
const cancelButtonLabel = "Cancel button text";
const titleText = "Title text";
const prefixedAmounts = [111, 222, 333, 444];
const inputLabel = "Input label";
const convertedAmountText = "Converted amount text";
const intialRoute = `/${bidType}`;

const exchangeRateValue = 10;
const initialState = {
  exchangeRate: {
    rate: exchangeRateValue,
    lastUpdated: Number.POSITIVE_INFINITY,
    error: null,
    isFetching: false,
  },
};

const mockStore = configureStore();

function renderWithRouterAndRedux(child, initialRoute = "/") {
  const history = createMemoryHistory(initialRoute);
  const store = mockStore(initialState);
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{child}</Router>
      </Provider>
    ),
    history,
  };
}

describe("Pills component", () => {
  it("renders passed texts", () => {
    const { getByLabelText, getByText } = renderWithRouterAndRedux(
      <Bid
        submitButtonLabel={submitButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
        type={bidType}
        title={titleText}
        prefixedAmounts={prefixedAmounts}
        inputLabel={inputLabel}
        convertedAmountText={convertedAmountText}
      ></Bid>
    );
    expect(getByLabelText(inputLabel)).toBeInTheDocument();
    expect(getByText(convertedAmountText)).toBeInTheDocument();
    expect(getByText(submitButtonLabel)).toBeInTheDocument();
    expect(getByText(cancelButtonLabel)).toBeInTheDocument();
  });

  it("fires the onSubmit event", () => {
    const mockFn = jest.fn();
    const { getByText } = renderWithRouterAndRedux(
      <Bid
        submitButtonLabel={submitButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
        type={bidType}
        title={titleText}
        prefixedAmounts={prefixedAmounts}
        inputLabel={inputLabel}
        convertedAmountText={convertedAmountText}
        onSubmit={mockFn}
      ></Bid>
    );
    fireEvent.click(getByText(submitButtonLabel));
    expect(mockFn).toHaveBeenCalled();
  });

  it("renders the amount to be exchanged", () => {
    const { getByText, getByDisplayValue } = renderWithRouterAndRedux(
      <Bid
        submitButtonLabel={submitButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
        type={bidType}
        title={titleText}
        prefixedAmounts={prefixedAmounts}
        inputLabel={inputLabel}
        convertedAmountText={convertedAmountText}
      ></Bid>
    );

    // Amount to exchange with default prefixed amount
    expect(
      getByText(new RegExp(prefixedAmounts[0] * exchangeRateValue))
    ).toBeInTheDocument();

    // Change to the third prefixed amount
    fireEvent.click(getByDisplayValue(prefixedAmounts[3].toString()));

    // Amount to exchange with third prefixed amount
    expect(
      getByText(new RegExp(prefixedAmounts[3] * exchangeRateValue))
    ).toBeInTheDocument();
  });

  it("redirects to home", () => {
    const { getByText, history } = renderWithRouterAndRedux(
      <Bid
        submitButtonLabel={submitButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
        type={bidType}
        title={titleText}
        prefixedAmounts={prefixedAmounts}
        inputLabel={inputLabel}
        convertedAmountText={convertedAmountText}
      ></Bid>,
      intialRoute
    );
    fireEvent.click(getByText(cancelButtonLabel));
    expect(history.location.pathname).not.toBe(intialRoute);
  });
});
