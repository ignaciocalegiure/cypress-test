import { loginPage } from "../../pages/loginPage";
import { profilePage } from "../../pages/profilePage";
import { booksPage } from "../../pages/booksPage";
import { BSUser } from "../model";
Cypress.session.clearAllSavedSessions();

describe('simulated test suite - book store web app ', () => {
    beforeEach(()=> {
        cy.session('loginSession', ()=>{
            loginPage.visit();
            cy.fixture('bookstore').then((userData:BSUser)=>{
                loginPage.usernameElement.type(userData.username);
                loginPage.passwordElement.type(userData.password);
                loginPage.loginElement.click();
                cy.url().should('not.contain','login');
                profilePage.userElement.should("exist").and("have.text",userData.username);
            })
        })
    })


    it('look for different books',()=>{
        booksPage.visit();
        cy.url().should("contain","books");
        cy.fixture('bookstore').then((booksData:BSUser)=>{
            booksData.books.forEach(function(book) {
                booksPage.searchElement.clear();
                booksPage.searchElement.type(book.title);
                booksPage.rowListElement.find(booksPage.bookTitle).should("have.text",book.title)
                booksPage.rowListElement.contains("div",book.author).should("exist")
                booksPage.rowListElement.contains("div",book.publisher).should("exist")
            })
        })
    })

    it('check books in profile collection', ()=>{
        profilePage.visit();
        cy.url().should("contain","profile");
        cy.fixture('bookstore').then((booksData:BSUser)=>{
            booksData.userBooks.forEach(function(book) {
                profilePage.searchElement.clear();
                profilePage.searchElement.type(book.title);
                profilePage.rowListElement.find(profilePage.bookTitle).should("have.text",book.title)
                profilePage.rowListElement.contains("div",book.author).should("exist")
                profilePage.rowListElement.contains("div",book.publisher).should("exist")
            })
        })
    })
});