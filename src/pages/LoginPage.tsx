import { useState } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import styled from "styled-components";
import { flexbox, FlexboxProps } from "styled-system";

import { Button, TextField, Typography, Margin } from "components";
import useAuth from "hooks/useAuth";

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
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    // Check a validation of form state
    // 1. is form empty?
    if (_.isEmpty(form.email) || _.isEmpty(form.password)) {
      alert("이메일 또는 비밀번호를 입력해주세요");
      return;
    }

    // 2. is account validate (with API)
    const accessToken = await login(form);
    if (_.isEmpty(accessToken)) {
      alert("로그인 실패");
      return;
    }

    // route to /search-user-info
    history.push("/search-user-info");
  };

  return (
    <Container>
      <Typography fontSize="1.5rem">로그인 페이지</Typography>
      <Margin marginTop={24} />
      <Form flexDirection="column">
        <TextField
          value={form.email}
          onChange={(value: string) => setForm({ ...form, email: value })}
          placeholder="이메일 입력"
        />
        <TextField
          value={form.password}
          onChange={(value: string) => setForm({ ...form, password: value })}
          placeholder="비밀번호 입력"
        />
        <Margin marginTop={16} />
        <Button type="button" onClick={submit}>
          로그인
        </Button>
      </Form>
      <Margin marginTop={16} />
      <Typography role="button" onClick={() => history.push("/reset-password")}>
        비밀번호 재설정
      </Typography>
    </Container>
  );
};

export default LoginPage;
