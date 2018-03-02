$data.Entity.extend( 'Northwind.Category', {
    CategoryID: { key: true, type: 'id', nullable: false, computed: true },
    CategoryName: { type: 'string', nullable: false, required: true, maxLength: 15 },
    Description: { type: 'string', maxLength: Number.POSITIVE_INFINITY },
    Picture: { type: 'blob', maxLength: Number.POSITIVE_INFINITY },
    Products: { type: 'Array', elementType: 'Northwind.Product', inverseProperty: 'Category' }
} );

$data.Entity.extend( 'Northwind.Customer', {
    CustomerID: { key: true, type: 'string', nullable: false, required: true, maxLength: 5 },
    CompanyName: { type: 'string', nullable: false, required: true, maxLength: 40 },
    ContactName: { type: 'string', maxLength: 30 },
    ContactTitle: { type: 'string', maxLength: 30 },
    Address: { type: 'string', maxLength: 60 },
    City: { type: 'string', maxLength: 15 },
    Region: { type: 'string', maxLength: 15 },
    PostalCode: { type: 'string', maxLength: 10 },
    Country: { type: 'string', maxLength: 15 },
    Phone: { type: 'string', maxLength: 24 },
    Fax: { type: 'string', maxLength: 24 },
    Orders: { type: 'Array', elementType: 'Northwind.Order', inverseProperty: 'Customer' }
} );

$data.Entity.extend( 'Northwind.Employee', {
    EmployeeID: { key: true, type: 'id', nullable: false, computed: true },
    LastName: { type: 'string', nullable: false, required: true, maxLength: 20 },
    FirstName: { type: 'string', nullable: false, required: true, maxLength: 10 },
    Title: { type: 'string', maxLength: 30 },
    BirthDate: { type: 'datetime' },
    HireDate: { type: 'datetime' },
    Address: { type: 'string', maxLength: 60 },
    City: { type: 'string', maxLength: 15 },
    Region: { type: 'string', maxLength: 15 },
    PostalCode: { type: 'string', maxLength: 10 },
    Country: { type: 'string', maxLength: 15 },
    HomePhone: { type: 'string', maxLength: 24 },
    Extension: { type: 'string', maxLength: 4 },
    Photo: { type: 'blob', maxLength: Number.POSITIVE_INFINITY },
    Notes: { type: 'string', maxLength: Number.POSITIVE_INFINITY },
    ReportsTo: { type: 'int' },
    Orders: { type: 'Array', elementType: 'Northwind.Order', inverseProperty: 'Employee' }
} );

$data.Entity.extend( 'Northwind.Order_Detail', {
    OrderID: { key: true, type: 'id', nullable: false, required: true },
    ProductID: { key: true, type: 'id', nullable: false, required: true },
    UnitPrice: { type: 'decimal', nullable: false, required: true },
    Quantity: { type: 'int', nullable: false, required: true },
    Discount: { type: 'number', nullable: false, required: true },
    Product: { type: 'Northwind.Product', required: true, inverseProperty: 'Order_Details' },
    Order: { type: 'Northwind.Order', required: true, inverseProperty: 'Order_Details' }
} );

$data.Entity.extend( 'Northwind.Order', {
    OrderID: { key: true, type: 'id', nullable: false, required: true },
    ShipName: { type: 'string', maxLength: 40 },
    ShipAddress: { type: 'string', maxLength: 60 },
    ShipCity: { type: 'string', maxLength: 15 },
    ShipRegion: { type: 'string', maxLength: 15 },
    ShipPostalCode: { type: 'string', maxLength: 10 },
    ShipCountry: { type: 'string', maxLength: 15 },
    OrderDate: { type: 'datetime' },
    RequiredDate: { type: 'datetime' },
    ShippedDate: { type: 'datetime' },
    Freight: { type: 'decimal' },
    Customer: { type: 'Northwind.Customer', required: true, inverseProperty: 'Orders' },
    Employee: { type: 'Northwind.Employee', inverseProperty: 'Orders' },
    Order_Details: { type: 'Array', elementType: 'Northwind.Order_Detail', inverseProperty: 'Order' },
    Shipper: { type: 'Northwind.Shipper', inverseProperty: 'Orders' }
} );

$data.Entity.extend( 'Northwind.Product', {
    ProductID: { key: true, type: 'id', nullable: false, computed: true },
    ProductName: { type: 'string', nullable: false, required: true, maxLength: 40 },
    EnglishName: { type: 'string', maxLength: 40 },
    QuantityPerUnit: { type: 'string', maxLength: 20 },
    UnitPrice: { type: 'decimal' },
    UnitsInStock: { type: 'int' },
    UnitsOnOrder: { type: 'int' },
    ReorderLevel: { type: 'int' },
    Discontinued: { type: 'bool', nullable: false, required: true },
    Category: { type: 'Northwind.Category', inverseProperty: 'Products' },
    Order_Details: { type: 'Array', elementType: 'Northwind.Order_Detail', inverseProperty: 'Product' },
    Supplier: { type: 'Northwind.Supplier', inverseProperty: 'Products' }
} );

$data.Entity.extend( 'Northwind.Shipper', {
    ShipperID: { key: true, type: 'id', nullable: false, computed: true },
    CompanyName: { type: 'string', nullable: false, required: true, maxLength: 40 },
    Orders: { type: 'Array', elementType: 'Northwind.Order', inverseProperty: 'Shipper' }
} );

$data.Entity.extend( 'Northwind.Supplier', {
    SupplierID: { key: true, type: 'id', nullable: false, computed: true },
    CompanyName: { type: 'string', nullable: false, required: true, maxLength: 40 },
    ContactName: { type: 'string', maxLength: 30 },
    ContactTitle: { type: 'string', maxLength: 30 },
    Address: { type: 'string', maxLength: 60 },
    City: { type: 'string', maxLength: 15 },
    Region: { type: 'string', maxLength: 15 },
    PostalCode: { type: 'string', maxLength: 10 },
    Country: { type: 'string', maxLength: 15 },
    Phone: { type: 'string', maxLength: 24 },
    Fax: { type: 'string', maxLength: 24 },
    Products: { type: 'Array', elementType: 'Northwind.Product', inverseProperty: 'Supplier' }
} );

$data.Class.define( "NorthwindContext", $data.EntityContext, null, {
    Categories: { type: $data.EntitySet, elementType: Northwind.Category },
    Customers: { type: $data.EntitySet, elementType: Northwind.Customer },
    Employees: { type: $data.EntitySet, elementType: Northwind.Employee },
    Order_Details: { type: $data.EntitySet, elementType: Northwind.Order_Detail },
    Orders: { type: $data.EntitySet, elementType: Northwind.Order },
    Products: { type: $data.EntitySet, elementType: Northwind.Product },
    Shippers: { type: $data.EntitySet, elementType: Northwind.Shipper },
    Suppliers: { type: $data.EntitySet, elementType: Northwind.Supplier },
} );

NorthwindContext.generateTestData = function( context, callBack ) {

    var category1 = new Northwind.Category( { CategoryName: 'Beverages', Description: 'Soft drinks, coffees, teas, beer, and ale' } );
    var category2 = new Northwind.Category( { CategoryName: 'Condiments', Description: 'Sweet and savory sauces, relishes, spreads, and seasonings' } );
    var category3 = new Northwind.Category( { CategoryName: 'Confections', Description: 'Desserts, candies, sweetbreads' } );
    var category4 = new Northwind.Category( { CategoryName: 'Dairy Products', Description: 'Cheeses' } );
    var category5 = new Northwind.Category( { CategoryName: 'Grains/Cereals', Description: 'Breads, crackers, pasta, and cereal' } );
    var category6 = new Northwind.Category( { CategoryName: 'Meat/Poultry', Description: 'Prepared meats' } );
    var category7 = new Northwind.Category( { CategoryName: 'Produce', Description: 'Dried fruit and bean curd' } );
    var category8 = new Northwind.Category( { CategoryName: 'Seafood', Description: 'Seaweed and fish' } );

    context.Categories.add( category1 );
    context.Categories.add( category2 );
    context.Categories.add( category3 );
    context.Categories.add( category4 );
    context.Categories.add( category5 );
    context.Categories.add( category6 );
    context.Categories.add( category7 );
    context.Categories.add( category8 );

    context.Products.add( new Northwind.Product( { ProductName: 'Ipoh Coffee', EnglishName: 'Malaysian Coffee', UnitPrice: 46, UnitsInStock: 670, Discontinued: false, Category: category1 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Outback Lager', EnglishName: 'Outback Lager', UnitPrice: 15, UnitsInStock: 150, Discontinued: false, Category: category1 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Mozzarella di Giovanni', EnglishName: 'Giovanni\'s Mozzarella', UnitPrice: 34.1, UnitsInStock: 650, Discontinued: false, Category: category1 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Chef Anton\'s Cajun Seasoning', EnglishName: 'Chef Anton\'s Cajun Seasoning', UnitPrice: 220, UnitsInStock: 177, Discontinued: false, Category: category2 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Genen Shouyu', EnglishName: 'Lite Sodium Soy Sauce', UnitPrice: 22, UnitsInStock: 480, Discontinued: false, Category: category2 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Gula Malacca', EnglishName: 'Malacca Dark Brown Sugar', UnitPrice: 85, UnitsInStock: 690, Discontinued: false, Category: category2 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Sirop d\'érable', EnglishName: 'Maple Syrup', UnitPrice: 28.5, UnitsInStock: 910, Discontinued: false, Category: category2 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Vegie-spread', EnglishName: 'Vegetable Sandwich Spread', UnitPrice: 43.9, UnitsInStock: 420, Discontinued: false, Category: category2 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Louisiana Fiery Hot Pepper Sauce', EnglishName: 'Louisiana Fiery Hot Pepper Sauce', UnitPrice: 21.05, UnitsInStock: 290, Discontinued: false, Category: category2 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Aniseed Syrup', EnglishName: 'Licorice Syrup', UnitPrice: 10, UnitsInStock: 560, Discontinued: false, Category: category3 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Northwoods Cranberry Sauce', EnglishName: 'Northwoods Cranberry Sauce', UnitPrice: 40, UnitsInStock: 660, Discontinued: false, Category: category3 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Pavlova', EnglishName: 'Pavlova Meringue Dessert', UnitPrice: 17.45, UnitsInStock: 880, Discontinued: false, Category: category3 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Teatime Chocolate Biscuits', EnglishName: 'Teatime Chocolate Biscuits', UnitPrice: 9.2, UnitsInStock: 250, Discontinued: false, Category: category3 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Gumbär Gummibärchen', EnglishName: 'Gumbär Gummibärchen', UnitPrice: 31.23, UnitsInStock: 150, Discontinued: false, Category: category3 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Schoggi Schokolade', EnglishName: 'Schoggi Chocolate', UnitPrice: 43.9, UnitsInStock: 490, Discontinued: false, Category: category3 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Chocolade', EnglishName: 'Dutch Chocolate', UnitPrice: 12.75, UnitsInStock: 290, Discontinued: false, Category: category3 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Mascarpone Fabioli', EnglishName: 'Mascarpone Fabioli', UnitPrice: 32, UnitsInStock: 390, Discontinued: false, Category: category4 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Camembert Pierrot', EnglishName: 'Pierrot Camembert', UnitPrice: 34, UnitsInStock: 670, Discontinued: false, Category: category4 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Chef Anton\'s Gumbo Mix', EnglishName: 'Chef Anton\'s Gumbo Mix', UnitPrice: 20.35, UnitsInStock: 620, Discontinued: false, Category: category5 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Thüringer Rostbratwurst', EnglishName: 'Thüringer Rostbratwurst', UnitPrice: 123, UnitsInStock: 770, Discontinued: false, Category: category6 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Perth Pasties', EnglishName: 'Perth Meat Pies', UnitPrice: 32.8, UnitsInStock: 220, Discontinued: false, Category: category6 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Tourtière', EnglishName: 'Pork Pie', UnitPrice: 7.45, UnitsInStock: 660, Discontinued: false, Category: category6 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Chang', EnglishName: 'Tibetan Barley Beer', UnitPrice: 19, UnitsInStock: 880, Discontinued: false, Category: category6 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Tofu', EnglishName: 'Bean Curd', UnitPrice: 23.25, UnitsInStock: 180, Discontinued: false, Category: category7 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Longlife Tofu', EnglishName: 'Longlife Bean Curd', UnitPrice: 10, UnitsInStock: 780, Discontinued: false, Category: category7 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Ikura', EnglishName: 'Fish Roe', UnitPrice: 31, UnitsInStock: 360, Discontinued: false, Category: category8 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Carnarvon Tigers', EnglishName: 'Carnarvon Tiger Prawns', UnitPrice: 62.5, UnitsInStock: 180, Discontinued: false, Category: category8 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Blö Kaviar', EnglishName: 'Blö Kaviar', UnitPrice: 15, UnitsInStock: 180, Discontinued: false, Category: category8 } ) );
    context.Products.add( new Northwind.Product( { ProductName: 'Boston Crab Meat', EnglishName: 'Boston Crab Meat', UnitPrice: 18.4, UnitsInStock: 180, Discontinued: false, Category: category8 } ) );


    context.saveChanges( function ( count ) {
        if ( callBack ) {
            callBack( count );
        }
    } );
};

module.exports = exports = NorthwindContext;