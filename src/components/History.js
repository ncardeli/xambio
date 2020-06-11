import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Panel from "./Panel";
import { List, ListRow } from "./List";
import check from "../assets/check.svg";
import cross from "../assets/close.svg";
import { getHistory } from "../selectors/history";
import {
	dateToFormattedString,
	currencyToFormattedString,
} from "../util/localization";
import { getClassesByType } from "./styling";

function History() {
	const history = useSelector(getHistory);
	const browserHistory = useHistory();
	const onClick = (id) => () => browserHistory.push(getHistoryRoute(id));
	return (
		<Panel type="main" title="Historial de operaciones" className="w-full">
			{history.length > 0 && (
				<List>
					{history.map(({ id, dollars, match, status, timestamp, type }) => {
						const operationTypeText = type === "sell" ? "Venta" : "Compra";
						const counterPartText =
							status === "completed" ? ` a ${match.name}` : "";
						const text = `${operationTypeText} de ${currencyToFormattedString(
							"USD",
							dollars
						)}${counterPartText}`;
						const { borderColor } = getClassesByType(type);
						return (
							<ListRow
								key={id}
								linkTo={getHistoryRoute(id)}
								onClick={onClick(id)}
							>
								<div
									className={`absolute h-full inset-y-0 left-0 border-l-2 ${borderColor}`}
								></div>
								<h3 className="mb-2">{text}</h3>
								<div>
									<img
										className="inline pr-2"
										src={status === "completed" ? check : cross}
										alt={status === "completed" ? "Check" : "Cruz"}
										style={{
											filter: "invert(.4)",
										}}
									></img>
									{`${
										status === "completed" ? "Completeda" : "Cancelada"
									} - ${dateToFormattedString(new Date(timestamp))}`}
								</div>
							</ListRow>
						);
					})}
				</List>
			)}
			{history.length === 0 && (
				<p className="py-6">
					Nada para ver por aquí. Aún no has realizado operaciones.
				</p>
			)}
		</Panel>
	);
}

const getHistoryRoute = (id) => `/history/bid?${id}`;

export default History;
