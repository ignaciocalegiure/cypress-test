import {fakerData} from '../model';
import {wtPage} from '../../pages/webTablesPage'
describe('Handling common elements', () => {
    it('Text box elements', () => {
     cy.visit(`/text-box`);
     cy.task("freshUser").then((user:fakerData)=> {
        cy.get("#userName").type(user.fullName);
        cy.get("#userEmail").type(user.email);
        cy.get("textarea#currentAddress").type(user.streetAddress);
        cy.get("textarea#permanentAddress").type(user.anotherAddress);
        cy.get("button#submit").click();
        cy.get("p#name").should("contain",user.fullName);
        cy.get("p#email").should("contain",user.email);
        cy.get("p#currentAddress").should("contain",user.streetAddress);
        cy.get("p#permanentAddress").should("contain",user.anotherAddress);
     })
     
    });
    /// scenario: open the dropdown, click all of the files inside Downloads folder, Office folder. Verify selection in the label, 
    /// then close the dropdown and click on Home checkbox and confirm the message inside the label
    it('check box elements', () => {
        cy.visit(`/checkbox`);
        // checking dropdown not opened yet
        cy.get('label[for="tree-node-excelFile"]').should('not.exist');
        cy.get('button[title="Expand all"]').click();
        // checking dropdown if it is open
        cy.get('input#tree-node-downloads').should("exist").and("not.be.checked");
        // clicking on excelFile and checking if it is checked, also downloads not checked, and text in the result section
        cy.get('label[for="tree-node-excelFile"]').should('exist').click();
        cy.get('input#tree-node-excelFile').should('be.checked');
        cy.get("div#result").should("contain","excelFile");
        cy.get('input#tree-node-downloads').should("exist").and("not.be.checked");
        // clicking on wordFile and checking if it is checked, also downloads is checked, and text in the result section
        cy.get('label[for="tree-node-wordFile"]').should('exist').click();
        cy.get('input#tree-node-wordFile').should('be.checked');
        cy.get('input#tree-node-downloads').should("be.checked");
        cy.get("div#result").then((result)=> {
            ["downloads","wordFile","excelFile"].forEach((text:string)=> {
                expect(result.text()).to.contain(text);
            })            
        });
        // clicking on office folder and checking if it is checked, also all the files inside should be checked and the previous selected, and text in the result section
        cy.get('label[for="tree-node-office"]').should('exist').click();
        cy.get('input#tree-node-office').should('be.checked');
        cy.get('input#tree-node-public').should("be.checked");
        cy.get('input#tree-node-private').should('be.checked');
        cy.get('input#tree-node-classified').should("be.checked");
        cy.get('input#tree-node-general').should('be.checked');
        cy.get("div#result").then((result)=> {
            ["downloads","wordFile","excelFile","office","public","private","classified","general"].forEach((text:string)=> {
                expect(result.text()).to.contain(text);
            })            
        });
        // closing the dropdown
        cy.get('button[title="Collapse all"]').click();
        cy.get('label[for="tree-node-excelFile"]').should('not.exist');
        // clicking on home folder, checking if all the items are shown in the result section
        cy.get('label[for="tree-node-home"]').click();
        cy.get('input#tree-node-home').should('be.checked');
        cy.get("div#result").then((result)=> {
            ["home","desktop","notes","commands","documents","workspace",
            "react","angular","veu","downloads","wordFile","excelFile",
            "office","public","private","classified","general"]
            .forEach((text:string)=> {
                expect(result.text()).to.contain(text);
            })            
        });



    });

    it('radio buttons',() => {
     cy.visit(`/radio-button`);
     cy.get("span.text-success").should("not.exist")
     cy.get("input#yesRadio").should("not.be.checked").click({force: true}).should("be.checked");
     cy.get("span.text-success").should("exist").and("have.text","Yes")
     cy.get("input#impressiveRadio").should("not.be.checked").click({force: true}).should("be.checked");
     cy.get("span.text-success").should("exist").and("have.text","Impressive")
     cy.get("input#noRadio").should("be.disabled");
    })

    it('Web Tables scenario #1 - create a new row',()=> {
        wtPage.visit();
        wtPage.addNewButtonElement.click();
        cy.task("freshUser").then((user:fakerData)=> {
        // filling pop up form
            wtPage.firstNameElement.type(user.firstName);
            wtPage.lastNameElement.type(user.lastName);
            wtPage.emailElement.type(user.email)
            wtPage.AgeElement.type(user.age)
            wtPage.salaryElement.type(user.salary)
            wtPage.departmentElement.type(user.department)
            wtPage.submitElement.click()
            let found: boolean = false;
            wtPage.rowListElement.each((element)=> {
                let text: String = element.text();
                if (text.match(user.firstName)){
                    found = true;
                    expect(text.trim()).to.equal(user.firstName+user.lastName+user.age+user.email+user.salary+user.department);
                }
            });
            cy.log("text found", found).then(()=>{
                expect(found).to.be.true;
            })
        });
    })


    it('Web Tables scenario #2 - edit a default row',() => {
        wtPage.visit();
        cy.fixture<{defaultData: fakerData}>('webTablesDefaultData.json').its('defaultData').then((defaultData)=> {
            wtPage.rowListElement.each((element)=> {
                let text: String = element.text();
                if (text.match(defaultData.firstName)){
                    element.find(wtPage.editRowString).click();
                    wtPage.firstNameElement.should("have.value",defaultData.firstName);
                    wtPage.lastNameElement.should("have.value",defaultData.lastName);
                    wtPage.emailElement.should("have.value",defaultData.email);
                    wtPage.AgeElement.should("have.value",defaultData.age);
                    wtPage.salaryElement.should("have.value",defaultData.salary);
                    wtPage.departmentElement.should("have.value",defaultData.department);
                }
            });

            cy.task("freshUser").then((user:fakerData)=>{
                wtPage.emailElement.clear().type(user.email);
                wtPage.submitElement.click();
                let found: boolean = false;
                wtPage.rowListElement.each((element)=> {
                    cy.log("looking for the edited row");
                    let text: String = element.text();
                    if (text.match(defaultData.firstName)){
                        found = true;
                        expect(text.trim()).to.equal(defaultData.firstName+defaultData.lastName+defaultData.age+user.email+defaultData.salary+defaultData.department);
                    }
                });
                cy.log("text found", found).then(()=>{
                    expect(found).to.be.true;
                })
            })
        })

    });

    it('Web Tables scenario #3 - delete a default row',()=> {
        wtPage.visit();
        cy.fixture<{defaultData: fakerData}>('webTablesDefaultData.json').its('defaultData').then((defaultData)=> {
            wtPage.rowListElement.each((element)=> {
                let text: String = element.text();
                if (text.match(defaultData.firstName)){
                    element.find(wtPage.deleteRowString).click();
                }
            });

            let found: boolean = false;
                wtPage.rowListElement.each((element)=> {
                    cy.log("looking for the deleted row");
                    let text: String = element.text();
                    if (text.match(defaultData.firstName)){
                        found = true;
                    }
                });
                cy.log("text that should not be found", found).then(()=>{
                    expect(found).to.be.false;
                })
        });
    });

    it('Buttons elements', ()=> {
        cy.visit(`/buttons`);
        cy.get("button#doubleClickBtn").dblclick();
        cy.get("p#doubleClickMessage").should("exist").and("have.text","You have done a double click");
        cy.get("button#rightClickBtn").rightclick();
        cy.get("p#rightClickMessage").should("exist").and("have.text","You have done a right click");
        cy.get('button.btn-primary').eq(2).click();
        cy.get('p#dynamicClickMessage').should("exist").and("have.text","You have done a dynamic click");
    })

    it('checking link status and response from API',()=>{
        cy.visit(`/links`);
        cy.intercept('GET',`${Cypress.env("demoQA")}/created`).as('createdLink');
        cy.intercept('GET',`${Cypress.env("demoQA")}/no-content`).as('noContentLink');
        cy.intercept('GET',`${Cypress.env("demoQA")}/moved`).as('movedLink');
        cy.intercept('GET',`${Cypress.env("demoQA")}/bad-request`).as('badRequestLink');
        cy.intercept('GET',`${Cypress.env("demoQA")}/unauthorized`).as('unauthorizedLink');
        cy.intercept('GET',`${Cypress.env("demoQA")}/forbidden`).as('forbiddenLink');
        cy.intercept('GET',`${Cypress.env("demoQA")}/invalid-url`).as('invalidUrlLink');
        cy.log("checking the link without clicking")
        cy.get('#simpleLink').should("have.attr",'href','https://demoqa.com')
        cy.get('#simpleLink').should("have.attr",'target','_blank')
        cy.log("checking the links by clicking and intercepting the api calls")
        cy.get("a#created").click();
        cy.wait('@createdLink').then((request)=> {
            cy.log("Loggin the request",request)
            expect(request.response.statusCode).to.be.equal(201);
            expect(request.response.statusMessage).to.be.equal("Created");
        })
        cy.get("p#linkResponse").should("have.text","Link has responded with staus 201 and status text Created")
        cy.get("a#no-content").click();
        cy.wait('@noContentLink').then((request)=> {
            cy.log("Loggin the request",request)
            expect(request.response.statusCode).to.be.equal(204);
            expect(request.response.statusMessage).to.be.equal("No Content");
        })
        cy.get("p#linkResponse").should("have.text","Link has responded with staus 204 and status text No Content")
        cy.get("a#moved").click();
        cy.wait('@movedLink').then((request)=> {
            cy.log("Loggin the request",request)
            expect(request.response.statusCode).to.be.equal(301);
            expect(request.response.statusMessage).to.be.equal("Moved Permanently");
        })
        cy.get("p#linkResponse").should("have.text","Link has responded with staus 301 and status text Moved Permanently")
        cy.get("a#bad-request").click();
        cy.wait('@badRequestLink').then((request)=> {
            cy.log("Loggin the request",request)
            expect(request.response.statusCode).to.be.equal(400);
            expect(request.response.statusMessage).to.be.equal("Bad Request");
        })
        cy.get("p#linkResponse").should("have.text","Link has responded with staus 400 and status text Bad Request")
        cy.get("a#unauthorized").click();
        cy.wait('@unauthorizedLink').then((request)=> {
            cy.log("Loggin the request",request)
            expect(request.response.statusCode).to.be.equal(401);
            expect(request.response.statusMessage).to.be.equal("Unauthorized");
        })
        cy.get("p#linkResponse").should("have.text","Link has responded with staus 401 and status text Unauthorized")
        cy.get("a#forbidden").click();
        cy.wait('@forbiddenLink').then((request)=> {
            cy.log("Loggin the request",request)
            expect(request.response.statusCode).to.be.equal(403);
            expect(request.response.statusMessage).to.be.equal("Forbidden");
        })
        cy.get("p#linkResponse").should("have.text","Link has responded with staus 403 and status text Forbidden")
        cy.get("a#invalid-url").click();
        cy.wait('@invalidUrlLink').then((request)=> {
            cy.log("Loggin the request",request)
            expect(request.response.statusCode).to.be.equal(404);
            expect(request.response.statusMessage).to.be.equal("Not Found");
        })
        cy.get("p#linkResponse").should("have.text","Link has responded with staus 404 and status text Not Found")
    })

    it('Checking Broken images ', ()=> {
        cy.visit(`/broken`);
        let img:HTMLImageElement;
        cy.log("checking valid image").get('div > img[src="/images/Toolsqa.jpg"]').should('be.visible').and(($img)=>{
            img = $img[0] as unknown as HTMLImageElement;
            expect(img.naturalWidth).to.be.greaterThan(0);
        });
        cy.log("checking broken image").get('div > img[src="/images/Toolsqa_1.jpg"]').should('be.visible').and(($img)=>{
            img = $img[0] as unknown as HTMLImageElement;
            expect(img.naturalWidth).to.be.equal(0);
        });

    });
    
    it('Handling dynamic properties',{defaultCommandTimeout: 8000},()=>{
        cy.visit('/dynamic-properties');
        cy.contains("This text has random Id").should("exist");
        cy.get("button#enableAfter").should("be.enabled");
        cy.get("button#colorChange").should("have.class","text-danger");
        cy.get("button#visibleAfter").should("be.visible");
    })

    it.only('download files',()=>{
        cy.visit(`/upload-download`)
        cy.get('a#downloadButton').click();
        cy.verifyDownload('sampleFile.jpeg');
    })

    it.only('upload files',()=>{
        cy.visit(`/upload-download`)
        cy.get('input#uploadFile').attachFile('example.json')
        cy.get('p#uploadedFilePath').should("contain","example.json")
    })
});