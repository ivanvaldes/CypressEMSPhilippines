import 'cypress-file-upload';

Cypress.Commands.add('login', (url, username, password) => {
	//Go to page
	cy.visit(url)
	cy.get('.gwt-InlineLabel').contains('Welcome', {timeout: 6000})

	//Fill up information
    cy.get('input[name="j_username"]').type(username)
	cy.get('input[name="j_password"]').type(password)
	cy.get('#login-submit-button').click()
})


