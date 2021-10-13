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

// 로그인 페이지(as B)
const LoginPage: React.FC = () => {
  const history = useHistory();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    // 로그인 Button을 클릭하면 아이디와 비밀번호를 검증 & 처리합니다.
    if (_.isEmpty(form.email) || _.isEmpty(form.password)) {
      alert("이메일 또는 비밀번호를 입력해주세요");
      return;
    }

    // 로그인 API를 호출하고 응답 결과에 따라 처리합니다.
    // 호출에 실패하면 메시지로 알립니다. (in login)
    const success = await login(form);
    if (success) {
      // 호출이 성공하면 회원 정보 조회 페이지로 이동합니다.
      history.push("/my-info");
    }
  };

  return (
    <Layout>
      <Typography fontSize="1.5rem">로그인 </Typography>
      <Margin marginTop={24} />
      {/* 아이디와 비밀번호를 입력 할 수 있는 Input Form과 로그인 Button을 배치합니다. */}
      <Form flexDirection="column">
        <TextField
          type="email"
          value={form.email}
          onChange={(value: string) => setForm({ ...form, email: value })}
          placeholder="이메일 입력"
        />
        <TextField
          type="password"
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
      {/* 비밀번호 재설정 Button을 배치합니다. */}
      {/* 클릭하면 비빌번호 재설정 > 인증 코드 발급 요청 페이지로 이동합니다. */}
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
