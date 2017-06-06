/**
 * @api {get} /transactions/user/:id_user Get all transactions by id user ordered by date, currently first
 * @apiName GetTransactions
 * @apiGroup Transactions
 *
 * @apiParam {Integer} id_user User id of table users.
 * 
 * @apiSuccess {Integer} id Id unique of transaction.
 * @apiSuccess {Integer} id_user user id.
 * @apiSuccess {Date} date date of day when the transaction is finished.
 * @apiSuccess {String} type type of transaction can be retirement or payment.
 * @apiSuccess {Double} quantity quantity asociated of transaction.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     "transactions": [{ "id": 1, "id_user": 1, "date": "2012-12-12", "type": "payment", "quantity": 123232 }]
 *     }
 *
 * @apiError ObjectTransactionsEmpty Transactions not exist or user id not exist, return a object empty.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 Not Found
 *     {
 *       "transactions": null
 *     }
 */

/**
 * @api {get} /transactions/user/:id_user/retire Get all retirements by id user ordered by date, currently first
 * @apiName GetRetirements
 * @apiGroup Transactions
 *
 * @apiParam {Integer} id_user User id of table users.
 * 
 * @apiSuccess {Integer} id Id unique of transaction.
 * @apiSuccess {Integer} id_user user id.
 * @apiSuccess {Date} date date of day when the transaction is finished.
 * @apiSuccess {String} type type of transaction is retirement.
 * @apiSuccess {Double} quantity quantity asociated of transaction.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     "retirements": [{ "id": 1, "id_user": 1, "date": "2012-12-12", "type": "retirement", "quantity": 332 }]
 *     }
 *
 * @apiError ObjectRetirementsEmpty Retirements not exist or user id not exist, return a object empty
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 Not Found
 *     {
 *       "retirements": null
 *     }
 */

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