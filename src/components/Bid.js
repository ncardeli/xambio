import React, { useState } from "react";
import Panel from "./Panel";
import { Pills } from "./Pills";
import arrowDown from "../assets/arrow-down.svg";
import { currencyToFormattedString } from "../util/currency";
import { getClassesByType } from "./styling";

function Bid({
	buttonLabel,
	inputLabel,
	title,
	type,
	exchangeRate,
	prefixedAmounts,
	onSubmit,
	convertedAmountText,
}) {
	const [value, setValue] = useState(prefixedAmounts[0]);

	const onSelect = (stringValue) => {
		setValue(Number(stringValue));
	};

	const { textColorInverse } = getClassesByType(type);

	return (
		<Panel type={type} title={title}>
			<Pills
				options={prefixedAmounts}
				value={value}
				onSelect={onSelect}
				textColorClass={textColorInverse}
			></Pills>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit(value);
				}}
			>
				<div className="flex flex-col items-center mb-4">
					<div className="flex flex-wrap items-stretch w-full mb-2 relative">
						<div className="flex">
							<span className="flex items-center my-2 rounded rounded-r-none border border-white border-r-0 px-3 whitespace-no-wrap text-grey-dark text-sm">
								US$
							</span>
						</div>
						<label htmlFor="amount" hidden>
							{inputLabel}
						</label>
						<input
							id="amount"
							className="flex-grow bg-transparent border border-transparent text-gray-900 p-4 my-2 outline-none bg-white rounded-r"
							type="text"
							inputMode="numeric"
							placeholder="Ingresa un monto, por ejemplo: 500"
							pattern="\d{3,5}"
							title="Ingresa un monto entre US$100 y US$99999"
							value={value}
							onChange={(e) => setValue(e.target.value)}
							required
						></input>
					</div>
					<img
						style={{
							filter: "invert(1)",
							height: "45px",
						}}
						className="mb-2"
						src={arrowDown}
						alt="Chevron señalando monto convertido a pesos uruguayos"
					></img>
					<div className="text-lg">{convertedAmountText}</div>
					<div className="text-3xl">
						{currencyToFormattedString("UYU", value * exchangeRate)}
					</div>
				</div>
				<button
					type="submit"
					className={`btn block mx-auto ${textColorInverse} bg-white disabled:opacity-75 disabled:cursor-not-allowed`}
					disabled={value <= 0}
				>
					{buttonLabel}
				</button>
			</form>
		</Panel>
	);
}

export default Bid;
