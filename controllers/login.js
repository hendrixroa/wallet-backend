var connection = require('../db/db');

module.exports = {
	loginUser: function(req, res){
		connection.query('select * from users', function(err, rows, fields){
			connection.end();
			if(err != null){
				console.log(err);
			}else{
				console.log(rows);	
			}
			
		});
	}
}