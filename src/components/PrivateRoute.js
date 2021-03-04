import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { isUserAuthenticated } from "state/selectors/auth";
import paths from "./paths";

const PrivateRoute = ({ path, component: Component, render }) => {
  const isAuth = useSelector(isUserAuthenticated);

  return (
    <Route
      exact
      path={path}
      render={(...args) => {
        if (render) {
          return isAuth ? render(...args) : <Redirect to={paths.LOGIN} />;
        }
        return isAuth ? <Component /> : <Redirect to={paths.LOGIN} />;
      }}
    />
  );
};

PrivateRoute.propType = {
  path: PropTypes.string.isRequired,
  component: PropTypes.element,
};

export default PrivateRoute;
