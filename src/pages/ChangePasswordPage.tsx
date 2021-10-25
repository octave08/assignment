import { useState } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import {
  Button,
  TextField,
  Typography,
  Margin,
  Layout,
  Form,
} from "components";
import { useResetPassword } from "hooks";
import suite from "utils/suite";

// 비밀번호 변경 페이지
const ChangePasswordPage: React.FC = () => {
  const history = useHistory();
  const { changePassword } = useResetPassword();
  const [form, setForm] = useState({
    newPassword: "",
    newPasswordConfirm: "",
  });
  const res = suite(form, _.keys(form));

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 비밀번호 변경하기 Button을 클릭하면 새로운 비밀번호와 새로운 비밀번호 확인을 검증합니다.
    if (res.hasErrors()) {
      alert(_.chain(res.getErrors()).flatMap().head().value());
      return;
    }

    // 비밀번호 변경 API를 호출하고 응답 결과에 따라 처리합니다.
    // 호출에 실패하면 메시지로 알립니다. (in changePassword)
    const success = await changePassword(form);
    if (success) {
      // 호출에 성공하면 메시지로 알립니다.
      alert("성공적으로 비밀번호가 변경되었습니다");
      history.push("/");
    }
  };

  return (
    <Layout>
      <Typography fontSize="1.5rem">비밀번호 재설정 </Typography>
      <Margin marginTop={24} />
      <Typography>비밀번호 변경 </Typography>
      <Margin marginTop={24} />
      {/* 새로운 비밀번호, 새로운 비밀번호 확인 Input Form과 비밀번호 변경하기 Button을 배치합니다. */}
      <Form onSubmit={submit} data-cy="changePasswordForm">
        <TextField
          type="password"
          value={form.newPassword}
          onChange={(value: string) => setForm({ ...form, newPassword: value })}
          placeholder="새로운 비밀번호 입력"
          data-cy="newPassword"
        />
        <TextField
          type="password"
          value={form.newPasswordConfirm}
          onChange={(value: string) =>
            setForm({ ...form, newPasswordConfirm: value })
          }
          placeholder="새로운 비밀번호 확인 입력"
          data-cy="newPasswordConfirm"
        />
        <Margin marginTop={16} />
        <Button type="submit">변경하기</Button>
      </Form>
    </Layout>
  );
};

export default ChangePasswordPage;
