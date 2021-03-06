import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Bid from "../Bid";

const bidType = "buy";
const submitButtonLabel = "Submit button text";
const cancelButtonLabel = "Cancel button text";
const exchangeRate = 40;
const titleText = "Title text";
const prefixedAmounts = [];
const inputLabel = "Input label";
const convertedAmountText = "Converted amount text";
const intialRoute = `/${bidType}`;

function renderWithRouter(child, initialRoute = "/") {
	const history = createMemoryHistory(initialRoute);
	return {
		...render(<Router history={history}>{child}</Router>),
		history,
	};
}

describe("Pills component", () => {
	it("renders passed texts", () => {
		const { getByLabelText, getByText } = renderWithRouter(
			<Bid
				submitButtonLabel={submitButtonLabel}
				cancelButtonLabel={cancelButtonLabel}
				exchangeRate={exchangeRate}
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
		const { getByText } = renderWithRouter(
			<Bid
				submitButtonLabel={submitButtonLabel}
				cancelButtonLabel={cancelButtonLabel}
				exchangeRate={exchangeRate}
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

	it("redirects to home", () => {
		const { getByText, history } = renderWithRouter(
			<Bid
				submitButtonLabel={submitButtonLabel}
				cancelButtonLabel={cancelButtonLabel}
				exchangeRate={exchangeRate}
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
