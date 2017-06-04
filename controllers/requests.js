var connection = require('../db/db');
var app = require('../server');
var client = require('socket.io-client');

var Request = module.exports = {
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
			Request.updateWalletUser(req.body, res, 'sum');
		}
	},
	getRequestByIdUser: function(req, res){
		connection.query(
			'SELECT * FROM requests WHERE id_requester = ? ORDER BY id DESC', 
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
			'SELECT requests.id, requests.date, requests.operation, requests.quantity, users.username, users.id AS id_requester FROM requests INNER JOIN users ON requests.id_requester = users.id WHERE status = ? ORDER BY id DESC',
			['progress'], 
			function(err, resul_req, fields){
				if(err != null){
					console.log(err);
					connection.end();
				}else{
					res.json({'requests':  resul_req.length > 0 ? resul_req : null}); 	
				}		
		});
	},
	processRequest: function(req, res){
		connection.query(
			'UPDATE requests set id_admin_request = ?, status = ?, message = ? WHERE id = ?',
			[req.params.id_admin_request, req.body.state == 'accept' ? 'accepted' : 'rejected', req.body.state == 'accept' ? null : req.body.message, req.body.id], 
			function(err, resul_req, fields){
				if(err != null){
					console.log(err);
					connection.end();
				}else{
					console.log('Update requests successfully');
					if(req.body.state == 'rejected'){						
						res.send({'request': 'rejected'});
					}
				}		
		});

		if(req.body.state == 'accept'){
			var today = new Date();
			connection.query(
				'INSERT INTO transactions (id_user,date,type,quantity) VALUES (?, ?, ?, ?)', 
				[req.body.id_requester, today.toISOString().slice(0,10), req.body.operation, req.body.quantity],
				function(err, result_transac, fields){
					if(err != null){
						console.log(err);
						connection.end();
					}else{
						console.log('Transactions added successfully');
					}		
			});		
			Request.updateWalletUser(req.body, res, 'subs');
		}
	},
	updateWalletUser: function(req, res, operation){
		connection.query(
			'SELECT money FROM wallet WHERE id_user = ?', 
			[req.id_requester],
			function(err, result_money, fields){
				if(err != null){
					console.log(err);
					connection.end();
				}else{
					var amount = operation == 'sum' ? Request.sumValues(result_money[0].money ,req.quantity) :
								Request.substractValues(result_money[0].money ,req.quantity);
					connection.query(
						'UPDATE wallet SET money = ? WHERE id_user = ?', 
						[ amount, req.id_requester],
						function(err, result_update, fields){
							if(err != null){
								console.log(err);
								connection.end();
							}else{
								console.log('Update successfully');

								var socket = client.connect('http://localhost:8080', { reconnect: true });
								socket.emit('message', {money: amount, id_user: req.id_requester});
								res.send({'status': 'saved'});
							}		
						}
					);	
			    }		
		});	
	},
	sumValues: function(money, quantity){
		return Number(money) + Number(quantity);
	},
	substractValues: function(money, quantity){
		return Number(money) - Number(quantity);
	}
}