import { useHistory } from "react-router-dom";

const LoginPage: React.FC = () => {
  const history = useHistory();

  return (
    <div>
      <div>페이지를 찾을 수 없습니다</div>
      <button onClick={() => history.push("/")}>홈으로 이동</button>
    </div>
  );
};

export default LoginPage;
