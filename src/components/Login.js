import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "firebase.js";
import { doAuthCleanUp, doAuthWithSocialMedia } from "state/actions/auth";
import Panel from "./Panel";
import { isAuthenticated } from "state/selectors/auth";
import { Redirect } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthenticated);

  React.useEffect(() => {
    dispatch(doAuthCleanUp());
  }, [dispatch]);

  const onSignInSuccessHandler = (authResult) => {
    dispatch(doAuthWithSocialMedia(authResult));
  };

  const onSignInFailHandler = () => {};

  const redirect = isAuth && <Redirect to={"/"} />;

  return (
    <Panel type="main" title="Inicia sesión para continuar">
      {redirect}
      <StyledFirebaseAuth
        uiConfig={uiConfig(onSignInSuccessHandler, onSignInFailHandler)}
        firebaseAuth={firebase.auth()}
      />
    </Panel>
  );
}

function uiConfig(onSignInSuccessHandler, onSignInFailHandler) {
  return {
    callbacks: {
      signInSuccessWithAuthResult: onSignInSuccessHandler,
      signInFailure: onSignInFailHandler,
    },
    signInFlow: "popup",
    signInSuccessUrl: "/home",
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        fullLabel: "Iniciar sesión con Google",
        scopes: ["https://www.googleapis.com/auth/userinfo.email"],
      },
    ],
  };
}

export default Login;
