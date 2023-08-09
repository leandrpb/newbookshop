using { sap.capire.newbookshop as my } from '../db/schema';

service CatalogService @(path:'/browse'){
    
    @readonly entity Books as select from
                 my.Books{ * } excluding { createdBy, modifiedBy, price};
    
    @readonly entity Authors as select from 
                 my.Authors { * };
    @requires_: 'authenticated-user'

    @insertonly entity Orders as projection on my.Orders;
}