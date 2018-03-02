(function(odata) {

    var stringify = require('stringify-object');
    var config = require("../config/config");
    console.log(stringify(config));

    odata.config = function(app) {
        var express = require('express');
        require('odata-server');

        var northwindContextType = require('./northwind.js');

        var northwindContext = new NorthwindContext({
            address: config.mongoDb.address,
            port: config.mongoDb.port,
            username: config.mongoDb.username,
            password: config.mongoDb.password,
            name: config.mongoDb.name,
            databaseName: config.mongoDb.databaseName,
            dbCreation: $data.storageProviders.DbCreationType.DropAllExistingTables
        });

        console.log("northwindContext :");
        stringify(northwindContext);

        northwindContext.onReady(function(db) {
            northwindContextType.generateTestData(db, function(count) {
                console.log('Test data upload successful. ', count, 'items inserted.');
                console.log('Starting Northwind OData server.');

                app.use(express.basicAuth(function(username, password) {
                    if (username == 'admin') {
                        return password == 'admin';
                    } else return true;
                }));

                app.use('/northwind.svc', $data.ODataServer({
                    type: northwindContextType,
                    CORS: true,
                    database: 'northwind',
                    responseLimit: 100,
                    checkPermission: function(access, user, entitySets, callback) {
                        if (access & $data.Access.Create) {
                            if (user == 'admin') callback.success();
                            else callback.error('Auth failed');
                        } else callback.success();
                    },
                    provider: {
                        address: config.mongoDb.address,
                        port: config.mongoDb.port,
                        username: config.mongoDb.username,
                        password: config.mongoDb.password,
                        name: config.mongoDb.name,
                        databaseName: config.mongoDb.databaseName,
                    }
                }));

                console.log('Northwind OData server listening on http://localhost:1337/northwind.svc');

            });
        });

        //var newsReaderContextType = require( './newsreader.js' );
        //var newsReaderContext = new news.Types.NewsContext( { name: 'mongoDB', databaseName: 'newsreader', dbCreation: $data.storageProviders.DbCreationType.DropAllExistingTables } );
        //newsReaderContext.onReady( function ( db ) {
        //    newsReaderContextType.generateTestData( db, function ( count ) {
        //        console.log( 'Test data upload successful. ', count, 'items inserted.' );
        //        console.log( 'Starting NewsReader OData server.' );

        //        app.use( '/newsreader.svc', $data.ODataServer( {
        //            type: newsReaderContextType,
        //            CORS: true,
        //            database: 'newsreader',
        //            responseLimit: 100,
        //            checkPermission: function ( access, user, entitySets, callback ) {
        //                if ( access & $data.Access.Create ) {
        //                    if ( user == 'admin' ) callback.success( );
        //                    else callback.error( 'Auth failed' );
        //                } else callback.success( );
        //            },
        //            provider: {
        //                howto: 'You can pass a customized JayData provider configuration in here.'
        //            }
        //        } ) );

        //        console.log( 'NewsReader OData server listening on http://localhost:1337/newsreader.svc' );
        //    } );
        //} );
    };
})(module.exports);