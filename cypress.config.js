const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = {
  ...(on, config) => {
    on("file:preprocessor", cucumber());
  },

  e2e: {
    supportFile: "./cypress/support/e2e.js",
    specPattern: "./cypress/e2e/**/**/*.{js,jsx,ts,tsx,feature}",
    testIsolation: false,
    watchForFileChanges: false,
    experimentalSessionAndOrigin: false,
  },
};
