var express = require('express');
var app = express();
var config = require('./config/dev');
var morgan = require('morgan');
var mysql = require('mysql');
var users = require('./controllers/users'); 
var bodyParser = require('body-parser');
var connection = mysql.createConnection({
  host     : config.database.host,
  user     : config.database.user,
  password : config.database.pass,
  database : config.database.dbname,
  port: config.database.port
});

	connection.connect(function(err){
		if(!err) {
		    console.log("Database is connected ... nn");    
		} else {
		    console.log("Error connecting database ... nn " + err);    
		}
	});

	//use morgan to log at command line
	app.use(morgan('combined')); //'combined' outputs the Apache style LOGs

	//parse application/json and look for raw text                                        
	app.use(bodyParser.json());                                     
	app.use(bodyParser.urlencoded({extended: true}));               
	app.use(bodyParser.text());                                    
	app.use(bodyParser.json({ type: 'application/json'}));


	app.listen(8080);
	console.log("Listening on port " + 8080);

	module.exports = app; 