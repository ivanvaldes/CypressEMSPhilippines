describe('Run Post-Load Processes', () => {

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
    
    it('Upload extra files', () => {   
        
        //Click on process data
        cy.get('.gwt-Label').contains('Process Data').click()
        
        //Click on 1. Import Electoral Data
        cy.contains('td', '1. Import Electoral Data').click()

        //Upload files
        cy.fixture('data').then((data) => {
            cy.searchfile(data.extraFilesFolder).then(value => 
                cy.exec('find '+value.stdout+' -type f -printf "%f\n"').then((result) => {
                    var extraFiles = result.stdout.split(/\r?\n/);
                    extraFiles.forEach(function (item) {
                        
                        //Define mimeType
                        var mimeType;
                        if(item.includes('zip')){
                            mimeType = 'application/zip';
                        }else if(item.includes('txt')){
                            mimeType = 'text/plain';
                        }else{
                            mimeType = 'application/octet-stream';
                        }

                        console.log(value.stdout+"/"+item)
                        cy.uploadfile(
                            value.stdout+"/"+item, 
                            '#inputDNDUpload',
                            mimeType,
                            'utf-8')
                    });
                })
            );
            //Validate files
            cy.get('[name="btnVal"]').click()
        })
    })

})
