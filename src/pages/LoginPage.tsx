import { useHistory } from "react-router-dom";

import styled from "styled-components";
import { flexbox, FlexboxProps } from "styled-system";

import { Button, TextField, Typography, Margin } from "../components";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 40px 16px;
`;

const Form = styled.form<FlexboxProps>`
  display: flex;
  ${flexbox};

  input {
    margin-bottom: 8px;
  }
`;

const LoginPage: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <Typography fontSize="1.5rem">로그인 페이지</Typography>
      <Margin marginTop={24} />
      <Form flexDirection="column">
        <TextField placeholder="이메일 입력" />
        <TextField placeholder="비밀번호 입력" />
        <Margin marginTop={16} />
        <Button>로그인</Button>
      </Form>
      <Margin marginTop={16} />
      <Typography role="button" onClick={() => history.push("/reset-password")}>
        비밀번호 재설정
      </Typography>
    </Container>
  );
};

export default LoginPage;
