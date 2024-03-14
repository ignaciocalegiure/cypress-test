import { BasePage } from "./basePage";
import { BookInteractiveTablePage } from "./bookInteractiveTablePage";

class BooksPage extends BookInteractiveTablePage {

    visit(): void {
        cy.visit(`/books`);
    }
}

export const booksPage = new BooksPage();