
import { expect } from "chai";
import { loginLocators } from "../support/locators/loginLocators";


beforeEach(() => {

  cy.fixture('products').as('products');
  cy.login().as('login');
});

describe('Buying itens', () => {
    
    describe('Add to cart', () => {

        it('Verifying the change of the button', () => {

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
                   
                        
                        cy.wrap($el)
                            .find('.pricebar')
                            .first()
                            .find('button')
                            .should('have.text','Remove')
   
                    }
                });
            });
        });

        it('Valid if the products go to cart', () => {

            //add to cart
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
                                .click();
                        }
                    });
                });

                cy.get('.shopping_cart_link').click();
                cy.url().should('include', '/cart.html');
            
                cy.get('.cart_item_label').each($el => {

                    let name = $el.find('a').text();
                    cy.get('@products').should('to.include', name);
                    
                });

        });

       
    });
});