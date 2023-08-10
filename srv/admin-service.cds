using { sap.capire.newbookshop as my } from '../db/schema';

service AdminService  @(_requires:'authenticated-user', path:'/admin') {
    
   entity Books as projection on my.Books;
   entity Authors as projection on my.Authors;
   entity Orders as select from my.Orders;
   entity Movies as projection on my.Movies;
   entity Magazines as projection on my.Magazines;

}

// Enable Fiori Draft for Orders
annotate AdminService.Orders with @odata.draft.enabled;

// Temporary workaround -> cap/issues#3121
extend service AdminService with {
  entity OrderItems as select from my.OrderItems;
}