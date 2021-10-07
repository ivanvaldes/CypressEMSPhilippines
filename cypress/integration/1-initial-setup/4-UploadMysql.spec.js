describe('Upload Mysql', () => {

    beforeEach(function () {
        // 'session_id' and 'remember_token' cookies
        Cypress.Cookies.preserveOnce('JSESSIONID', 'JSESSIONIDSSO')
    })

    it('Login', () => {
		//Load json
		cy.fixture('initialsetup').then((data) => {
            //Go to EMS page
            cy.visit(Cypress.config().baseUrl)
            cy.wait(1000)
            cy.get('.gwt-InlineLabel').contains('Welcome', {timeout: 6000})
            //Login
            cy.login(data.username, data.newPassword)
            cy.get('#appName').contains('Election Management System')
		})
	})

	it('Load COMELEC data', () => {
        //Click on process data
        cy.get('.gwt-Label').contains('Process Data').click()
        //Click on 1. Import Electoral Data
        cy.contains('td', '1. Import Electoral Data')
        cy.contains('td', '1. Import Electoral Data').click()
        //Upload mysql dump file 
        cy.get('#db_check').check()
        cy.get('input[value=Accept]').click()
        const filepath = '../../deployment/data/labtest_with_plebiscite_local_national.sql'
        cy.get('#file_upload_mysql').attachFile(filepath)
        cy.get('#ok-mysql-button').click()
        cy.get('.uploadingModalTitle').contains('Bulk load files are being uploaded to the server, please wait')
    })
})
