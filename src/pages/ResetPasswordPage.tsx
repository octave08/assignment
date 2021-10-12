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

// 비밀번호 재설정 페이지(as A)
const ResetPasswordPage: React.FC = () => {
  const history = useHistory();
  const { requestAuthCode } = useResetPassword();
  const [form, setForm] = useState({
    email: "",
  });

  const submit = async () => {
    // 다음 Button을 클릭하면 이메일을 검증합니다.
    if (_.isEmpty(form.email)) {
      alert("이메일을 입력해주세요");
      return;
    }

    // 인증 코드 발급 요청 API를 호출하고 응답 결과에 따라 처리합니다.
    // 호출에 실패하면 메시지로 알립니다. (in requestAuthCode)
    const success = await requestAuthCode(form);
    if (success) {
      // 호출이 성공하면 인증 코드 검증 페이지로 이동합니다.
      history.push("/reset-password/verify-code");
    }
  };

  return (
    <Layout>
      <Typography fontSize="1.5rem">비밀번호 재설정 </Typography>
      <Margin marginTop={24} />
      <Typography>인증 코드 발급 요청 </Typography>
      <Margin marginTop={24} />
      {/* 이메일을 입력 할 수 있는 Input Form과 다음(next) Button을 배치합니다. */}
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
