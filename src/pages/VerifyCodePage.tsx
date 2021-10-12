import { useState } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import styled from "styled-components";
import { flexbox, FlexboxProps } from "styled-system";

import { Button, TextField, Typography, Margin, Layout } from "components";
import { useResetPassword } from "hooks";

const Form = styled.form<FlexboxProps>`
  display: flex;
  ${flexbox};

  input {
    margin-bottom: 8px;
  }
`;

const VerifyCodePage: React.FC = () => {
  const history = useHistory();
  const { verifyAuthCode } = useResetPassword();
  const [form, setForm] = useState({
    authCode: "",
  });

  const submit = async () => {
    if (_.isEmpty(form.authCode)) {
      alert("인증 코드를 입력해주세요");
      return;
    }

    const success = await verifyAuthCode(form);
    if (success) {
      history.push("/reset-password/change-password");
    }
  };

  return (
    <Layout>
      <Typography fontSize="1.5rem">비밀번호 재설정 </Typography>
      <Margin marginTop={24} />
      <Typography>인증 코드 검증 </Typography>
      <Margin marginTop={24} />
      <Form flexDirection="column">
        <TextField
          value={form.authCode}
          onChange={(value: string) => setForm({ ...form, authCode: value })}
          placeholder="인증 코드 입력"
        />
        <Margin marginTop={1} />
        <Typography>Counter</Typography>
        <Margin marginTop={16} />
        <Button type="button" onClick={submit}>
          다음
        </Button>
      </Form>
    </Layout>
  );
};

export default VerifyCodePage;
