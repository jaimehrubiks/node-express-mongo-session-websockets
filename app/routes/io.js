module.exports = function(io){

    io.on('connection', function(socket){
        socket.on('chat message', function(msg){
            console.log('got: '+ msg);
            io.emit('chat message', msg);
        });
    });

}