import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Pills } from "../Pills";

const options = ["first option", "second option", "third option"];
const selectedOption = options[0];

describe("Pills component", () => {
	it("renders passed options", () => {
		const { getByLabelText } = render(<Pills options={options}></Pills>);
		options.forEach((optionText) => {
			const optionElement = getByLabelText(optionText);
			expect(optionElement).toBeInTheDocument();
			expect(optionElement).not.toBeVisible();
		});
	});

	it("marks the selected option as checked", () => {
		const { getByLabelText } = render(
			<Pills options={options} value={selectedOption}></Pills>
		);
		expect(getByLabelText(selectedOption).checked).toBe(true);
	});

	it("fires the onSelect event", () => {
		const mockFn = jest.fn();
		const { getByText } = render(
			<Pills options={options} value={selectedOption} onSelect={mockFn}></Pills>
		);
		fireEvent.click(getByText(options[1]));
		expect(mockFn).toHaveBeenCalled();
	});
});
