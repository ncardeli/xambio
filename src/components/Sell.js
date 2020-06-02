import React from "react";
import Bid from "./Bid";
import { doStartActiveBid } from "../actions/activeBid";
import { useDispatch } from "react-redux";

const PREFIXED_AMOUNTS = [100, 500, 1000, 2000];

function Sell({ exchangeRate }) {
	const dispatch = useDispatch();

	const onSubmit = (value) => {
		dispatch(
			doStartActiveBid({
				type: "sell",
				dollars: value,
				local: value * exchangeRate,
				validUntil: new Date().getTime() + 6000,
			})
		);
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
