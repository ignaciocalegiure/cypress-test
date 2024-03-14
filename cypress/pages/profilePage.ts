import { BasePage } from "./basePage";
import { BookInteractiveTablePage } from "./bookInteractiveTablePage";

class ProfilePage extends BookInteractiveTablePage {

    visit(): void {
        cy.visit(`/profile`);
    }
}

export const profilePage = new ProfilePage();