import { useHistory } from "react-router-dom";
import { Button, Typography, Margin, Layout } from "components";

const PageNotFound: React.FC = () => {
  const history = useHistory();

  return (
    <Layout>
      <Typography fontSize="1.5rem">페이지를 찾을 수 없습니다</Typography>
      <Margin marginTop={24} />
      <Button type="button" onClick={() => history.push("/")}>
        홈으로 이동하기
      </Button>
    </Layout>
  );
};

export default PageNotFound;
