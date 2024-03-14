describe('Interactions with widgets', () => {
    it('interaction with an accordian', () => {
        cy.visit('/accordian');
        cy.get("div#section1Heading").should("have.text","What is Lorem Ipsum?")
        cy.get("div#section1Content > p").should("be.visible")
        cy.get("div#section2Content > p").should("not.be.visible")
        cy.get("div#section3Content > p").should("not.be.visible")
        cy.get("div#section2Heading").should("have.text","Where does it come from?").click();
        cy.get("div#section1Content > p").should("not.be.visible")
        cy.get("div#section2Content > p").should("be.visible")
        cy.get("div#section3Content > p").should("not.be.visible")
        cy.get("div#section3Heading").should("have.text","Why do we use it?").click();
        cy.get("div#section1Content > p").should("not.be.visible")
        cy.get("div#section2Content > p").should("not.be.visible")
        cy.get("div#section3Content > p").should("be.visible")
        cy.get("div#section3Heading").should("have.text","Why do we use it?").click();
        cy.get("div#section1Content > p").should("not.be.visible")
        cy.get("div#section2Content > p").should("not.be.visible")
        cy.get("div#section3Content > p").should("not.be.visible")
    });

    it('interaction with an auto complete input',()=> {
        cy.visit('/auto-complete')
        cy.get('div#autoCompleteMultiple').find("div.auto-complete__value-container").type("white{enter}")
        cy.get('div#autoCompleteMultiple').find("div.auto-complete__multi-value > div").should("have.text","White")
        cy.get('div#autoCompleteMultiple').find("div.auto-complete__value-container").type("blue{enter}")
        cy.get('div#autoCompleteMultiple').find("div.auto-complete__multi-value > div").eq(2).should("have.text","Blue")
        cy.get("div#autoCompleteSingle").find("div.auto-complete__value-container").type("red{enter}") //auto-complete__single-value
        cy.get("div#autoCompleteSingle").find("div.auto-complete__single-value").should("have.text","Red")
    });

    it('interaction with a date picker',()=>{
        cy.visit('/date-picker')
        cy.get("#datePickerMonthYearInput").click();
        cy.get("select.react-datepicker__year-select").select("1995")
        cy.get("select.react-datepicker__month-select").select("0")
        cy.get('div[aria-label="Choose Thursday, January 5th, 1995"]').click();
        cy.get("#datePickerMonthYearInput").should("have.value","01/05/1995");

        cy.get("#dateAndTimePickerInput").click();
        cy.get("div.react-datepicker__month-read-view").click()
        cy.get("div.react-datepicker__month-dropdown > div").eq(0).click()
        cy.get("div.react-datepicker__year-read-view").click()
        for(let times = 0; times < 24; times++) {
            cy.get(".react-datepicker__navigation--years-previous").click();
        }
        cy.get(".react-datepicker__year-option").eq(-2).click()
        cy.get(".react-datepicker__day--005").click()
        cy.get(".react-datepicker__time-box >ul").contains("li","12:00").click();
        cy.get("#dateAndTimePickerInput").should("have.value","January 5, 1995 12:00 PM");

    })

    it('interacting with progress bar to be at 75',()=>{
        cy.visit('/progress-bar');
        cy.get("button#startStopButton").click();
        cy.get("div#progressBar > div").should("have.text","25%")
        cy.get("button#startStopButton").click();
        cy.get("div#progressBar > div").should("have.text","25%")
        cy.get("button#startStopButton").click();
        cy.get("div#progressBar > div").should("have.text","50%")
        cy.get("button#startStopButton").click();
        cy.get("div#progressBar > div").should("have.text","50%")
        cy.get("button#startStopButton").click();
        cy.get("div#progressBar > div").should("have.text","75%")
        cy.get("button#startStopButton").click();
        cy.get("div#progressBar > div").should("have.text","75%")
    })

    it('interacting with tabs inside the page',()=>{
        cy.visit('/tabs')
        cy.get("a#demo-tab-what").should("have.class","active")
        cy.get("div#demo-tabpane-what > p").should("be.visible")
        cy.get("div#demo-tabpane-origin > p").should("not.be.visible")
        cy.get("div#demo-tabpane-use > p").should("not.be.visible")
        cy.get("div#demo-tabpane-more ").should("not.be.visible")
        cy.get("a#demo-tab-origin").click().should("have.class","active");
        cy.get("a#demo-tab-what").should("not.have.class","active")
        cy.get("div#demo-tabpane-what > p").should("not.be.visible")
        cy.get("div#demo-tabpane-origin > p").should("be.visible")
        cy.get("div#demo-tabpane-use > p").should("not.be.visible")
        cy.get("div#demo-tabpane-more ").should("not.be.visible")
        cy.get("a#demo-tab-use").click().should("have.class","active");
        cy.get("a#demo-tab-origin").should("not.have.class","active");
        cy.get("div#demo-tabpane-what > p").should("not.be.visible")
        cy.get("div#demo-tabpane-origin > p").should("not.be.visible")
        cy.get("div#demo-tabpane-use > p").should("be.visible")
        cy.get("div#demo-tabpane-more ").should("not.be.visible")
    })

    it('interacting with tool tips',()=>{
        cy.visit('/tool-tips');
        cy.get("button#toolTipButton").focus();
        cy.get('div#buttonToolTip').should("exist").and("have.text","You hovered over the Button");
        cy.get("input#toolTipTextField").focus();
        cy.get('div#textFieldToolTip').should("exist").and("have.text","You hovered over the text field");
        cy.contains("a","Contrary").focus();
        cy.get("div#contraryTexToolTip").should("exist").and("have.text","You hovered over the Contrary");
        cy.contains("a","1.10.32").focus();
        cy.get("div#sectionToolTip").should("exist").and("have.text","You hovered over the 1.10.32");
    });

    it('interacting with menus',()=>{
        cy.visit('/menu')
        cy.contains("a","Sub Sub Item 1").should("not.be.visible")
        cy.contains("a","Sub Sub Item 2").should("not.be.visible")
        cy.contains("a","Main Item 2").realHover()
        cy.contains("a","SUB SUB LIST »").realHover();
        cy.contains("a","Sub Sub Item 1").should("be.visible")
        cy.contains("a","Sub Sub Item 2").should("be.visible")
    })

    it('interacting with selects',()=>{
        cy.visit('/select-menu')
        cy.contains("div","Group 2, option 2").should("not.exist");
        cy.get("#withOptGroup").click();
        cy.contains("div","Group 2, option 2").click();
        cy.contains("div","Group 2, option 2").should("exist").and("be.visible");

        cy.get("div#selectOne").contains("div","Prof.").should("not.exist");
        cy.get("div#selectOne").click();
        cy.get("div#selectOne").contains("div","Prof.").click();
        cy.get("div#selectOne").contains("div","Prof.").should("exist").and("be.visible");

        cy.get("select#oldSelectMenu").should("have.value","red")
        cy.get("select#oldSelectMenu").select("Blue")
        cy.get("select#oldSelectMenu").should("have.value","1")

        cy.get("input#react-select-4-input").type("black{enter}",{force:true})
        cy.get("input#react-select-4-input").type("blue{enter}",{force:true})
        cy.get("div#selectMenuContainer>div.row:has(input#react-select-4-input)").contains("div","Black").should("exist")
        cy.get("div#selectMenuContainer>div.row:has(input#react-select-4-input)").contains("div","Blue").should("exist")

        cy.get("select#cars").select(["volvo","audi"]);
        cy.get("select#cars").should("contain.value","volvo")
    })
});

