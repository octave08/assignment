import { useState } from "react";
import axios from "axios";
import _ from "lodash";

const useAuth = (): {
  accessToken: string | undefined;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<string | undefined>;
  logout: () => Promise<void>;
} => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string | undefined> => {
    try {
      const { data } = await axios({
        method: "POST",
        url: "/api/login",
        headers: {
          "Contnet-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          // test account
          email: "ably933@dummy.com",
          password: "!abc321#$",

          // email: email,
          // password: password,
        },
      });

      const token = _.get(data, "accessToken");
      setAccessToken(token);

      return token;
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    if (!accessToken) {
      alert("로그인 되어 있지 않습니다");
      return;
    }

    try {
      const { data } = await axios({
        method: "POST",
        url: "/api/logout",
        headers: {
          "Contnet-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      });

      const lastConnectedAt = _.get(data, "lastConnectedAt");
      console.log(lastConnectedAt);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    accessToken,
    login,
    logout,
  };
};

export default useAuth;
