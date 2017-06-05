module.exports = {
   start :function(io) {
        io.sockets.on('connection', function(socket) {
            console.log('A client connected');
            socket.on('message', function(message) {
                io.sockets.emit('broadcast', message);
            });
        });
    }
}