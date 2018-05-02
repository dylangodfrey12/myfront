'use strict';
var express = require('express'),
	routes = require('./app/routes/index.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	fs = require('fs'),
	session = require('express-session'),
	https = require('https');
	var bodyParser = require('body-parser');
	var router = express.Router();
	var Users = require('./app/models/users');
var app = express();
require('dotenv').load();


var port = process.env.PORT || 8080;
var path = process.cwd();

var certOptions = {
	key: fs.readFileSync(require('path').resolve('./server.key')),
	cert: fs.readFileSync(require('path').resolve('./server.crt'))
  }
require('./app/config/passport')(passport);

//server
//mongoose.connect(process.env.MONGO_URI);
mongoose.connect('mongodb://User:password@ds263089.mlab.com:63089/mongoreacttestdb')
mongoose.Promise = global.Promise;


app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  	next();
});

app.use(passport.initialize());
app.use(passport.session());
//Next, we need to pass the Passport object into our routes file as an argument. 
//Remember that we used Passport functionality within our routes, so we need to ensure that we enable the use of the Passport methods by passing it into our routes module
routes(app, passport);



var server = https.createServer(certOptions, app).listen(port, function () {
	console.log('Node.js listening on port ' + port + '...');
	console.log(mongoose.connection.readyState);
 });

	
