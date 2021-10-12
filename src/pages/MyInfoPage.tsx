import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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

// 회원 정보 조회 페이지(as C)
const MyInfoPage: React.FC = () => {
  const history = useHistory();
  const { accessToken, logout } = useAuth();
  const [user, setUser] = useState<User | undefined>(undefined);

  // 페이지 진입 시 회원정보 조회 API를 호출합니다.
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
        // 호출이 성공하면 회원정보 조회 API의 응답 결과를 화면에 렌더링 합니다.
        setUser(data);
      })
      .catch(() => {
        // 호출에 실패하면 로그인 페이지로 이동합니다.
        history.push("/");
      });
  }, []);

  const handleClick = async () => {
    // 클릭하면 로그아웃 API를 호출하고 응답 결과에 따라 처리합니다.
    // 호출에 실패하면 메시지로 알립니다. (in logout)
    const success = await logout();
    if (success) {
      // 호출이 성공하면 로그인 페이지로 이동합니다.
      history.push("/");
    }
  };

  return (
    <Layout>
      <Typography fontSize="1.5rem">회원 정보 조회 </Typography>
      <Margin marginTop={24} />
      {/* 회원 정보를 보여줄 수 있는 Card를 배치합니다. */}
      <Card>
        {user ? (
          // 이름, 이메일, 프로필 이미지
          <>
            <Profile src={user?.profileImage} alt="프로필 이미지" />
            <Margin marginLeft={16} />
            <div>
              <Typography>{user?.name}</Typography>
              <Margin marginTop={2} />
              <Typography>{user?.email}</Typography>
            </div>
          </>
        ) : (
          <div>로딩중</div>
        )}
      </Card>
      <Margin marginTop={16} />
      {/* 로그아웃 Button을 배치합니다. */}

      <Button onClick={handleClick}>로그아웃</Button>
    </Layout>
  );
};

export default MyInfoPage;
