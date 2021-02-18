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
import { useQuery } from "react-query";
import { hasActiveBid, isActiveBidMatched } from "../selectors/activeBid";
import History from "./History";
import HistoryOperation from "./HistoryOperation";
import { REACT_QUERY_KEY } from "../constants/config";

import firebase from "firebase.js";

function App() {
  const { exchangeRate } = useExchangeRate();
  const isActive = useSelector(hasActiveBid);
  const isMatched = useSelector(isActiveBidMatched);

  return (
    <Router>
      <Header></Header>
      <main className="App mt-8">
        <Switch>
          <Route
            path="/history/:id"
            render={({ match }) => <HistoryOperation id={match.params.id} />}
          ></Route>
          <Route path="/history">
            <History />
          </Route>
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
    </Router>
  );
}

export default App;

function useExchangeRate() {
  const { data, isLoading, error } = useQuery(REACT_QUERY_KEY, async () => {
    const exchangeRate = firebase.functions().httpsCallable("exchangeRate");
    try {
      const result = await exchangeRate();
      return result.data.rate;
    } catch (error) {
      console.error(error);
    }
  });
  return { error, exchangeRate: data, isLoading };
}
