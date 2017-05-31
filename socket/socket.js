module.exports = {
   start :function(io) {
        io.sockets.on('connection', function(socket) {
            console.log('A client connected');
            socket.on('message', function(message) {
                console.log('Hi bro, a message received '+ message);
                io.sockets.emit('broadcast', message);
            });
        });
    }
}