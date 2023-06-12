const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "155e11",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://www.saucedemo.com",
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    env: {
      urls:{
        inventory: "/inventory.html",
      }
    },
  }
});

