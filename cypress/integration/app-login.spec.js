/// <reference types="cypress" />

describe("MyInfo Page", () => {
  before(() => {
    cy.resetPassword();
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("아이디와 비밀번호를 입력 할 수 있는 Input Form과 로그인 Button을 배치합니다.", () => {
    cy.get("[data-cy=loginForm]").within(() => {
      cy.get("[type=email]").should("exist");
      cy.get("[type=password]").should("exist");
    });
  });

  it("로그인 Button을 클릭하면 아이디와 비밀번호를 검증 & 처리합니다. (1)", () => {
    cy.get("[data-cy=loginForm]").within(() => {
      // 아이디와 비밀번호가 비어있는 경우
      cy.get("[type=submit]").click();
      cy.on("window:alert", (text) => {
        expect(text).to.contains("이메일을 입력해주세요");
      });
    });
  });

  it("로그인 Button을 클릭하면 아이디와 비밀번호를 검증 & 처리합니다. (2)", () => {
    cy.get("[data-cy=loginForm]").within(() => {
      // 아이디만 입력 한 경우
      cy.get("[type=email]").type("moing@moing.com");
      cy.get("[type=submit]").click();
      cy.on("window:alert", (text) => {
        expect(text).to.contains("비밀번호를 입력해주세요");
      });
    });
  });

  it("로그인 Button을 클릭하면 아이디와 비밀번호를 검증 & 처리합니다.(3)", () => {
    cy.get("[data-cy=loginForm]").within(() => {
      // 아이디와 비밀번호를 모두 입력 한 경우
      cy.get("[type=email]").type("moing@moing.com");
      cy.get("[type=password]").type("moing");
      cy.get("[type=submit]").click();
      cy.on("window:alert", (text) => {
        expect(text).to.not.contains("이메일을 입력해주세요");
        expect(text).to.not.contains("비밀번호를 입력해주세요");
      });
    });
  });

  it("로그인 API를 호출하고 응답 결과에 따라 처리합니다. (성공)", () => {
    cy.fixture("users/admin.json").then((user) => {
      cy.login(user.email, user.password);
      cy.url().should("eq", Cypress.config().baseUrl + "/my-info");
    });
  });

  it("로그인 API를 호출하고 응답 결과에 따라 처리합니다. (실패)", () => {
    cy.login("invalid@user.com", "invalidPassword");
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Request failed with status code");
    });
  });

  it("비밀번호 재설정 Button을 배치합니다.", () => {
    cy.get("[data-cy=resetPasswordButton]").should(
      "have.text",
      "비밀번호 재설정"
    );
  });

  it("클릭하면 비빌번호 재설정 > 인증 코드 발급 요청 페이지로 이동합니다.", () => {
    cy.get("[data-cy=resetPasswordButton]").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/reset-password");
  });
});
