describe('EMS Initial setup', () => {

    beforeEach(function () {
        // 'session_id' and 'remember_token' cookies
        Cypress.Cookies.preserveOnce('JSESSIONID', 'JSESSIONIDSSO')
    })

	it('Login', () => {
		//Load json
		cy.fixture('initialsetup').then((data) => {
            //Login
            cy.login(data.username, data.newPassword)
            cy.get('#appName').contains('Election Management System', {timeout: 7000})
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

            //CCS installer key
            cy.get('#plainCcsDeviceKey').clear()
            cy.get('#plainCcsDeviceKey').type(event.ccsKey)
            cy.get('#plainCcsDeviceKey_retype').clear()
            cy.get('#plainCcsDeviceKey_retype').type(event.ccsKey)
        
            //External Certificate
            cy.searchfile(event.externalCertificate).then(value => 
                cy.uploadfile(
                    value.stdout, 
                    '#externalCertificate', 
                    'application/x-x509-user-cert',
                    'utf-8')
            );

            //Root Certificate Authority
            cy.searchfile(event.rootCertificateAuthority).then(value => 
                cy.uploadfile(
                    value.stdout, 
                    '#authorityCertificate', 
                    'application/x-x509-user-cert',
                    'utf-8')
            );

            //Web Intermediate Keystore used by CCS
            cy.searchfile(event.webIntermediateKeystoreUsedByCCS).then(value => 
                cy.uploadfile(
                    value.stdout, 
                    '#browserClientKeystore', 
                    'application/x-pkcs12',
                    'utf-8')
            );

            //Enter the keystore password containing the private key for the Web Intermediate certificate
            cy.get('#browserClientKeystorePasswordHelper').clear()
            cy.get('#browserClientKeystorePasswordHelper').type(event.webIntermediateKeystoreUsedByCCSPassword)
            cy.get('#browserClientKeystorePasswordHelper_retype').clear()
            cy.get('#browserClientKeystorePasswordHelper_retype').type(event.webIntermediateKeystoreUsedByCCSPassword)
            
            //Private key alias from the file containing the password for the Web Intermediate certificate
            cy.get('#browserClientKeystoreAlias').clear()
            cy.get('#browserClientKeystoreAlias').type(event.webIntermediateKeystoreUsedByCCSAlias)

            //Certificate containing the public key for file signing
            cy.searchfile(event.certificateContainingThePublicKeyForFileSigning).then(value => 
                cy.uploadfile(
                    value.stdout, 
                    '#signCertificate', 
                    'application/x-x509-user-cert',
                    'utf-8')
            );

            //File containing the key used for file signing
            cy.searchfile(event.fileContainingTheKeyUsedForFileSigning).then(value => 
                cy.uploadfile(
                    value.stdout, 
                    '#signKeystore', 
                    'application/x-pkcs12',
                    'utf-8')
            );

            //Keystore password containing the private key for file signing
            cy.get('#signKeystorePasswordHelper').clear()
            cy.get('#signKeystorePasswordHelper').type(event.keystoreAndPrivateKeyPassword)
            cy.get('#signKeystorePasswordHelper_retype').clear()
            cy.get('#signKeystorePasswordHelper_retype').type(event.keystoreAndPrivateKeyPassword)
                     
            //Private key password from the file containing the password for file signing
            cy.get('#signKeystoreKeyPasswordHelper').clear()
            cy.get('#signKeystoreKeyPasswordHelper').type(event.keystoreAndPrivateKeyPassword)
            cy.get('#signKeystoreKeyPasswordHelper_retype').clear()
            cy.get('#signKeystoreKeyPasswordHelper_retype').type(event.keystoreAndPrivateKeyPassword)

            //Private key alias from the file containing the password for file signing
            cy.get('#signKeystoreAlias').clear()
            cy.get('#signKeystoreAlias').type(event.privateKeyAliasFromTheFileContainingThePasswordForFileSigning)

            //Keystore used at transmission certificate
            cy.searchfile(event.keystoreUsedAtHandshake).then(value => 
                cy.uploadfile(
                    value.stdout, 
                    '#handshakeKeystore', 
                    'application/x-pkcs12',
                    'utf-8')
            );

            //Key password contained in the Keystore used at transmission certificate
            cy.get('#handshakeKeystoreKeyPasswordHelper').clear()
            cy.get('#handshakeKeystoreKeyPasswordHelper').type(event.keypasswordContainedInTheKeystoreUsedAtHandshake)
            cy.get('#handshakeKeystoreKeyPasswordHelper_retype').clear()
            cy.get('#handshakeKeystoreKeyPasswordHelper_retype').type(event.keypasswordContainedInTheKeystoreUsedAtHandshake)
            
            //Password for the keystore used at transmission certificate
            cy.get('#handshakeKeystorePasswordHelper').clear()
            cy.get('#handshakeKeystorePasswordHelper').type(event.keypasswordContainedInTheKeystoreUsedAtHandshake)
            cy.get('#handshakeKeystorePasswordHelper_retype').clear()
            cy.get('#handshakeKeystorePasswordHelper_retype').type(event.keypasswordContainedInTheKeystoreUsedAtHandshake)
            
            //Alias for the keystore used at transmission certificate
            cy.get('#handshakeKeystoreAlias').clear()
            cy.get('#handshakeKeystoreAlias').type(event.aliasForTheKeystoreUsedAtHandshake)

            //Transmission Router certificate
            cy.searchfile(event.transmissionRouterCertificate).then(value => 
                cy.uploadfile(
                    value.stdout, 
                    '#transmissionRouterCertificate', 
                    'application/x-pkcs12',
                    'utf-8')
            );

            //Key password contained in the Keystore used at transmission certificate
            cy.get('#transmissionRouterCertificatePasswordHelper').clear()
            cy.get('#transmissionRouterCertificatePasswordHelper').type(event.keystorePasswordForTheTransmissionRouterCertificate)
            cy.get('#transmissionRouterCertificatePasswordHelper_retype').clear()
            cy.get('#transmissionRouterCertificatePasswordHelper_retype').type(event.keystorePasswordForTheTransmissionRouterCertificate)
            
            //Alias for the keystore used at transmission certificate
            cy.get('#transmissionRouterCertificateAlias').clear()
            cy.get('#transmissionRouterCertificateAlias').type(event.aliasForTheTransmissionRouterCertificate)


		})
        
        //Save event information
        cy.get('[name="btnSave"]').click()
        cy.contains('td', 'Edited successfully').should('be.visible');
    })

})
