import { useHistory } from "react-router-dom";

const LoginPage: React.FC = () => {
  const history = useHistory();

  return (
    <div>
      <div>로그인 페이지</div>
      <button onClick={() => history.goBack()}>뒤로가기</button>
    </div>
  );
};

export default LoginPage;
