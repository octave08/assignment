/// <reference types="cypress" />

describe("ResetPassword Page", () => {
  beforeEach(() => {
    cy.visit("/reset-password");
  });

  it("이메일을 입력 할 수 있는 Input Form과 다음(next) Button을 배치합니다.", () => {
    cy.get("[data-cy=emailForm]").within(() => {
      cy.get("[type=email]").should("exist");
    });
  });

  it("다음 Button을 클릭하면 이메일을 검증합니다.", () => {
    cy.get("[data-cy=emailForm]").within(() => {
      cy.get("[type=submit]").click();
      cy.on("window:alert", (text) => {
        expect(text).to.contains("이메일을 입력해주세요");
      });
    });
  });

  it("인증 코드 발급 요청 API를 호출하고 응답 결과에 따라 처리합니다. (실패)", () => {
    cy.requestAuthCode("inavlid@user.account");
    // 호출에 실패하면 메시지로 알립니다.
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Request failed with status code");
    });
  });

  it("인증 코드 발급 요청 API를 호출하고 응답 결과에 따라 처리합니다. (성공)", () => {
    cy.fixture("users/admin.json").then((user) => {
      cy.requestAuthCode(user.email);
      cy.url().should(
        "eq",
        Cypress.config().baseUrl + "/reset-password/verify-code"
      );
    });
  });
});
