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
import History from "./History";
import HistoryOperation from "./HistoryOperation";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";

import { useDispatch, useSelector } from "react-redux";
import { hasActiveBid, isActiveBidMatched } from "../state/selectors/activeBid";
import { doFetchExchangeRate } from "state/actions/exchangeRate";
import { isAuthenticated } from "state/selectors/auth";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(doFetchExchangeRate());
  }, [dispatch]);

  const isAuth = useSelector(isAuthenticated);
  const isActive = useSelector(hasActiveBid);
  const isMatched = useSelector(isActiveBidMatched);

  return (
    <Router>
      <Header></Header>
      <main className="App mt-8">
        <Switch>
          <PrivateRoute
            path="/history/:id"
            render={({ match }) => <HistoryOperation id={match.params.id} />}
          ></PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/history" component={History} />
          {isActive && (
            <Route path="/(.+)">
              <Redirect to="/"></Redirect>
            </Route>
          )}
          <PrivateRoute path="/sell" render={() => <Sell />}></PrivateRoute>
          <PrivateRoute path="/buy" render={() => <Buy />}></PrivateRoute>
          <Route path="/">
            {isAuth && isActive ? (
              isMatched ? (
                <Match></Match>
              ) : (
                <Waiting></Waiting>
              )
            ) : (
              <Home />
            )}
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
