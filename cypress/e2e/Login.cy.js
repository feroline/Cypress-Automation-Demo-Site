
import { expect } from "chai";
import { loginLocators } from "../support/locators/loginLocators";

beforeEach(() => {
  cy.fixture('usersFixture').as('usersFixture')
  cy.visit('/');
});

describe('Login', () => {
  it.only('Standard User', () => {
  
    cy.get('@usersFixture').then((users) => {
      cy.get(loginLocators.INPUT_USERNAME)
        .type(users.username.standard);
      cy.get(loginLocators.INPUT_PASSWORD)
        .type(users.password);
    });
    cy.get(loginLocators.BUTTON_LOGIN)
      .click();
      
    cy.url()
      .should('include',Cypress.env('urls').inventory);
    
    let srcInventoryItens = [
      '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg',
      '/static/media/bike-light-1200x1500.37c843b0.jpg',
      '/static/media/bolt-shirt-1200x1500.c2599ac5.jpg',
      '/static/media/sauce-pullover-1200x1500.51d7ffaf.jpg', 
      '/static/media/red-onesie-1200x1500.2ec615b2.jpg',
    ];
    
    srcInventoryItens.forEach((src) => {
      cy.get('img.inventory_item_img').should('have.attr', 'src', src);
    });
    
  });
  
  it('Locked Out User', () => {

    cy.get('@usersFixture').then((users) => {
      cy.get(loginLocators.INPUT_USERNAME)
        .type(users.username.locked_out);
      cy.get(loginLocators.INPUT_PASSWORD)
        .type(users.password);
    });
    cy.get(loginLocators.BUTTON_LOGIN)
      .click();

    cy.get(loginLocators.ERROR_MESSAGE_CONTAINER)
      .should('be.visible')
      .get(loginLocators.TEXT_MESSAGE)
      .and('contain', 'Epic sadface: Sorry, this user has been locked out.');
  });

  it('Problem User', () => {

    cy.get('@usersFixture').then((users) => {
      cy.get(loginLocators.INPUT_USERNAME)
        .type(users.username.problem);
      cy.get(loginLocators.INPUT_PASSWORD)
        .type(users.password);
    });
    cy.get(loginLocators.BUTTON_LOGIN)
      .click();

    cy.url()
      .should('include',Cypress.env('urls').inventory);
  
    cy.get('img.inventory_item_img').should('have.not.attr', 'src', '/static/media/sl-404.168b1cce.jpg');
  });

});