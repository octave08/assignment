import { useHistory } from "react-router-dom";

const SearchUserInfoPage: React.FC = () => {
  const history = useHistory();

  return (
    <div>
      <div>회원 정보 조회 페이지</div>
      <button onClick={() => history.goBack()}>뒤로가기</button>
    </div>
  );
};

export default SearchUserInfoPage;
