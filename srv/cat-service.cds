using { sap.capire.newbookshop as my } from '../db/schema';

@impl: './my-service.js'
service CatalogService @(path:'/browse'){
    
    @readonly entity Books as select from
                 my.Books{ * } excluding { createdBy, modifiedBy, price};
    
    @requires_: 'authenticated-user'

    @insertonly entity Orders as projection on my.Orders;
}