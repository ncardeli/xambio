import React from "react";
import Panel from "./Panel";
import { useSelector } from "react-redux";
import { getHistoryOperation } from "../selectors/history";
import { currencyToFormattedString } from "../util/localization";

function HistoryOperation({ id }) {
	const { dollars, match, status, timestamp, type } = useSelector((state) =>
		getHistoryOperation(state, id)
	);
	const operationTypeText = type === "sell" ? "Venta" : "Compra";
	const title = `${operationTypeText} de ${currencyToFormattedString(
		"USD",
		dollars
	)}`;
	return (
		<Panel type="main" title={title}>
			<section>{`${id}, ${dollars}, ${match}, ${status}, ${timestamp}, ${type}`}</section>
		</Panel>
	);
}

export default HistoryOperation;
