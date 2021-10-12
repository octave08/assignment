import { useCallback } from "react";
import axios from "axios";
import _ from "lodash";
import { useRecoilState } from "recoil";

import { authState } from "states";

const useAuth = (): {
  accessToken: string | undefined;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => Promise<boolean>;
} => {
  const [auth, setAuth] = useRecoilState(authState);

  const login = useCallback(
    async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<boolean> => {
      try {
        const { data, status } = await axios({
          method: "POST",
          url: "/api/login",
          headers: {
            "Contnet-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: {
            email,
            password,
          },
        });

        if (status === 200) {
          const accessToken = _.get(data, "accessToken");
          setAuth({
            accessToken,
          });
          return true;
        }

        alert(status);
        return false;
      } catch (e) {
        const message = _.get(e, "message");
        alert(message);
        return false;
      }
    },
    []
  );

  const logout = useCallback(async (): Promise<boolean> => {
    if (!auth.accessToken) {
      alert("로그인 되어 있지 않습니다");
      return false;
    }

    try {
      const { status } = await axios({
        method: "POST",
        url: "/api/logout",
        headers: {
          "Contnet-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (status === 200) {
        setAuth({
          accessToken: "",
        });
        return true;
      }

      alert(status);
      return false;
    } catch (e) {
      const message = _.get(e, "message");
      alert(message);
      return false;
    }
  }, []);

  return {
    accessToken: auth.accessToken,
    login,
    logout,
  };
};

export default useAuth;
