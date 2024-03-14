import { BasePage } from "./basePage";

class BookInteractiveTablePage extends BasePage {
    private searchInput: string = "input#searchBox";
    private rowList: string = 'div[role="row"]:has(a)';
    private bookTitleA: string = 'span>a';

    get searchElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.searchInput);
    }

    get rowListElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.rowList);
    }

    get bookTitle(): string {
        return this.bookTitleA;
    }
}

export {BookInteractiveTablePage};