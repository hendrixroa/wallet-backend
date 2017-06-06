var connection = require('../db/db');

module.exports = {
    getTransactionsByIdUser: function(req, res){
        connection.query('select * from transactions WHERE id_user = ? ORDER BY date DESC', [req.params.id_user] ,function(err, rows, fields){
			if(err != null){
				console.log(err);
				connection.end();
			}else{
				res.json({'transactions': rows.length > 0 ? rows : null});
			}		
		});
    },
	getRetireByIdUser: function(req, res){
		connection.query('select * from transactions WHERE id_user = ? AND type = ? ORDER BY date DESC', [req.params.id_user, 'retirement'] ,function(err, rows, fields){
			if(err != null){
				console.log(err);
				connection.end();
			}else{
				res.json({'retirements': rows.length > 0 ? rows : null});
			}		
		});
	}
}