import axios from "axios";
import _ from "lodash";
import { useRecoilState } from "recoil";

import resetPasswordState from "states/resetPasswordState";

interface RequestAuthCodeProps {
  email: string;
}

interface VerifyAuthCodeProps {
  authCode: string;
}

interface ChangePasswordProps {
  newPassword: string;
  newPasswordConfirm: string;
}

const useResetPassword = (): {
  requestAuthCode: ({ email }: RequestAuthCodeProps) => Promise<boolean>;
  verifyAuthCode: ({ authCode }: VerifyAuthCodeProps) => Promise<boolean>;
  changePassword: ({
    newPassword,
    newPasswordConfirm,
  }: ChangePasswordProps) => Promise<boolean>;
} => {
  const [resetPassword, setResetPassword] = useRecoilState(resetPasswordState);

  const requestAuthCode = async ({
    email,
  }: RequestAuthCodeProps): Promise<boolean> => {
    try {
      const { data, status } = await axios({
        method: "GET",
        url: "/api/reset-password",
        headers: {
          "Contnet-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        params: {
          email,
        },
      });

      if (status === 200) {
        const issueToken = _.get(data, "issueToken");
        setResetPassword({
          email,
          issueToken,
          confirmToken: "",
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
  };

  const verifyAuthCode = async ({ authCode }: VerifyAuthCodeProps) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: "/api/reset-password",
        headers: {
          "Contnet-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          email: resetPassword.email,
          authCode,
          issueToken: resetPassword.issueToken,
        },
      });

      if (status === 200) {
        const confirmToken = _.get(data, "confirmToken");
        setResetPassword({
          ...resetPassword,
          confirmToken,
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
  };

  const changePassword = async ({
    newPassword,
    newPasswordConfirm,
  }: ChangePasswordProps) => {
    try {
      const { status } = await axios({
        method: "PATCH",
        url: "/api/reset-password",
        headers: {
          "Contnet-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          email: resetPassword.email,
          confirmToken: resetPassword.confirmToken,
          newPassword,
          newPasswordConfirm,
        },
      });

      if (status === 200) {
        return true;
      }

      alert(status);
      return false;
    } catch (e) {
      const message = _.get(e, "message");
      alert(message);
      return false;
    }
  };

  return {
    requestAuthCode,
    verifyAuthCode,
    changePassword,
  };
};

export default useResetPassword;
