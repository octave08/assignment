import { useState } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import styled from "styled-components";
import { flexbox, FlexboxProps } from "styled-system";

import { Button, TextField, Typography, Margin, Layout } from "components";
import useResetPassword from "hooks/useResetPassword";

const Form = styled.form<FlexboxProps>`
  display: flex;
  ${flexbox};

  input {
    margin-bottom: 8px;
  }
`;

const ResetPasswordPage: React.FC = () => {
  const history = useHistory();
  const { requestAuthCode } = useResetPassword();
  const [form, setForm] = useState({
    email: "",
  });

  const submit = async () => {
    if (_.isEmpty(form.email)) {
      alert("이메일을 입력해주세요");
      return;
    }

    const success = await requestAuthCode(form);
    if (success) {
      history.push("/reset-password/verify-code");
    }
  };

  return (
    <Layout>
      <Typography fontSize="1.5rem">비밀번호 재설정 페이지</Typography>
      <Margin marginTop={24} />
      <Form flexDirection="column">
        <TextField
          value={form.email}
          onChange={(value: string) => setForm({ ...form, email: value })}
          placeholder="이메일 입력"
        />
        <Margin marginTop={16} />
        <Button type="button" onClick={submit}>
          다음
        </Button>
      </Form>
    </Layout>
  );
};

export default ResetPasswordPage;
