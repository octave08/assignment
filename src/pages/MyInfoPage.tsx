import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import styled from "styled-components";

import User from "entities/User";
import { Button, Typography, Margin, Layout, Card } from "components";
import { useAuth } from "hooks";
import axios from "axios";

const Profile = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

const MyInfoPage: React.FC = () => {
  const history = useHistory();
  const { accessToken, logout } = useAuth();
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/user",
      headers: {
        "Contnet-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(({ data }) => {
        setUser(data);
      })
      .catch((e) => {
        const message = _.get(e, "message");
        alert(message);
      });
  }, []);

  const handleClick = async () => {
    const success = await logout();
    if (success) {
      history.push("/");
    }
  };

  return (
    <Layout>
      <Typography fontSize="1.5rem">회원 정보 조회 </Typography>
      <Margin marginTop={24} />
      <Card>
        {user ? (
          <>
            <Profile src={user?.profileImage} alt="프로필 이미지" />
            <Margin marginLeft={16} />
            <div>
              <Typography>{user.name}</Typography>
              <Margin marginTop={2} />
              <Typography>{user.email}</Typography>
            </div>
          </>
        ) : (
          <div>로딩중</div>
        )}
      </Card>
      <Margin marginTop={16} />
      <Button onClick={handleClick}>로그아웃</Button>
    </Layout>
  );
};

export default MyInfoPage;
