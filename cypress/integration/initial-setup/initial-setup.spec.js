describe('Login / Logout Test', () => {
	it('Login', () => {
		cy.visit('https://127.0.0.1:8444/ssp/')
		cy.get('.gwt-InlineLabel').contains('Welcome')
	})
})
