import React from "react";
import Bid from "./Bid";

const PREFIXED_AMOUNTS = [100, 500, 1000, 2000];

function Sell({ exchangeRate }) {
	const onSubmit = (value) => {
		console.log(value);
	};

	return (
		<Bid
			buttonLabel="Vender"
			exchangeRate={exchangeRate}
			type="sell"
			title="¿Cuántos dólares queres vender?"
			prefixedAmounts={PREFIXED_AMOUNTS}
			onSubmit={onSubmit}
			inputLabel="Dólares a vender"
			convertedAmountText="Recibirás"
		></Bid>
	);
}

export default Sell;
