
import { expect } from "chai";
import { loginLocators } from "../support/locators/loginLocators";


beforeEach(() => {

  cy.fixture('products').as('products');
  cy.login().as('login');
});

describe('Buying itens', () => {
    
    describe('Add to cart', () => {

        it('Add to cart from the home page', () => {

            cy.get('@products').each(product => {
                cy.get('.inventory_item').each($el => {
                    
                    let name = $el
                        .find('.inventory_item_description')
                        .find('.inventory_item_name');
                
                    if(name.text() == product){
                        cy.wrap($el)
                            .find('.pricebar')
                            .first()
                            .find('button')
                            .should('have.text','Add to cart')
                            .click();
                    }
                });
            });

            // cy.get('.shopping_cart_link').click();
            // cy.url().should('include', '/cart.html');

            // cy.get('.inventory_item_name').should('have.text','Sauce Labs Backpack');

            // cy.get('.pricebar')
            //     .first()
            //     .find('button')
            //     .as('removeButton')
            //     .should('have.text','Remove')
            //     .should('have.attr','data-test','remove-sauce-labs-backpack')


        });
    });
});