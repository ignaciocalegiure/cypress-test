
# Cypress project

The purpose of this project is to demonstrate my knowledge gained from different courses, mainly the following: The Complete Cypress 12+ Course: From Zero to Expert!

Here, you will find these 5 files that contain different cases interacting different elements commonly found in many web applications. Also, includes interacting with different React components. 

These files are:

cypress/e2e/poo-simulated-test-suite/book-store.cy.ts 

cypress/e2e/poo-simulated-test-suite/login-test-suite.cy.ts

cypress/e2e/ui-testing/alerts-frames.cy.ts

cypress/e2e/ui-testing/ui-elements.cy.ts

cypress/e2e/ui-testing/widgets.cy.ts

These tests are executed and based on the web page: [DemoQA](https://demoqa.com/) where the Elements, Alerts Frames & Windows, Widgets and Book Store Application modules will be used.

If you find anything that it is not working, that you don't understand or you think I can improve, feel free to reach me out in [Linkedin](https://www.linkedin.com/in/ignaciocalegiure/). 






## Execution

To run it, first you must clone the project, then inside the folder run:
```bash
npm install
``` 
And then, run:
```bash
npm run runner
```
This last command is based on a script set in the package.json file that allows to execute the complete project and generate the local report. 
You will find the results in the console, and as HTML in the path: cypress\reports\html\
Also if there is any screenshot needed, you will find them as well in the path: cypress\screenshots and cypress\videos



## Authors

- [@ignaciocalegiure](https://www.github.com/ignaciocalegiure)


## Tech Stack

**Framework:** Cypress@13.6.6

**Plugins:** [@faker-js/faker@8.4.1](https://www.npmjs.com/package/@faker-js/faker) [cy-verify-downloads@0.2.3](https://www.npmjs.com/package/cy-verify-downloads) [cypress-file-upload@5.0.8](https://www.npmjs.com/package/cypress-file-upload) [cypress-mochawesome-reporter@3.8.2](https://www.npmjs.com/package/cypress-mochawesome-reporter) [typescript@5.4.2](https://www.npmjs.com/package/typescript/v/5.4.2)

