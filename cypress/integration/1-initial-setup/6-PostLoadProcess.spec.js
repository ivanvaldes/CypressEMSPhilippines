describe('Run Post-Load Processes', () => {

    beforeEach(function () {
        // 'session_id' and 'remember_token' cookies
        Cypress.Cookies.preserveOnce('JSESSIONID', 'JSESSIONIDSSO')
    })

	it('Login', () => {
		//Load json
		cy.fixture('data').then((data) => {
            //Login
            cy.login(data.username, data.newPassword)
            cy.get('#appName').contains('Election Management System', {timeout: 7000})
		})
	})
    
})
