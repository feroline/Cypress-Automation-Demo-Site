const { defineConfig } = require("cypress");
const baseUrl = "https://www.saucedemo.com";

module.exports = defineConfig({
  projectId: "155e11",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: baseUrl,
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    execTimeout: 4000,
    env: {
      urls:{
        baseUrl: baseUrl,
        inventory: "/inventory.html",
        cart: "/cart.html",
        checkout: "/checkout-step-one.html",
        checkoutConfirm: "/checkout-step-two.html",
        checkoutComplete: "/checkout-complete.html",
      }
    },
  }
});

