import {inventoryLocators} from "../support/locators/inventoryLocators";
beforeEach(() => {
    cy.fixture("products").as("products");
    cy.login().as("login");
});

describe("Buying itens", () => {
    describe("Add and Remove to cart", () => {
        it("Verifying the change of the button", () => {
            cy.get("@products").each((product) => {
                cy.get(inventoryLocators.INVENTORY_ITEM).each(($el) => {

                    let productName = $el.find(inventoryLocators.INVENTORY_ITEM_NAME)
                       
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

                    cy.get(inventoryLocators.PRODUCT_PAGE.DETAILS_NAME).should("to.contain", productName);

                    cy.get(inventoryLocators.PRODUCT_PAGE.DETAILS_CONTAINER)
                        .find("button")
                        .should("have.text", "Add to cart")
                        .click();

                    cy.get(inventoryLocators.CART).click();
                    cy.url().should("include", Cypress.env("urls").cart);
                    cy.get(inventoryLocators.INVENTORY_ITEM_NAME).should("to.contain", productName);
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

                    cy.get(inventoryLocators.CART_LIST).should("to.not.contain", productName);
                });
        });
    });
});
