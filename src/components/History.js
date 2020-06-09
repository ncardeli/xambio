import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Panel from "./Panel";
import arrowRight from "../assets/arrow-right.svg";
import check from "../assets/check.svg";
import cross from "../assets/close.svg";
import { getHistory } from "../selectors/history";
import {
	dateToFormattedString,
	currencyToFormattedString,
} from "../util/localization";

function History() {
	const history = useSelector(getHistory);
	const browserHistory = useHistory();
	const onClick = (id) => () => browserHistory.push(getHistoryRoute(id));

	return (
		<Panel type="main" title="Historial de operaciones" className="w-full">
			{history.length > 0 && (
				<section>
					<div className="flex flex-col rounded border">
						{history.map(({ id, dollars, match, status, timestamp, type }) => {
							const operationTypeText = type === "sell" ? "Venta" : "Compra";
							return (
								<ListRow linkTo={getHistoryRoute(id)} onClick={onClick(id)}>
									<img
										className="absolute h-full inset-y-0 left-0 w-4 ml-2 object-center"
										src={status === "completed" ? check : cross}
										alt="Tick"
										style={{
											filter: getCssFilter(type),
										}}
									></img>
									<h3>{`${operationTypeText} de ${currencyToFormattedString(
										"USD",
										dollars
									)} a ${match.name}`}</h3>
									<div>{dateToFormattedString(new Date(timestamp))}</div>
								</ListRow>
							);
						})}
					</div>
				</section>
			)}
			{history.length === 0 && (
				<p className="py-6">
					Nada que ver por aquí. Aún no has realizado operaciones.
				</p>
			)}
		</Panel>
	);
}

const getHistoryRoute = (id) => `/history/bid?${id}`;

const getCssFilter = (type) =>
	type === "sell"
		? "invert(74%) sepia(98%) saturate(2327%) hue-rotate(308deg) brightness(100%) contrast(97%)"
		: "invert(41%) sepia(69%) saturate(407%) hue-rotate(98deg) brightness(90%) contrast(83%)";

function ListRow({ linkTo, children, onClick }) {
	return (
		<div
			className="flex flex-col border-b-2 px-8 py-4 relative cursor-pointer"
			onClick={onClick}
		>
			{children}
			<Link to={linkTo}>
				<img
					className="absolute h-full inset-y-0 right-0 w-3 mr-3 object-center"
					style={{
						filter: "invert(.6)",
					}}
					src={arrowRight}
					alt="Chevron señalando hacia la derecha"
				></img>
			</Link>
		</div>
	);
}

export default History;
