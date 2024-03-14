class BasePage {
    private header:string = "div[class='main-header']";
    private user:string = "label#userName-value";

    get headerElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.header);
    }

    get userElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.user);
    }
}

export {BasePage};