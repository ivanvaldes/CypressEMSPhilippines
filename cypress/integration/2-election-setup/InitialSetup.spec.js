describe('EMS Initial setup', () => {

    beforeEach(function () {
        // 'session_id' and 'remember_token' cookies
        Cypress.Cookies.preserveOnce('JSESSIONID', 'JSESSIONIDSSO')
    })

	it('Login', () => {
		//Load json
		cy.fixture('initialsetup').then((data) => {
            //Go to EMS page
            cy.visit(Cypress.config().baseUrl)
            cy.get('.gwt-InlineLabel').contains('Welcome')
            //Login
            cy.login(data.username, data.newPassword)
            cy.get('#appName').contains('Election Management System')
		})
	})

    it('Election Event funtionality', () => {
        //Click on election event
        cy.get('.gwt-Label').contains('Election Event').click()
        cy.get('.mnuTxtTitle').contains('1. Electoral Event')
        
        //Click on Electoral event
        cy.get('.frmLnk').contains('Search').click()

        //fi
        cy.get('#customCode').type('123456789') 
        cy.get('#name').type('Bidding Election Process 2020') 


        cy.get('#startDate0month').select('Aug').should('have.value', '7')
        cy.get('[name="startDate0day"]').select('16').should('have.value', '16') 
        cy.get('[name="startDate0year"]').select('2020').should('have.value', '2020')  

        cy.get('[name="startDate1month"]').type('11') 
        cy.get('[name="startDate1day"]').type('16') 
        cy.get('[name="startDate1year"]').type('2021')

        cy.get('#finishDate0month').type('5') 
        cy.get('[name="finishDate0day"]').type('16') 
        cy.get('[name="finishDate0year"]').type('2022')

        cy.get('#startDate0month').type('7') 
        cy.get('[name="startDate0day"]').type('16') 
        cy.get('[name="startDate0year"]').type('2023')

    })
})
