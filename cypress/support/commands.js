Cypress.Commands.add('login', (username, password) => {
    cy.get('input[name="j_username"]').type(username)
	cy.get('input[name="j_password"]').type(password)
	cy.get('#login-submit-button').click()
})