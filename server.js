var express = require('express');
var app = express();
var config = require('./config/dev');
var morgan = require('morgan');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var users = require('./controllers/users'); 
var login = require('./controllers/login');
var requests = require('./controllers/requests');
var transactions = require('./controllers/transactions');
var db = require('./db/db');
	//use morgan to log at command line
	app.use(morgan('combined')); //'combined' outputs the Apache style LOGs

	//parse application/json and look for raw text                                        
	app.use(bodyParser.json());                                     
	app.use(bodyParser.urlencoded({extended: true}));               
	app.use(bodyParser.text());                                    
	app.use(bodyParser.json({ type: 'application/json'}));

	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

	app.route('/login')
		.post(login.loginUser);

	app.route('/users/:id/wallet')
		.get(users.getWalletByUserId);

	app.route('/requests')
		.post(requests.addRequest)
		.get(requests.getRequests);

	app.route('/requests/user/:id_requester')
		.get(requests.getRequestByIdUser);	

	app.route('/transactions/user/:id_user')
		.get(transactions.getTransactionsByIdUser);			

	app.listen(8080);
	console.log("Listening on port " + 8080);

	module.exports = app; 