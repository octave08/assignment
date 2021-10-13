/// <reference types="cypress" />

describe("VerifyCode Page", () => {
  beforeEach(() => {
    cy.fixture("users/admin.json").then((user) => {
      cy.requestAuthCode(user.email);
    });
    cy.visit("/reset-password/verify-code");
  });

  it("인증 코드를 입력 할 수 있는 Input Form과 인증 만료 시간 Counter, 다음 Button을 배치합니다.", () => {
    cy.get("[data-cy=authCodeForm]").within(() => {
      cy.get("[type=text]").should("exist");
      cy.get("[data-cy=counter]").should("exist");
      cy.get("[type=submit]").should("exist");
    });
  });

  it("인증 만료 시간 Counter는 앞서 저장한 남은 인증 시간을 활용해서 mm:ss로 표현합니다.", () => {
    cy.get("[data-cy=authCodeForm]").within(() => {
      cy.get("[data-cy=counter]").contains(/[1-9][0-9]*:[0-5][0-9]/);
    });
  });

  it("다음 Button을 클릭하면 인증 코드를 검증합니다.", () => {
    cy.get("[data-cy=authCodeForm]").within(() => {
      cy.get("[type=submit]").click();
      cy.on("window:alert", (text) => {
        expect(text).to.contains("인증 코드를 입력해주세요");
      });
    });
  });

  it("인증 코드 검증 API를 호출하고 응답 결과에 따라 처리합니다. (성공)", () => {
    cy.fixture("resetPassword.json").then((resetPassword) => {
      cy.verifyAuthCode(resetPassword.authCode);
      cy.url().should(
        "eq",
        Cypress.config().baseUrl + "/reset-password/change-password"
      );
    });
  });

  it("인증 코드 검증 API를 호출하고 응답 결과에 따라 처리합니다. (실패)", () => {
    cy.verifyAuthCode("invlidAuthCode");
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Request failed with status code");
    });
  });
});
