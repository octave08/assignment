// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/");
  cy.get("[data-cy=loginForm]").within(() => {
    cy.get("[type=email]").type(email);
    cy.get("[type=password]").type(password);
    cy.get("[type=submit]").click();
  });
});

Cypress.Commands.add("requestAuthCode", (email) => {
  cy.visit("/reset-password");
  cy.get("[data-cy=emailForm]").within(() => {
    cy.get("[type=email]").type(email);
    cy.get("[type=submit]").click();
  });
});

Cypress.Commands.add("verifyAuthCode", (authCode) => {
  cy.get("[data-cy=authCodeForm]").within(() => {
    cy.get("[type=text]").type(authCode);
    cy.get("[type=submit]").click();
  });
});

Cypress.Commands.add("changePassword", (newPassword, newPasswordConfirm) => {
  cy.get("[data-cy=changePasswordForm]").within(() => {
    cy.get("[data-cy=newPassword]").type(newPassword);
    cy.get("[data-cy=newPasswordConfirm]").type(newPasswordConfirm);
    cy.get("[type=submit]").click();
  });
});

Cypress.Commands.add("resetPassword", () => {
  cy.fixture("users/admin.json").then((user) => {
    cy.requestAuthCode(user.email);
  });

  cy.fixture("resetPassword.json").then((resetPassword) => {
    cy.verifyAuthCode(resetPassword.authCode);
  });

  cy.fixture("users/admin.json").then((user) => {
    cy.changePassword(user.password, user.password);
  });
});
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
