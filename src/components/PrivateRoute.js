import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { isAuthenticated } from "state/selectors/auth";

const PrivateRoute = ({ path, component: Component, render }) => {
  const isAuth = useSelector(isAuthenticated);

  return (
    <Route
      exact
      path={path}
      render={(...args) => {
        if (render) {
          return isAuth ? render(...args) : <Redirect to={"/login"} />;
        }
        return isAuth ? <Component /> : <Redirect to={"/login"} />;
      }}
    />
  );
};

PrivateRoute.propType = {
  path: PropTypes.string.isRequired,
  component: PropTypes.element,
};

export default PrivateRoute;
