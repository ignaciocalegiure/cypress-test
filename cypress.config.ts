import { defineConfig } from "cypress";
// faker const
const {faker} = require("@faker-js/faker");
// this will go to the top of the file
const {isFileExist, findFiles} = require('cy-verify-downloads');

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and for this line we are going to use just one part and add it to the setupNodeEvents
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', {isFileExist, findFiles})
      
      // faker
      on("task", {
        freshUser() {
          let user= {
            fullName: faker.person.fullName(),
            username: faker.name.firstName(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            registeredAt: faker.date.past(),
            streetAddress: faker.location.streetAddress({ useFullAddress: true }),
            anotherAddress: faker.location.streetAddress({ useFullAddress: true }),
            age: "28",
            salary: faker.finance.amount({dec : 0}),
            department: faker.person.jobArea(),
          };
          return user;
        },
      })
      //end faker

    },
    baseUrl: "https://demoqa.com",
    env: {
      demoQA: "https://demoqa.com",
    },
    pageLoadTimeout: 75000,
    viewportHeight: 1080,
    viewportWidth: 1920,
    retries: {
      runMode: 2,
      openMode: 0
    },
    video: true,
    screenshotOnRunFailure: true,
  },
});
