var connection = require('../db/db');

module.exports = {
	getWalletByUserId: function(req, res){
		connection.query('select * from wallet where id_user = ?', [req.params.id],function(err, rows, fields){
			if(err != null){
				console.log(err);
				connection.end();
			}else{
				 res.json({"wallet": rows.length > 0 ? rows : null});
			}
		});
	}
}