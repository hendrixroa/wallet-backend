var connection = require('../db/db');
var sha1 = require('sha1');

module.exports = {
	loginUser: function(req, res){
		connection.query('select * from users where username = ? AND password = ?', [req.body.username, sha1(req.body.password)] ,function(err, rows, fields){
			if(err != null){
				console.log(err);
				connection.end();
			}else{
				res.json({'user': rows ? rows : null});
			}		
		});
	}
}