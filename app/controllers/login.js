/**
 * @api {post} /login Sending credentials of user for login
 * @apiName PostUser
 * @apiGroup Login
 *
 * @apiParam {String} username Username or nickname for access of website.
 * @apiParam {String} password Field for secure and unique access users
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     user:
 * 	   {
 * 	   "id": 1,
 * 	   "username": "johndoe",
 *     "is_admin": 0 // 0 for not admin and 1 for admin
 * 	   } 
 *     }
 *
 * @apiError The user not exist.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 Not Found
 *     {
 *       "user": ""
 *     }
 */

var connection = require('../db/db');
var sha1 = require('sha1');

module.exports = {

	loginUser: function(req, res){
		connection.query('select id,username,is_admin from users where username = ? AND password = ?', [req.body.username, sha1(req.body.password)] ,function(err, rows, fields){
			if(err != null){
				console.log(err);
				connection.end();
			}else{
				res.send({'user': rows.length > 0 ? rows[0] : ''});
			}		
		});
	}
}