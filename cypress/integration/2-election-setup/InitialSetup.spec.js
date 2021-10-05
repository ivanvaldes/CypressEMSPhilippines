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

    it('Configure the Election', () => {
        //Click on election event
        cy.get('.gwt-Label').contains('Election Event').click()
        cy.get('.mnuTxtTitle').contains('1. Electoral Event')
        
        //Click on Electoral event
        cy.get('.frmLnk').contains('Search').click()

        //Select and edit electoral event
        cy.get('[name="rowIndex"]').click()
        cy.get('#btnEDIT').click()
        cy.url().should('include', '/crud.saes')
        cy.wait(2000)

        //Fill up electoral information
        cy.fixture('electoralevent').then((event) => {
            
            //Name
            cy.get('#name').clear()
            cy.get('#name').type(event.name)

            //Start Date
            cy.get('#startDatemonth').select(event.startDateMonth)
            cy.get('[name="startDateday"]').select(event.startDateDay)
            cy.get('[name="startDateyear"]').select(event.startDateYear)

            //End Date
            cy.get('#finishDatemonth').select(event.endDateMonth)
            cy.get('[name="finishDateday"]').select(event.endDateDay)
            cy.get('[name="finishDateyear"]').select(event.endDateYear)
            
            //Election organization
            cy.get('#electoralOrganization').clear()
            cy.get('#electoralOrganization').type(event.electionOrganization)

		})

        //save information
        cy.get('[name="btnSave"]').click()
        cy.go('back')
        cy.go('back')
        cy.go('back')

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
