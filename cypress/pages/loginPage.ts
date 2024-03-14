import { BasePage } from "./basePage";

class LoginPage extends BasePage {
    private usernameInput: string = "input#userName";
    private passwordInput: string = "input#password";
    private loginButton: string = "button#login";
    private errorMessage: string = "p#name";
    private message: string = "Invalid username or password!";

    get usernameElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.usernameInput);
    }

    get passwordElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.passwordInput);
    }

    get loginElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.loginButton);
    }

    get errorMessageElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.errorMessage);
    }

    get textMessage(): string {
        return this.message;
    }

    visit(): void {
        cy.visit(`/login`);
    }
}

export const loginPage = new LoginPage();