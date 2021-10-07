describe('EMS First login', () => {

	it('First login', () => {
		//Load json
		cy.fixture('initialsetup').then((data) => {
			//Go to EMS page
			cy.visit(Cypress.config().baseUrl)
			cy.get('.gwt-InlineLabel').contains('Welcome')
			//Login
			cy.login(data.username, data.password)
			//Set new password
			cy.get('.label-block-panel-title').contains('Change your password')
			cy.get('input[type=password]').eq(0).type(data.password)
			cy.get('input[type=password]').eq(1).type(data.newPassword)
			cy.get('input[type=password]').eq(2).type(data.newPassword)
			cy.get('.buttons').contains('Ok').click()
			cy.get('.label-block-panel-message').contains('Password updated')
			cy.get('.buttons:visible').contains('Ok').click()
		})
	})
})
