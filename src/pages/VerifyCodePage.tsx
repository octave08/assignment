import { useHistory } from "react-router-dom";

const VerifyCodePage: React.FC = () => {
  const history = useHistory();

  return (
    <div>
      <div>인증 코드 검증 페이지</div>
      <button onClick={() => history.goBack()}>뒤로가기</button>
    </div>
  );
};

export default VerifyCodePage;
