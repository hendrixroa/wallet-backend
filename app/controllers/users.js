/**
 * @api {get} /users/:id/wallet get wallet by ID users
 * @apiName getWalletUser
 * @apiGroup UsersWallet
 *
 * @apiParam {Integer} id identification of user.
 * 
 * @apiSuccess {Integer} id Id unique of wallet.
 * @apiSuccess {Integer} id_user id of parent wallet.
 * @apiSuccess {Double} money quantity available of money user.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     "wallet": { "id": 1, "id_user": 1, "money": 100000 } 
 *     }
 *
 * @apiError ObjectWalletEmpty wallet for user empty, return a object empty.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 Not Found
 *     {
 *       "wallet": null
 *     }
 */

var connection = require('../db/db');

module.exports = {
	getWalletByUserId: function(req, res){
		connection.query('select * from wallet where id_user = ?', [req.params.id],function(err, rows, fields){
			if(err != null){
				console.log(err);
				connection.end();
			}else{
				 res.json({"wallet": rows.length > 0 ? rows[0] : null});
			}
		});
	}
}