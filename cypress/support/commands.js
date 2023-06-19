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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { loginLocators } from "./locators/loginLocators";
//TODO: CREATE A LOGIN WITH A PARAMETER
Cypress.Commands.add('login', (username, password) => {
    cy.visit('/');
    cy.fixture('usersFixture').as('usersFixture')
    
    cy.get('@usersFixture').then((users) => {
        cy.get(loginLocators.INPUT_USERNAME)
          .type(users.username.standard);
        cy.get(loginLocators.INPUT_PASSWORD)
          .type(users.password);
      });
      cy.get(loginLocators.BUTTON_LOGIN)
        .click();
  
      cy.url()
        .should('include', Cypress.env('urls').inventory);
})