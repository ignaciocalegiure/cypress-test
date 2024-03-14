import { loginPage } from "../../pages/loginPage";
import { profilePage } from "../../pages/profilePage";
import { BSUser,fakerData } from "../model";
describe('login test suite - book store web app ', () => {
    
    it('login - valid user - successful login', () => {
        loginPage.visit();
        cy.fixture('bookstore').then((userData:BSUser)=>{
            loginPage.usernameElement.type(userData.username);
            loginPage.passwordElement.type(userData.password);
            loginPage.loginElement.click();
            cy.url().should('not.contain','login');
            profilePage.userElement.should("exist").and("have.text",userData.username);
        })
    });

    it('login - invalid user - login failed', () => {
        loginPage.visit();
        cy.task("freshUser").then((user:fakerData)=> {
            loginPage.usernameElement.type(user.username);
            loginPage.passwordElement.type(user.password);
            loginPage.loginElement.click();
            loginPage.errorMessageElement.should("exist").and("have.text",loginPage.textMessage);
            cy.url().should('contain','login');
        });
    });
});