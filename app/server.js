/*
    Author: Jaime Hidalgo García
    Contributors: 

    You can freely distribute, share and modify this code under mit license, but you must include that license and this piece of code somewhere in your proyect.
    
    Contributors can ask for adding themselves in here after an approved useful contribution.
*/

/* 
 * Imports
****************************/
var express  = require('express'),
    app      = express(),
    passport = require('passport'),
    server   = require('http').Server(app),
    io       = require('socket.io')(server);

var database = require('./db/database'),
    config   = require('./config');

/* 
 * Start app
****************************/
database.connect();

/* 
 * MiddleWare
****************************/
require('./middleware/middle_passport')(passport);       // Passport Middleware
require('./middleware/middle_express')(app);             // Express Middleware
require('./middleware/middle_io')(io);                   // io Middleware

/* 
 * Rest Routes
****************************/
app.use('/', require('./routes/index'));

/* 
 * WebSockets
****************************/
require('./routes/io')(io);

/* 
 * Listen
****************************/
server.listen(config.port, function () {
  console.log('Example app listening on port ' + config.port + '!');
});
