/**
 * @api {get} /requests get all requests with status 'progress' of users
 * @apiName getAllRequests
 * @apiGroup Requests
 * 
 * @apiSuccess {Integer} id Id unique of requests.
 * @apiSuccess {Date} date date of requests.
 * @apiSuccess {String} operation can be payment or retirement.
 * @apiSuccess {Double} quantity quantity of money for the requests.
 * @apiSuccess {String} username username of user requests.
 * @apiSuccess {Integer} id_requester id of user request.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     "requests": [{ "id": 1, "date": "2012-12-12", "operation": "retirement", "quantity": 12232, "username": "jonhDoe", "id_requester": 1 }]
 *     }
 *
 * @apiError ObjectRequestEmpty wallet for user empty, return a object empty.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 Not Found
 *     {
 *       "requests": null
 *     }
 */

/**
 * @api {post} /requests add request from user and data for type x-www-form-urlencoded
 * @apiName AddRequests
 * @apiGroup Requests
 * 
 * @apiParamExample {x-www-form-urlencoded} Body x-www-form-urlencoded example:
 * 		{
 * 			"id_requester": 1,
 * 			"operation": "retirement",
 * 			"date": "2012-12-12",
 * 			"quantity": 121221,
 * 		}
 * 
 * @apiSuccess {String} status state of operation if status is 'progress' it mean that admin his not approved, else the admin approved or the operation is payment.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     "status": "progress" 
 *     }
 */

/**
 * @api {get} /requests/user/:id_requester Get requests by id user
 * @apiName GetRequestsByUser
 * @apiGroup Requests
 * 
 * @apiParam {Integer} id_requester id of user
 *  
 * @apiSuccess {Integer} id Id unique of requests.
 * @apiSuccess {Date} date date of requests.
 * @apiSuccess {Integer} id_requester id of user transaction (the same requester)
 * @apiSuccess {String} status status of requests in 'progress', 'rejected'  or 'accepted'
 * @apiSuccess {String} operation can be payment or retirement.
 * @apiSuccess {Double} quantity quantity of money for the requests.
 * @apiSuccess {Integer} id_admin_request id of user admin that approved o reject request.
 * @apiSuccess {String} message can be null if request is not reject else contain a message from admin to user
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     "requests": [{ "id": 1, "date": "2012-12-12", "id_requester": 1, "status": "rejected", "operation": "retirement", "quantity": 12232, "id_admin_request": 3, "message": "The quantity is soo much" }]
 *     }
 *
 * @apiError ObjectRequestEmpty wallet for user empty, return a object empty.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 Not Found
 *     {
 *       "requests": null
 *     }
 */

/**
 * @api {post} /requests/admin/:id_admin_request An admin can Reject or accept retirement for requests of users 
 * @apiName AcceptOrRejectRequests
 * @apiGroup Requests
 * 
 * @apiParam {Integer} id_admin_request id admin of user
 *  
 * @apiSuccess {Object} status can be saved if request is not reject else is rejected
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     "request": "saved" 
 *     }
 */

var connection = require('../db/db');
var app = require('../../server');
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