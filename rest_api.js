// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Engine = require('./engine');
var API = require('./api');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// Plumbing ====================================================================

var engine = new Engine();
engine.start();

var api = new API(engine);

// REST API ====================================================================

app.get('/transferPoints', api.transferPoints);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
