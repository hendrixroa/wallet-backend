var http = require("http");
var config = require('config');
var users = require('./controllers/users'); 


http.createServer(function (request, response) {
   response.writeHead(200, {'Content-Type': 'text/json'});
      
   response.end('Hello World\n');
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');