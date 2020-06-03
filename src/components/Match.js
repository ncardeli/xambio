import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getActiveBid } from "../selectors/activeBid";
import Panel from "./Panel";
import { doCancelActiveBid } from "../actions/activeBid";
import { Button } from "./Button";
import { currencyToFormattedString } from "../util/currency";

function Match() {
	const dispatch = useDispatch();
	const activeBid = useSelector(getActiveBid);
	const { type, dollars, local } = activeBid;
	const panelTitle = `Hemos encontrado un ${
		type === "sell" ? "comprador" : "vendedor"
	}`;
	const { match } = activeBid;

	const formattedDollars = currencyToFormattedString("USD", dollars);
	const formattedLocal = currencyToFormattedString("UYU", local);
	const amountToReceive = type === "sell" ? formattedLocal : formattedDollars;
	const amountToSend = type === "sell" ? formattedDollars : formattedLocal;

	const onCancel = () => {
		dispatch(doCancelActiveBid());
	};

	return (
		<Panel type={type} title={panelTitle}>
			<section className="grid-form mx-auto mb-8">
				<div className="text-right">Nombre:</div>
				<div>{match.name}</div>
				<div className="text-right">Email:</div>
				<div>{match.email}</div>
				<div className="text-right">Teléfono:</div>
				<div>{match.phone}</div>
				<div className="text-right">Debes transferir:</div>
				<div>{amountToSend}</div>
				<div className="text-right">A la cuenta:</div>
				<div>
					{match.depositAccount} ({match.depositAccountBank})
				</div>
				<div className="text-right">Recibirás:</div>
				<div>{amountToReceive}</div>
				<div className="text-right">En la cuenta:</div>
				<div>
					{match.receivingAccount} ({match.receivingAccountBank})
				</div>
			</section>
			<Button
				type={type}
				buttonType="button"
				className="block mt-8 width-full"
				onClick={onCancel}
			>
				Retirar oferta
			</Button>
		</Panel>
	);
}

export default Match;
