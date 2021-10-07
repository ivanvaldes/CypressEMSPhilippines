describe('Download electoral data', () => {
    
    //Create data folder if not exist
    it('Create data folder', () => {
        cy.exec('mkdir -p data').then((result) => {           
            cy.log('Data folder created')
        })
	})

    //Clear data folder if has an old data
	it('Clear data folder', () => {
        cy.exec('rm -rf data/*').then((result) => {           
            cy.log('Data folder cleared')
        })
	})

    //Download certificates
    it('Connect and download certificates from Artifactory', () => {
        cy.downloadfile(Cypress.config().certificatesURL,'data/certificates.tar.gz')
	})

    //Extract certificates
    it('Extract certificates', () => {
        cy.exec('tar -xf data/certificates.tar.gz -C data/').then((result) => {           
            cy.log('Certificates extracted')
        })
	})
    
    //Download data from artifactory
    it('Connect and download data from Artifactory', () => {
        cy.downloadfile(Cypress.config().dataURL,'data/data.tar.gz')
	})

    //Extract data
    it('Extract data', () => {
        cy.exec('tar -xf data/data.tar.gz -C data/').then((result) => {           
            cy.log('Data extracted')
        })
	})
})