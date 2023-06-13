
import { expect } from "chai";
import { loginLocators } from "../support/locators/loginLocators";

beforeEach(() => {
  cy.fixture('usersFixture').as('usersFixture')
  cy.fixture('urlsFixture').as('urlsFixture');
  cy.visit('/');
});

//TODO TO REFACTOR: PEGAR O VALOR DE /STATIC/MEDIA/${VALOR} E COMPARAR COM O VALOR DA FIXTURE E DO ATTR
describe('Login', () => {
  it('Verify correct image to login with Standard User', () => {

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

    cy.get('@urlsFixture').then(urls => {
      //Faço o wrap para poder usar o alias e as assertions serem visualizadas no runner, 
      // com o expect não é possível que sejam visualizadas
      cy.wrap(urls.inventoryItens).as('inventoryItens');

      cy.get(loginLocators.INVENTORY_IMGS).each($el => {
        cy.get('@inventoryItens').should('include', $el.attr('src'));
      });
    });


  });

  it('Verify error message to Locked Out User', () => {

    cy.get('@usersFixture').then((users) => {
      cy.get(loginLocators.INPUT_USERNAME)
        .type(users.username.locked_out);
      cy.get(loginLocators.INPUT_PASSWORD)
        .type(users.password);
    });
    cy.get(loginLocators.BUTTON_LOGIN)
      .click();

    cy.url()
      .should('include', Cypress.env('urls').baseUrl);

    cy.get(loginLocators.ERROR_MESSAGE_CONTAINER)
      .should('be.visible')
      .get(loginLocators.TEXT_MESSAGE)
      .and('contain', 'Epic sadface: Sorry, this user has been locked out.');
  });

  it('Verify image to login with Problem User', () => {

    cy.get('@usersFixture').then((users) => {
      cy.get(loginLocators.INPUT_USERNAME)
        .type(users.username.problem);
      cy.get(loginLocators.INPUT_PASSWORD)
        .type(users.password);
    });
    cy.get(loginLocators.BUTTON_LOGIN)
      .click();

    cy.url()
      .should('include', Cypress.env('urls').inventory);

    cy.get('@urlsFixture').then(urls => {
      cy.get(loginLocators.INVENTORY_IMGS).should('have.attr', 'src', urls.errorImg);
    });

  });

  
  /**
   * EXPLAIN: This test is not failing because the maxTime is set to 4000 in cypress.config.js, 
   * the glitch is not so slow to fail the test of usbility.
   */
  it('Verify login with performance glitch user', () => {

    cy.get('@usersFixture').then((users) => {
      cy.get(loginLocators.INPUT_USERNAME)
        .type(users.username.performance_glitch);
      cy.get(loginLocators.INPUT_PASSWORD)
        .type(users.password);
    });
    cy.get(loginLocators.BUTTON_LOGIN)
      .click();

    cy.url()
      .should('include', Cypress.env('urls').inventory);

  });

  it('Verify login with blank password and username', () => {
    cy.get(loginLocators.INPUT_USERNAME)
      .type('{backspace}{backspace}{backspace}');

    cy.get(loginLocators.INPUT_PASSWORD)
      .type('{backspace}{backspace}{backspace}');

    cy.get(loginLocators.BUTTON_LOGIN)
      .click();

    cy.get(loginLocators.ERROR_MESSAGE_CONTAINER)
      .should('be.visible')
      .get(loginLocators.TEXT_MESSAGE)
      .and('contain', 'Epic sadface: Username is required');
  });


  it('Verify login with blank password', () => {

    cy.get('@usersFixture').then((users) => {
      cy.get(loginLocators.INPUT_USERNAME)
        .type(users.username.performance_glitch);
      cy.get(loginLocators.INPUT_PASSWORD)
        .type('{backspace}{backspace}{backspace}');
    });
 
    cy.get(loginLocators.BUTTON_LOGIN)
      .click();

    cy.get(loginLocators.ERROR_MESSAGE_CONTAINER)
      .should('be.visible')
      .get(loginLocators.TEXT_MESSAGE)
      .and('contain', 'Epic sadface: Password is required');
  });
  
  it('Verify login with incorrect password and correct username', () => {

    cy.get('@usersFixture').then((users) => {
      cy.get(loginLocators.INPUT_USERNAME)
        .type(users.username.standard);
      cy.get(loginLocators.INPUT_PASSWORD)
        .type('123456');
    });

    cy.get(loginLocators.BUTTON_LOGIN)
    .click();

  cy.get(loginLocators.ERROR_MESSAGE_CONTAINER)
    .should('be.visible')
    .get(loginLocators.TEXT_MESSAGE)
    .and('contain', 'Epic sadface: Username and password do not match any user in this service');
  });
  
  it('Verify login with correct password and incorrect username', () => {

    cy.get('@usersFixture').then((users) => {
      cy.get(loginLocators.INPUT_USERNAME)
        .type('incorrertUser-1');
      cy.get(loginLocators.INPUT_PASSWORD)
        .type(users.password);
    });

    cy.get(loginLocators.BUTTON_LOGIN)
    .click();

  cy.get(loginLocators.ERROR_MESSAGE_CONTAINER)
    .should('be.visible')
    .get(loginLocators.TEXT_MESSAGE)
    .and('contain', 'Epic sadface: Username and password do not match any user in this service');
  });

  it('Verify login with correct password and incorrect username', () => {

    cy.get('@usersFixture').then((users) => {
      cy.get(loginLocators.INPUT_USERNAME)
        .type('incorrertUser-1');
      cy.get(loginLocators.INPUT_PASSWORD)
        .type('incorrectPassword-1');
    });

    cy.get(loginLocators.BUTTON_LOGIN)
    .click();

  cy.get(loginLocators.ERROR_MESSAGE_CONTAINER)
    .should('be.visible')
    .get(loginLocators.TEXT_MESSAGE)
    .and('contain', 'Epic sadface: Username and password do not match any user in this service');
  });

});