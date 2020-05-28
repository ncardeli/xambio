import React from "react";
import Bid from "./Bid";

const PREFIXED_AMOUNTS = [100, 500, 1000, 2000];

function Buy({ exchangeRate }) {
	const onSubmit = (value) => {
		console.log(value);
	};

	return (
		<Bid
			buttonLabel="Comprar"
			exchangeRate={exchangeRate}
			type="buy"
			title="¿Cuántos dólares queres comprar?"
			prefixedAmounts={PREFIXED_AMOUNTS}
			onSubmit={onSubmit}
			inputLabel="Dólares a comprar"
			convertedAmountText="Tendrás que pagar"
		></Bid>
	);
}

export default Buy;
