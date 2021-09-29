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
    })
})
