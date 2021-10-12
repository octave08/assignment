import { useState } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import styled from "styled-components";
import { flexbox, FlexboxProps } from "styled-system";

import { Button, TextField, Typography, Margin, Layout } from "components";
import { useAuth } from "hooks";

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
    if (_.isEmpty(form.email) || _.isEmpty(form.password)) {
      alert("이메일 또는 비밀번호를 입력해주세요");
      return;
    }

    const success = await login(form);
    if (!success) {
      return;
    }

    history.push("/my-info");
  };

  return (
    <Layout>
      <Typography fontSize="1.5rem">로그인 </Typography>
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
      <Typography
        role="button"
        fontSize="0.8rem"
        color="gray60"
        onClick={() => history.push("/reset-password")}
      >
        비밀번호 재설정
      </Typography>
    </Layout>
  );
};

export default LoginPage;
