/// <reference types="cypress" />

describe("VerifyCode Page", () => {
  before(() => {
    cy.fixture("users/admin.json").then((user) => {
      cy.requestAuthCode(user.email);
    });

    cy.fixture("resetPassword.json").then((resetPassword) => {
      cy.verifyAuthCode(resetPassword.authCode);
    });
  });

  beforeEach(() => {
    cy.visit("/reset-password/change-password");
  });

  it("새로운 비밀번호, 새로운 비밀번호 확인 Input Form과 비밀번호 변경하기 Button을 배치합니다.", () => {
    cy.get("[data-cy=changePasswordForm]").within(() => {
      cy.get("[data-cy=newPassword]").should("exist");
      cy.get("[data-cy=newPasswordConfirm]").should("exist");
      cy.get("[type=submit]").should("exist");
    });
  });

  it("비밀번호 변경하기 Button을 클릭하면 새로운 비밀번호와 새로운 비밀번호 확인을 검증합니다. (1)", () => {
    cy.get("[data-cy=changePasswordForm]").within(() => {
      cy.get("[type=submit]").click();
      cy.on("window:alert", (text) => {
        expect(text).to.contains("새로운 비밀번호를 입력해주세요");
      });
    });
  });

  it("비밀번호 변경하기 Button을 클릭하면 새로운 비밀번호와 새로운 비밀번호 확인을 검증합니다.(2)", () => {
    cy.get("[data-cy=changePasswordForm]").within(() => {
      cy.get("[data-cy=newPassword]").type("newPassword");
      cy.get("[type=submit]").click();
      cy.on("window:alert", (text) => {
        expect(text).to.contains("새로운 비밀번호 확인을 입력해주세요");
      });
    });
  });

  it("비밀번호 변경하기 Button을 클릭하면 새로운 비밀번호와 새로운 비밀번호 확인을 검증합니다. (3)", () => {
    cy.get("[data-cy=changePasswordForm]").within(() => {
      cy.get("[data-cy=newPassword]").type("newPassword");
      cy.get("[data-cy=newPasswordConfirm]").type("newPasswordConfirm");
      cy.get("[type=submit]").click();
      cy.on("window:alert", (text) => {
        expect(text).to.contains(
          "새로운 비밀번호와 새로운 비밀번호 확인이 일치하지 않습니다"
        );
      });
    });
  });

  it("비밀번호 변경하기 Button을 클릭하면 새로운 비밀번호와 새로운 비밀번호 확인을 검증합니다.(4)", () => {
    cy.get("[data-cy=changePasswordForm]").within(() => {
      cy.get("[data-cy=newPassword]").type("samePassword");
      cy.get("[data-cy=newPasswordConfirm]").type("samePassword");
      cy.get("[type=submit]").click();
      cy.on("window:alert", (text) => {
        expect(text).to.not.contains("새로운 비밀번호를 입력해주세요");
        expect(text).to.not.contains("새로운 비밀번호 확인을 입력해주세요");
        expect(text).to.not.contains(
          "새로운 비밀번호와 새로운 비밀번호 확인이 일치하지 않습니다"
        );
      });
    });
  });

  it("비밀번호 변경 API를 호출하고 응답 결과에 따라 처리합니다.", () => {
    cy.changePassword("samePassword", "samePassword");
    cy.on("window:alert", (text) => {
      expect(text).to.not.empty;
    });

    cy.changePassword("passwordA", "passwordB");
    cy.on("window:alert", (text) => {
      expect(text).to.not.empty;
    });
  });
});
