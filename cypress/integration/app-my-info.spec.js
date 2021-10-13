/// <reference types="cypress" />

describe("MyInfo Page", () => {
  before(() => {
    cy.resetPassword();
    cy.fixture("users/admin.json").then((user) => {
      cy.login(user.email, user.password);
    });
  });

  beforeEach(() => {
    cy.visit("/my-info");
    cy.intercept({
      method: "GET",
      url: "/api/user",
    }).as("getUser");
  });

  it("회원 정보를 보여줄 수 있는 Card를 배치합니다.", () => {
    cy.reload();
    cy.wait("@getUser", { timeout: 10000 });

    cy.get("[data-cy=myInfoCard]").within(() => {
      //이름, 이메일, 프로필 이미지
      cy.get("[data-cy=name]").should("have.text", "에이블리933");
      cy.get("[data-cy=email]").should("have.text", "ably933@dummy.com");
      cy.get("[data-cy=profile]").should("be.visible");
    });
  });

  it("로그아웃 Button을 배치합니다.", () => {
    cy.get("[data-cy=logoutButton]").should("have.text", "로그아웃");
  });

  it("클릭하면 로그아웃 API를 호출하고 응답 결과에 따라 처리합니다.", () => {
    cy.get("[data-cy=logoutButton]").click();
    //호출이 성공하면 로그인 페이지로 이동합니다.
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("페이지 진입 시 회원정보 조회 API를 호출합니다.", () => {
    cy.reload();
    cy.wait("@getUser", { timeout: 10000 });
  });
});
