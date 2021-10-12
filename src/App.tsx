import { Switch, Route } from "react-router-dom";

import {
  LoginPage,
  ResetPasswordPage,
  VerifyCodePage,
  ChangePasswordPage,
  SearchUserInfoPage,
  PageNotFound,
} from "pages";

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
        <Route exact path="/search-user-info">
          <SearchUserInfoPage />
        </Route>
        <Route component={PageNotFound} />
      </Switch>
    </main>
  );
};

export default App;
