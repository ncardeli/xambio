import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import "./App.css";
import Buy from "./Buy";
import Home from "./Home";
import Sell from "./Sell";
import Waiting from "./Waiting";
import Match from "./Match";
import Header from "./Header";
import { useSelector } from "react-redux";
import { hasActiveBid, isActiveBidMatched } from "../selectors/activeBid";
import { getExchangeRate } from "../selectors/exchangeRate";

function App() {
	const exchangeRate = useSelector(getExchangeRate);
	const isActive = useSelector(hasActiveBid);
	const isMatched = useSelector(isActiveBidMatched);

	return (
		<Router>
			<Header></Header>
			<div className="App">
				<main>
					<Switch>
						{isActive && (
							<Route path="/(.+)">
								<Redirect to="/"></Redirect>
							</Route>
						)}
						<Route path="/sell">
							<Sell exchangeRate={exchangeRate} />
						</Route>
						<Route path="/buy">
							<Buy exchangeRate={exchangeRate} />
						</Route>
						<Route path="/">
							{isActive ? (
								isMatched ? (
									<Match></Match>
								) : (
									<Waiting></Waiting>
								)
							) : (
								<Home exchangeRate={exchangeRate} />
							)}
						</Route>
					</Switch>
				</main>
			</div>
		</Router>
	);
}

export default App;
