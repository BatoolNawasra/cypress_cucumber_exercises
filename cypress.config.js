const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more.
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));
  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    baseUrl:
      process.env.CYPRESS_BASE_URL ||
      "https://opensource-demo.orangehrmlive.com", 
    specPattern: "cypress/e2e/*.feature",
    watchForFileChanges: true, // Enable watching for file changes during development
    chromeWebSecurity: true, // Enable Chrome web security (set to true for security)
    defaultCommandTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,
  },
});
