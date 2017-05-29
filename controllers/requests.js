var connection = require('../db/db');

module.exports = {
	addRequest: function(req, res){
        connection.query(
			'INSERT INTO requests (id_requester,status,date,operation,quantity) VALUES (?, ?, ?, ?, ?)', 
			[req.body.id_requester, req.body.operation == 'payment' ? 'accepted' : 'progress',req.body.date, req.body.operation, req.body.quantity],
			function(err, resul_req, fields){
				if(err != null){
					console.log(err);
					connection.end();
				}else{
					if(req.body.operation == 'retirement'){ 
						res.send({'status': 'in-progress'}); 
					}	 
					console.log(resul_req);
				}		
		});
		
		if(req.body.operation == 'payment'){
			connection.query(
			'INSERT INTO transactions (id_user,date,type,quantity) VALUES (?, ?, ?, ?)', 
			[req.body.id_requester, req.body.date, req.body.operation, req.body.quantity],
			function(err, result_transac, fields){
				if(err != null){
					console.log(err);
					connection.end();
				}else{
					console.log('Transactions added successfully');
				}		
			});

			connection.query(
			'SELECT money FROM wallet WHERE id_user = ?', 
			[req.body.id_requester],
			function(err, result_money, fields){
				if(err != null){
					console.log(err);
					connection.end();
				}else{
					connection.query(
					'UPDATE wallet SET money = ? WHERE id_user = ?', 
					[Number(result_money[0].money) + Number(req.body.quantity),req.body.id_requester],
					function(err, result_update, fields){
						if(err != null){
							console.log(err);
							connection.end();
						}else{
							console.log('Update successfully');
							res.send({'status': 'saved'});
						}		
					});	
				}		
			});
		}
	},
	getRequestByIdUser: function(req, res){
		connection.query(
			'SELECT * FROM requests WHERE id_requester = ?', 
			[req.params.id_requester],
			function(err, resul_req, fields){
				if(err != null){
					console.log(err);
					connection.end();
				}else{
					res.json({'requests':  resul_req.length > 0 ? resul_req : null }); 	
				}		
		});
	},
	getRequests: function(req, res){
		connection.query(
			'SELECT * FROM requests', 
			function(err, resul_req, fields){
				if(err != null){
					console.log(err);
					connection.end();
				}else{
					res.json({'requests':  resul_req.length > 0 ? resul_req : null }); 	
				}		
		});
	}
}