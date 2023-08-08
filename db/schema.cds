namespace sap.capire.newbookshop;

using { Currency, managed } from '@sap/cds/common';

entity Books : managed, additionalInfo {
    key ID : Integer;
    title : localized String(111);
    descr : localized String (1111);
    stock : Integer;
    author : Association to Authors;
    price : Decimal(9, 2);
    currency : Currency;
}

entity Authors : managed {
    key ID : Integer;
    name : String(111);
    books: Association to many Books on books.author = $self;
}

entity Orders : managed {
    key UUID : UUID;
    OrderNo : String @title : 'Order Number';
    Items: Composition of many OrderItems on Items.parent = $self;
}

entity OrderItems {
    key ID : UUID;
    parent : Association to Orders;
    book : Association to Books;
    amount : Integer;
}

entity Movies : additionalInfo {
    key ID: Integer;
    name : String(150);
}

aspect additionalInfo {
    genre : String(100);
    language : String(200);
}