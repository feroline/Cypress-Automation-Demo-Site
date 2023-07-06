import { cartLocators } from "../support/locators/cartLocators";
import { inventoryLocators } from "../support/locators/inventoryLocators";
import { faker } from "@faker-js/faker";

beforeEach(() => {
  cy.fixture("products").as("products");
  cy.login().as("login");
});

describe("Buying itens", () => {
  describe("Add and Remove to cart", () => {
    it("Verifying the change of the button with many products", () => {
      cy.get("@products").each((product) => {
        cy.get(inventoryLocators.INVENTORY_ITEM).each(($el) => {
          let productName = $el.find(inventoryLocators.INVENTORY_ITEM_NAME);

          if (productName.text() == product) {
            cy.wrap($el)
              .find(inventoryLocators.PRICEBAR)
              .first()
              .find("button")
              .should("have.text", "Add to cart")
              .click();

            cy.wrap($el)
              .find(inventoryLocators.PRICEBAR)
              .first()
              .find("button")
              .should("have.text", "Remove");
          }
        });
      });
    });

    it("Valid if the products go to cart", () => {
      //add to cart
      cy.get("@products").each((product) => {
        cy.get(inventoryLocators.INVENTORY_ITEM).each(($el) => {
          let name = $el
            .find(inventoryLocators.IVENTORY_ITEM_DESCRIPTION)
            .find(inventoryLocators.INVENTORY_ITEM_NAME);

          if (name.text() == product) {
            cy.wrap($el)
              .find(inventoryLocators.PRICEBAR)
              .first()
              .find("button")
              .click();
          }
        });
      });

      //remove from cart
      cy.get(inventoryLocators.CART).click();
      cy.url().should("include", Cypress.env("urls").cart);

      cy.get(".cart_item_label").each(($el) => {
        let name = $el.find("a").text();
        cy.get("@products").should("to.include", name);
      });
    });

    it("add to card from product page", () => {
      cy.get(inventoryLocators.INVENTORY_ITEM_NAME)
        .first()
        .click()
        .then(($el) => {
          let productName = $el.text();

          cy.get(inventoryLocators.PRODUCT_PAGE.DETAILS_NAME).should(
            "to.contain",
            productName
          );

          cy.get(inventoryLocators.PRODUCT_PAGE.DETAILS_CONTAINER)
            .find("button")
            .should("have.text", "Add to cart")
            .click();

          cy.get(inventoryLocators.CART).click();
          cy.url().should("include", Cypress.env("urls").cart);
          cy.get(inventoryLocators.INVENTORY_ITEM_NAME).should(
            "to.contain",
            productName
          );
        });
    });

    it("remove from card ", () => {
      cy.get(inventoryLocators.INVENTORY_ITEM_NAME)
        .first()
        .click()
        .then(($el) => {
          let productName = $el.text();

          cy.get(inventoryLocators.PRODUCT_PAGE.DETAILS_CONTAINER)
            .find("button")
            .should("have.text", "Add to cart")
            .click();

          cy.get(inventoryLocators.CART).click();
          cy.url().should("include", Cypress.env("urls").cart);
          cy.get(inventoryLocators.CART_LIST).should("to.contain", productName);

          cy.get(inventoryLocators.CART_ITEM_PRICEBAR)
            .first()
            .find("button")
            .should("have.text", "Remove")
            .click();

          cy.get(inventoryLocators.CART_LIST).should(
            "to.not.contain",
            productName
          );
        });
    });
  });

  describe("Confirming the purchase", () => {
    it("Confirming the purchase with item", () => {
      cy.get(inventoryLocators.INVENTORY_ITEM_NAME)
        .first()
        .click()
        .then(($el) => {
          let productName = $el.text();

          cy.get(inventoryLocators.PRODUCT_PAGE.DETAILS_CONTAINER)
            .find("button")
            .should("have.text", "Add to cart")
            .click();

          cy.get(inventoryLocators.CART).click();
          cy.url().should("include", Cypress.env("urls").cart);
          cy.get(inventoryLocators.CART_LIST).should("to.contain", productName);

          doCheckout();
        });
    });

    it("Confirming the purchase with +1 itens", () => {
      
      cy.get(inventoryLocators.INVENTORY_ITEM).each(($el) => {
        

        cy.wrap($el)
          .find(inventoryLocators.PRICEBAR)
          .first()
          .find("button")
          .click({
            multiple: true,
          });
      });
        
      let itensName = getInventoryItemsName();      
      
      cy.get(inventoryLocators.CART).click();
      cy.url().should("include", Cypress.env("urls").cart);

      cy.wrap(itensName).then((names) => {
        for(let name of names) {
          cy.get(inventoryLocators.CART_LIST).should("to.contain", name );
        };
      });
      
      doCheckout();
    });
    
    it.skip("Confirming the purchase with no item", () => {
      cy.get(inventoryLocators.CART).click();
      cy.url().should("include", Cypress.env("urls").cart);
    
      cy.get(cartLocators.BTN_CHECKOUT).click();
      cy.url().should("not.include", Cypress.env("urls").checkout);

    });

    //TODO: ADICIONAR CENÁRIO DE COMPRA COM DADOS INVÁLIDOS
    it.skip('Confirming the purchase with invalid data', () => {
      cy.get(inventoryLocators.CART).click();
      cy.url().should("include", Cypress.env("urls").cart);
    
      cy.get(cartLocators.BTN_CHECKOUT).click();
      cy.url().should("include", Cypress.env("urls").checkout);

      cy.get(cartLocators.INPUT_FIRST_NAME).type(faker.person.firstName().repeat(100));
      cy.get(cartLocators.INPUT_LAST_NAME).type(faker.person.lastName().repeat(100));
      cy.get(cartLocators.POSTAL_CODE).type(
        faker.location.zipCode("#####")
      );

      cy.get(cartLocators.BTN_CONTINUE).click();
      cy.url().should("not.include", Cypress.env("urls").checkoutConfirm);
    });
    
    //TODO: ADICIONAR CENÁRIO DE COMPRA SEM DADOS
    it.only('Confirming the purchase without data', () => {
      cy.get(inventoryLocators.CART).click();
      cy.url().should("include", Cypress.env("urls").cart);
    
      cy.get(cartLocators.BTN_CHECKOUT).click();
      cy.url().should("include", Cypress.env("urls").checkout);

      cy.get(cartLocators.INPUT_FIRST_NAME).type('{BACKSPACE}{BACKSPACE}{BACKSPACE}{BACKSPACE}');
      cy.get(cartLocators.INPUT_LAST_NAME).type('{BACKSPACE}{BACKSPACE}{BACKSPACE}{BACKSPACE}');
      cy.get(cartLocators.POSTAL_CODE).type('{BACKSPACE}{BACKSPACE}{BACKSPACE}{BACKSPACE}');

      cy.get(cartLocators.BTN_CONTINUE).click();
      cy.url().should("not.include", Cypress.env("urls").checkoutConfirm);
    });
    //TODO: ADICIONAR CENÁRIO DE COMPRA SEM O FIRSTNAME
    //TODO: ADICIONAR CENÁRIO DE COMPRA SEM O CEP
    //TODO: ADICIONAR CENÁRIO DE COMPRA SEM O LASTNAME
  });
});

function getInventoryItemsName(){

  const itemsName = new Promise((resolve, reject) => {
    let names = new Array();

    cy.get(inventoryLocators.INVENTORY_ITEM_NAME).each(($el) => {
      names.push($el.text());
    });

    resolve(names);
  });

  return itemsName;
};

function doCheckout(){
  cy.get(cartLocators.BTN_CHECKOUT).click();
  cy.url().should("include", Cypress.env("urls").checkout);

  cy.get(cartLocators.INPUT_FIRST_NAME).type(faker.person.firstName());
  cy.get(cartLocators.INPUT_LAST_NAME).type(faker.person.lastName());
  cy.get(cartLocators.POSTAL_CODE).type(
    faker.location.zipCode("#####-###")
  );
  cy.get(cartLocators.BTN_CONTINUE).click();
  cy.url().should("include", Cypress.env("urls").checkoutConfirm);
  cy.get(cartLocators.BTN_FINISH).click();
  cy.url().should("include", Cypress.env("urls").checkoutComplete);
  cy.get(cartLocators.COMPLETE_CHECKOUT)
    .should("be.visible")
    .and("contain", "Thank you for your order!");

  cy.get(cartLocators.BTN_BACK_PRODUCTS).click();
  cy.url().should("include", Cypress.env("urls").inventory);
};
