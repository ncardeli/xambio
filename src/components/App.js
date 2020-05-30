import React, { useState } from "react";
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
import { useSelector } from "react-redux";
import { hasActiveBid as hasActiveBidSelector } from "../selectors/activeBid";

function App() {
	const [exchangeRate] = useState(42.5);
	const hasActiveBid = useSelector(hasActiveBidSelector);

	return (
		<Router>
			<div className="App">
				<header className="App-header"></header>
				<main>
					<Switch>
						{hasActiveBid && (
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
							{hasActiveBid ? (
								<Waiting></Waiting>
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
