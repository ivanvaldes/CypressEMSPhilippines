import 'cypress-file-upload';

//Login command
Cypress.Commands.add('login', (username, password) => {
	//Go to EMS page
	cy.visit(Cypress.config().baseUrl)
	cy.wait(1000)
	cy.get('.gwt-InlineLabel').contains('Welcome',{timeout: 7000})

	//Fill up information
    cy.get('input[name="j_username"]').type(username)
	cy.get('input[name="j_password"]').type(password)
	cy.get('#login-submit-button').click()
})

//Search file command
function searchfile(filename) {
	cy.exec('find . -name '+filename+' | sed "s|^\./||"').then((result) => {
		return cy.wrap(result);		
	})
}

Cypress.Commands.add('searchfile', (filename) => {
	searchfile(filename)	
})

//Download files from artifactory
Cypress.Commands.add('downloadfile', (url, outputPath) => {
	cy.exec(
		'wget --user='+Cypress.config().smttUser+
		' --password='+Cypress.config().smttPassword+
		' -v -d --auth-no-challenge '+
		url+
		' -O '+
		outputPath
	, { log: false, timeout: 1000000 }).then((result) => {           
		cy.log('File downloaded')
	})
})

//Upload file
Cypress.Commands.add('uploadfile', (file, asertion, mimetype,encoding) => {
	cy.fixture('../../'+file,'binary')
        .then(Cypress.Blob.binaryStringToBlob)
        .then((fileContent) => {
            cy.get(asertion).attachFile({ 
				fileContent, 
				filePath: file,
				mimeType: mimetype, 
				encoding: encoding
			})
        })
})