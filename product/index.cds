namespace sap.capfire.products;
using { Currency, managed, cuid } from '@sap/cds/common';

entity Products : managed, cuid {
    title : localized String(111);
    descr : localized String (1111);
    stock : Integer;
    price : Decimal(9, 2);
    currency : Currency;
    category : Association to Categories;  
}

entity Categories : cuid {
    parent : Association to Categories;
    children : Composition of many Categories on children.parent = $self;
}



