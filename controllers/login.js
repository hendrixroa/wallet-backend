var connection = require('../db/db');
var sha1 = require('sha1');

module.exports = {
	loginUser: function(req, res){
		connection.query('select * from users', function(err, rows, fields){
			if(err != null){
				console.log(err);
				connection.end();
			}else{
				console.log(rows);
				console.log(
					rows.find(function(user){
						return user.username == req.body.username && user.password == sha1(req.body.password);
					})
				);

				var result = rows.find(function(user){
					return user.username == req.body.username && user.password == sha1(req.body.password);
				});

				res.json({'id': result == undefined ? null : result.id});
			}
			
		});
	}
}