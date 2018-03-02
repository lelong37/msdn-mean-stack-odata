var http = require('http');
﻿var express = require( 'express' );
var odata = require( './server/data/odata' );
var stringify = require( 'stringify-object' );
var config = require("./server/config/config");
var bodyParser = require("body-parser");

var app = express( );
odata.config( app );

app.use(bodyParser.json());
app.use( express.static( __dirname + "/public" ) );
 
var port = process.env.port || 3000;

app.get("/", function(req, res) {
	res.sendfile("/public/app/views/index.html", { root: __dirname });
});

http.createServer(app).listen(port);
console.log(stringify( process.env ));