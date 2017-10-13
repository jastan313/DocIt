// modules =================================================
var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// models ===========================================
var User = require('../app/models/user_model');
var Doc = require('../app/models/doc_model');
var Comment = require('../app/models/comment_model');

// configuration ===========================================

// config files
var db = require('../config/db.js');

// set our port
var port = process.env.PORT || 8080; 

// connect to our mongoDB database 
mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// set the static files location
app.use(express.static(__dirname + '/public')); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// routes ==================================================
require('../app/routes/index_route')(app);
require('../app/routes/users_route')(app);
require('../app/routes/docs_route')(app);
require('../app/routes/comments_route')(app); // configure our routes


// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;     