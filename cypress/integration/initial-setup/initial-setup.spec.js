describe('Login / Logout Test', () => {


	it('Open login page', () => {
		cy.fixture('initialsetup').then((data) => {

			cy.visit(Cypress.config().baseUrl)
			cy.get('.gwt-InlineLabel').contains('Welcome')
			cy.get('input[name="j_username"]').type(data.username)
			cy.get('input[name="j_password"]').type(data.password)
			cy.get('#login-submit-button').click()
		})

	})
})
