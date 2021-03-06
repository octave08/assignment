import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import { useRecoilValue } from "recoil";

import { remainTimeState } from "states";

import {
  Button,
  TextField,
  Typography,
  Margin,
  Layout,
  Form,
} from "components";
import { useResetPassword, useInterval } from "hooks";
import { createSuite } from "utils/suite";

// 인증 코드 검증 페이지
const VerifyCodePage: React.FC = () => {
  const history = useHistory();
  const { verifyAuthCode } = useResetPassword();
  const remainTime = useRecoilValue(remainTimeState);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isCounting, setCounting] = useState(false);
  const [form, setForm] = useState({
    authCode: "",
  });
  const res = createSuite("verify_code_form", form);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 다음 Button을 클릭하면 인증 코드를 검증합니다.
    if (res.hasErrors()) {
      alert(_.chain(res.getErrors()).flatMap().head().value());
      return;
    }

    // 인증 코드 검증 API를 호출하고 응답 결과에 따라 처리합니다.
    // 호출에 실패하면 메시지로 알립니다. (in verifyAuthCode)
    const success = await verifyAuthCode(form);
    if (success) {
      // 호출이 성공하면 비밀번호 변경 페이지로 이동합니다.
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
    setCounting(true);
  }, [remainTime]);

  useInterval(
    () => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          setCounting(false);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    },
    isCounting ? 1000 : null
  );

  return (
    <Layout>
      <Typography fontSize="1.5rem">비밀번호 재설정 </Typography>
      <Margin marginTop={24} />
      <Typography>인증 코드 검증 </Typography>
      <Margin marginTop={24} />
      {/* 인증 코드를 입력 할 수 있는 Input Form과 인증 만료 시간 Counter, 다음 Button을 배치합니다. */}
      <Form onSubmit={submit} data-cy="authCodeForm">
        <TextField
          type="text"
          value={form.authCode}
          onChange={(value: string) => setForm({ ...form, authCode: value })}
          placeholder="인증 코드 입력"
        />
        <Margin marginTop={1} />
        {/* 인증 만료 시간 Counter는 앞서 저장한 남은 인증 시간을 활용해서 mm:ss로 표현합니다. */}
        <Typography fontSize="0.8rem" color="gray60" data-cy="counter">
          인증 시간 {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </Typography>
        <Margin marginTop={16} />
        <Button type="submit">다음</Button>
      </Form>
    </Layout>
  );
};

export default VerifyCodePage;
