class WebTablePage {
    private addNewRowButton: string = "button#addNewRecordButton";
    private popupFirstNameInput: string ="input#firstName";
    private popupLastNameInput: string = "input#lastName";
    private popupAgeInput: string = "input#age";
    private popupEmailInput: string = "input#userEmail";
    private popupDepartment: string = "input#department";
    private popupSalaryInput: string = "input#salary";
    private popupSubmitButton: string = "button#submit";
    private rowlist: string = 'div[role="row"]:has(div>span>svg)';
    private rowEditButton:string = 'span[title="Edit"]';
    private rowDeleteButton: string = 'span[title="Delete"]';


    get addNewButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.addNewRowButton);
    }

    get firstNameElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.popupFirstNameInput);
    }

    get lastNameElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.popupLastNameInput);
    }

    get AgeElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.popupAgeInput);
    }

    get salaryElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.popupSalaryInput);
    }

    get departmentElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.popupDepartment);
    }

    get emailElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.popupEmailInput);
    }

    get submitElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.popupSubmitButton);
    }

    get rowListElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.rowlist);
    }

    get editRowString(): string {
        return this.rowEditButton;
    }

    get deleteRowString(): string {
        return this.rowDeleteButton;
    }

    visit(): void {
        cy.visit(`/webtables`);
    }
}
export const wtPage = new WebTablePage();