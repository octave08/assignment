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

const ChangePasswordPage: React.FC = () => {
  const history = useHistory();
  const { changePassword } = useResetPassword();
  const [form, setForm] = useState({
    newPassword: "",
    newPasswordConfirm: "",
  });

  const submit = async () => {
    if (_.isEmpty(form.newPassword) || _.isEmpty(form.newPasswordConfirm)) {
      alert("비밀번호 및 비밀번호 확인을 입력해주세요");
      return;
    }

    if (form.newPassword !== form.newPasswordConfirm) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다");
      return;
    }

    const success = await changePassword(form);
    if (success) {
      alert("성공적으로 비밀번호가 변경되었습니다");
    } else {
      alert("비밀번호 변경에 실패했습니다");
    }
  };

  return (
    <Layout>
      <Typography fontSize="1.5rem">비밀번호 재설정 페이지</Typography>
      <Margin marginTop={24} />
      <Typography>비밀번호 변경 페이지</Typography>
      <Margin marginTop={24} />
      <Form flexDirection="column">
        <TextField
          value={form.newPassword}
          onChange={(value: string) => setForm({ ...form, newPassword: value })}
          placeholder="비밀번호 입력"
        />
        <TextField
          value={form.newPasswordConfirm}
          onChange={(value: string) =>
            setForm({ ...form, newPasswordConfirm: value })
          }
          placeholder="비밀번호 확인 입력"
        />
        <Margin marginTop={16} />
        <Button type="button" onClick={submit}>
          변경하기
        </Button>
        <Margin marginTop={2} />
        <Button type="button" onClick={() => history.push("/")}>
          로그인 페이지로 이동
        </Button>
      </Form>
    </Layout>
  );
};

export default ChangePasswordPage;
