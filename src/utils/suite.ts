import { create, only, test, enforce } from "vest";
import _ from "lodash";

export const createSuite = (formName: string, formData: any) => {
  return create(formName, (data, fieldName) => {
    only(fieldName);

    test("email", "이메일을 입력해주세요", () => {
      enforce(data.email).isNotEmpty();
    });

    test("password", "비밀번호를 입력해주세요", () => {
      enforce(data.password).isNotEmpty();
    });

    test("authCode", "인증 코드를 입력해주세요", () => {
      enforce(data.authCode).isNotEmpty();
    });

    test("newPassword", "새로운 비밀번호를 입력해주세요", () => {
      enforce(data.newPassword).isNotEmpty();
    });

    test("newPasswordConfirm", "새로운 비밀번호 확인을 입력해주세요", () => {
      enforce(data.newPasswordConfirm).isNotEmpty();
    });

    test(
      "newPasswordConfirm",
      "새로운 비밀번호와 새로운 비밀번호 확인이 일치하지 않습니다",
      () => {
        enforce(data.newPasswordConfirm).equals(data.newPassword);
      }
    );
  })(formData, _.keys(formData));
};
