import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Buy from "./Buy";
import Home from "./Home";
import Sell from "./Sell";

function App() {
	const [exchangeRate] = useState(42.5);

	return (
		<Router>
			<div className="App">
				<header className="App-header"></header>
				<main>
					<Switch>
						<Route path="/sell">
							<Sell exchangeRate={exchangeRate} />
						</Route>
						<Route path="/buy">
							<Buy exchangeRate={exchangeRate} />
						</Route>
						<Route path="/">
							<Home exchangeRate={exchangeRate} />
						</Route>
					</Switch>
				</main>
			</div>
		</Router>
	);
}

export default App;
