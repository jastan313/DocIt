// modules =================================================
var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var nodemailer = require('nodemailer');

// email transport ==========================================
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "",
        pass: ""
    }
});

// models ===========================================
var User = require('../app/models/UserModel');
var Doc = require('../app/models/DocModel');
var Comment = require('../app/models/CommentModel');

// database =========================================
// connect to our mongoDB database 
var db = require('../config/db.js');

var mongooseStates = {0: 'Disconnected', 1: 'Connected', 2: 'Connecting', 3: 'Disconnecting'};
mongoose.connect(db.url, {useMongoClient: true}, function (error) {
    if (error) {
        console.log("Mongoose Connection Error: " + error);
    } else {
        console.log("Mongoose Connection Success: " + mongooseStates[mongoose.connection.readyState]);
    }
});

// configuration ===========================================
// set our port
var port = process.env.PORT || 8080;

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// set the static files location
app.use(express.static('public'));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// routes ==================================================
require('../app/routes/IndexRoute')(app, smtpTransport);
require('../app/routes/UsersRoute')(app);
require('../app/routes/DocsRoute')(app);
require('../app/routes/CommentsRoute')(app);   // configure our routes


// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

console.log('DocIt Start On Port: ' + port);

// expose app
exports = module.exports = app;     