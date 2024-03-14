describe('handling alerts', () => {
    beforeEach(() => {
        cy.visit('alerts');
    });
    it('Simple confirmation Alert',() => {
        cy.get("button#alertButton").should("exist").click();
        cy.on('window:alert',(message)=> {
            expect(message).to.be.equal("You clicked a button");
        });
        cy.on('window:confirm',()=>true);
    });

    it('Simple confirmation Alert after 5 seconds',{defaultCommandTimeout : 6000} ,() => {
        cy.get("button#timerAlertButton").should("exist").click();
        cy.on('window:alert',(message)=> {
        expect(message).to.be.equal("This alert appeared after 5 seconds");
        });
        cy.on('window:confirm',()=>true);
    });

    it('Alert click on OK button',() => {
        cy.get("button#confirmButton").should("exist").click();
        cy.on('window:alert',(message)=> {
        expect(message).to.be.equal("Do you confirm action?");
        });
        cy.on('window:confirm',()=>true);
        cy.get("span#confirmResult").should("exist").and("have.text","You selected Ok")
    });
    

    
    it('Alert click on Cancel button',() => {
        cy.get("button#confirmButton").should("exist").click();
        cy.on('window:alert',(message)=> {
        expect(message).to.be.equal("Do you confirm action?");
        });
        cy.on('window:confirm',()=>false);
        cy.get("span#confirmResult").should("exist").and("have.text","You selected Cancel")
    });

    it('Alert - writting on prompt alert',() => {
        cy.window().then((window)=>{
            cy.stub(window,'prompt').returns('something');
            cy.get("button#promtButton").should("exist").click();
            cy.get('span#promptResult').should('have.text','You entered something')
        })
    });
});

describe('Handling Iframes', () => {
    it('simple iframe', () => {
        cy.visit(`/frames`);
        cy.get('iframe#frame1').then(function ($iframe) {
            const $body = $iframe.contents().find("body");
            cy.wrap($body).should("have.text","This is a sample page")
        })
        cy.get('iframe#frame2').then(function ($iframe) {
            const $body = $iframe.contents().find("body");
            cy.wrap($body).should("have.text","This is a sample page")
        })
    });

    it('nested iframe', () => {
        cy.visit(`/nestedframes`);
        cy.get('iframe#frame1').then(function ($iframe) {
            const $body = $iframe.contents().find("body");
            cy.wrap($body).should("have.text","Parent frame")
            cy.wrap($body).find('iframe').then(function ($childIframe) {
                const $childBody = $childIframe.contents().find("body");
                cy.wrap($childBody).should("have.text","Child Iframe");
            })
        })
    });

});

describe('handling modals', () => {
    beforeEach(() => {
        cy.visit('modal-dialogs');
    });
    it('Modal short text',() => {
        cy.get("button#showSmallModal").should("exist").click();
        cy.get("div.modal-body").should("have.text","This is a small modal. It has very less content");
        cy.get("button#closeSmallModal").should("exist").click();
    });

    it('Modal long text',() => {
        cy.get("button#showLargeModal").should("exist").click();
        cy.get("div.modal-body").should("have.text","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
        cy.get("button#closeLargeModal").should("exist").click();
    });

});