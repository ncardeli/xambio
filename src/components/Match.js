import React from "react";
import { useSelector } from "react-redux";
import { getActiveBid } from "../selectors/activeBid";
import Panel from "./Panel";

function Match() {
	const activeBid = useSelector(getActiveBid);
	const { type } = activeBid;
	const panelTitle = `Hemos encontrado un ${
		type === "sell" ? "comprador" : "vendedor"
	}`;
	return <Panel type={type} title={panelTitle}></Panel>;
}

export default Match;
