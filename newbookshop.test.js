const cds = require("@sap/cds")

describe('Bookshop: OData Protocal Level Testin', () => {

    const app = require('express')()
    const request = require('supertest')(app)

    beforeAll(async () => {
        console.debug(__dirname);
        await cds.deploy(__dirname + '/srv/cat-service').to('sqlite::memory:')
        //await cds.serve('CatalogService').from(__dirname,'/../srv/cat-service').in(app)
    })
    
    it('Service $medatada document', async () => {

        const response = await request
           .get('/browse/$metadata')
           .expect('Content-Type','/^application\/xml/')
           .expect(200)

        const expectedVersion = '<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">'
        const expectedBooksEntitySet = '<EntitySet Name="Books" EntityType="CatalogService.Books">'
        expect(respnpmonse.text.includes(expectedVersion)).toBeTruthy()
        expect(response.text.includes(expectedBooksEntitySet)).toBeTruthy()           

    })

})

//describe('Bookshop: CDS Service Level Testin', () => {})