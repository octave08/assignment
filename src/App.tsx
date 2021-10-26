import React from "react";
import { Switch, Route, Redirect, RouteProps } from "react-router-dom";

import {
  LoginPage,
  ResetPasswordPage,
  VerifyCodePage,
  ChangePasswordPage,
  MyInfoPage,
  PageNotFound,
} from "pages";

import { useAuth } from "hooks";

function PrivateRoute({ children, ...rest }: RouteProps) {
  const { accessToken } = useAuth();
  return (
    <Route
      {...rest}
      render={() => (accessToken ? children : <Redirect to="/" />)}
    />
  );
}

const App: React.FC = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route exact path="/reset-password">
          <ResetPasswordPage />
        </Route>
        <Route exact path="/reset-password/verify-code">
          <VerifyCodePage />
        </Route>
        <Route exact path="/reset-password/change-password">
          <ChangePasswordPage />
        </Route>
        <PrivateRoute exact path="/my-info">
          <MyInfoPage />
        </PrivateRoute>
        <Route component={PageNotFound} />
      </Switch>
    </main>
  );
};

export default App;
