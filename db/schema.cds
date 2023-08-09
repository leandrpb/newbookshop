namespace sap.capire.newbookshop;

using { Currency, managed, cuid } from '@sap/cds/common';
using { sap.capfire.products.Products } from '../product';


entity Books : Products, additionalInfo {
    author : Association to Authors;
}

entity Magazines : Products {
    publisher : String(120);
}

@cds.expose
entity Authors : managed {
    ID: Integer;
    name : String(111);
    books: Association to many Books on books.author = $self;
}

entity Orders : managed, cuid {
    OrderNo : String @title : 'Order Number';
    Items: Composition of many OrderItems on Items.parent = $self;
}

entity OrderItems : cuid {
    parent : Association to Orders;
    book : Association to Books;
    amount : Integer;
}

entity Movies : additionalInfo, cuid {
    name : String(150);
}

aspect additionalInfo {
    genre : Genre;
    language : String(200);
}

type Genre : String enum {
    Mistery; Fiction; Drama;
}