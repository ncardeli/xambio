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
import { getUserData, isUserAuthenticated } from "state/selectors/auth";
import { doFetchActiveBid } from "state/actions/activeBid";
import paths from "./paths";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(doFetchExchangeRate());
  }, [dispatch]);

  const isAuth = useSelector(isUserAuthenticated);
  const { id: uid } = useSelector(getUserData);

  React.useEffect(() => {
    if (isAuth) {
      dispatch(doFetchActiveBid({ uid }));
    }
  }, [dispatch, isAuth, uid]);

  const isActive = useSelector(hasActiveBid);
  const isMatched = useSelector(isActiveBidMatched);

  return (
    <Router>
      <Header></Header>
      <main className="App mt-8">
        <Switch>
          <PrivateRoute
            path={`${paths.HISTORY}/:id`}
            render={({ match }) => <HistoryOperation id={match.params.id} />}
          ></PrivateRoute>
          <Route path={paths.LOGIN}>
            <Login />
          </Route>
          <PrivateRoute path={paths.HISTORY} component={History} />
          {isActive && (
            <Route path="/(.+)">
              <Redirect to={paths.ROOT}></Redirect>
            </Route>
          )}
          <PrivateRoute
            path={paths.SELL}
            render={() => <Sell />}
          ></PrivateRoute>
          <PrivateRoute path={paths.BUY} render={() => <Buy />}></PrivateRoute>
          <Route path={paths.ROOT}>
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
