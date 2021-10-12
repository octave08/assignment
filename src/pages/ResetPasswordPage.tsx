import { useHistory } from "react-router-dom";

const ResetPasswordPage: React.FC = () => {
  const history = useHistory();

  return (
    <div>
      <div>비밀번호 재설정 페이지</div>
      <button onClick={() => history.goBack()}>뒤로가기</button>
    </div>
  );
};

export default ResetPasswordPage;
