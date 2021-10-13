import { create, only, test, enforce } from "vest";

const suite = create("Form", (formData, fieldName) => {
  only(fieldName);

  test("email", "이메일을 입력해주세요", () => {
    enforce(formData.email).isNotEmpty();
  });

  test("password", "비밀번호를 입력해주세요", () => {
    enforce(formData.password).isNotEmpty();
  });

  test("authCode", "인증 코드를 입력해주세요", () => {
    enforce(formData.authCode).isNotEmpty();
  });

  test("newPassword", "새로운 비밀번호를 입력해주세요", () => {
    enforce(formData.newPassword).isNotEmpty();
  });

  test("newPasswordConfirm", "새로운 비밀번호 확인을 입력해주세요", () => {
    enforce(formData.newPasswordConfirm).isNotEmpty();
  });

  test(
    "newPasswordConfirm",
    "새로운 비밀번호와 새로운 비밀번호 확인이 일치하지 않습니다",
    () => {
      enforce(formData.newPasswordConfirm).equals(formData.newPassword);
    }
  );
});

export default suite;
