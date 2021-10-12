import { Switch, Route, useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  compose,
  flexbox,
  FlexboxProps,
  color,
  ColorProps,
  typography,
  TypographyProps,
} from "styled-system";

import {
  LoginPage,
  ResetPasswordPage,
  VerifyCodePage,
  ChangePasswordPage,
  SearchUserInfoPage,
  PageNotFound,
} from "./pages";

const Nav = styled.nav<FlexboxProps>`
  display: flex;
  ${flexbox}
`;

const Typography = styled.div<TypographyProps | ColorProps>(
  compose(typography, color)
);

const App: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <Nav flexDirection="column">
        <Typography color="gray90">Simple Navigator</Typography>
        <ul>
          <li>
            <button onClick={() => history.push("/")}>
              로그인 페이지(홈 페이지)
            </button>
          </li>
          <li>
            <button onClick={() => history.push("/reset-password")}>
              비밀번호 재설정 페이지
            </button>
          </li>
          <li>
            <button onClick={() => history.push("/reset-password/verify-code")}>
              인증 코드 검증 페이지
            </button>
          </li>
          <li>
            <button
              onClick={() => history.push("/reset-password/change-password")}
            >
              비밀번호 변경 페이지
            </button>
          </li>
          <li>
            <button onClick={() => history.push("/search-user-info")}>
              회원 정보 조회 페이지
            </button>
          </li>
        </ul>
      </Nav>
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
    </>
  );
};

export default App;
