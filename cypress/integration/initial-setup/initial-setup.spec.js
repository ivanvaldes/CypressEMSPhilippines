describe('Login / Logout Test', () => {
	it('Login', () => {
		cy.visit(Cypress.config().baseUrl)
		cy.get('.gwt-InlineLabel').contains('Welcome')
	})
})
