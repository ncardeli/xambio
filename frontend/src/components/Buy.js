import React from "react";
import Bid from "./Bid";
import { useDispatch } from "react-redux";
import { doStartActiveBid } from "../actions/activeBid";

const PREFIXED_AMOUNTS = [100, 500, 1000, 2000];

function Buy({ exchangeRate }) {
	const dispatch = useDispatch();

	const onSubmit = (value) => {
		dispatch(
			doStartActiveBid({
				type: "buy",
				dollars: value,
				local: value * exchangeRate,
				validUntil: new Date().getTime() + 6000,
			})
		);
	};

	return (
		<Bid
			submitButtonLabel="Comprar"
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