import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import styled from "styled-components";
import { flexbox, FlexboxProps } from "styled-system";
import { useRecoilValue } from "recoil";

import { remainTimeState } from "states";

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
  const remainTime = useRecoilValue(remainTimeState);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
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

  useEffect(() => {
    let remainMillisecond = remainTime - _.now();
    if (remainMillisecond <= 0) {
      remainMillisecond = 0;
    }

    setMinutes(_.toInteger(remainMillisecond / 1000 / 60));
    setSeconds(_.toInteger((remainMillisecond / 1000) % 60));
  }, [remainTime]);

  useEffect(() => {
    const countDown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countDown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countDown);
  }, [minutes, seconds]);

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
        <Typography fontSize="0.8rem" color="gray60">
          인증 시간 {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </Typography>
        <Margin marginTop={16} />
        <Button type="button" onClick={submit}>
          다음
        </Button>
      </Form>
    </Layout>
  );
};

export default VerifyCodePage;
