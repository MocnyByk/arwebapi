// server.js

// To start, enter 'node server.js' in the terminal

// BASE SETUP
// =============================================================================

var mongoose    = require('mongoose');
mongoose.connect('mongodb://apiuser:password@localhost:27017/arartistry'); // connect to our database

// models used in routes
//var mDocument   = require('./app/models/document');

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var logger      = require('./app/common/handler-logger');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================

// middleware to use for all requests
app.use('/*', function(req, res, next) {
    // do logging
    var today = new Date();
    var dateTime = today.getFullYear() + ':' + (today.getMonth()+1) + ':' + today.getDate() + ':' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    logger.log(dateTime + ' ' + req.method + ' ' + req.originalUrl + ' ' + JSON.stringify(req.body));

    next(); // make sure we go to the next routes and don't stop here
});

// REGISTER OUR ROUTES -------------------------------
/*
    Rule of thumb for request methods:

    GET return everything, good to have some query parameters. Not always supported
    GET /:id return object of given id or send a 400 if the object doesn't exist
    POST Create the given object, always requires authorization
    PUT /:id Update the given object, always requires authorization
    DELETE /:id Delete the object with the given id, always requires authorization
*/
app.use('/', require('./app/routes/route-index'));
app.use('/document', require('./app/routes/route-document'));
app.use('/member', require('./app/routes/route-member'));

// START THE SERVER
// =============================================================================
app.listen(port);
logger.log('Listening on port: ' + port);