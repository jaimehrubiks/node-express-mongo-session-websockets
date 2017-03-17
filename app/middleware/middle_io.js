var passportSocketIo = require("passport.socketio"),
    cookieParser = require('cookie-parser'),
    config = require('../config'),
    session       = require('express-session'),
    MongoStore    = require('connect-mongo')(session),
    sessionStore  = require('./sessionStore');

module.exports = function(io){

    io.use(passportSocketIo.authorize({
        cookieParser: cookieParser,       // the same middleware you registrer in express
        key:          'session_id',       // the name of the cookie where express/connect stores its session_id
        secret:       config.sessionPwd,    // the session_secret to parse the cookie
        store:        sessionStore,        // we NEED to use a sessionstore. no memorystore please
        success:      onAuthorizeSuccess,  // *optional* callback on success - read more below
        fail:         onAuthorizeFail,     // *optional* callback on fail/error - read more below
    }));

    function onAuthorizeSuccess(data, accept){
    accept();
    }

    function onAuthorizeFail(data, message, error, accept){
    if(error)
        accept(new Error(message));
    // this error will be sent to the user as a special error-package
    // see: http://socket.io/docs/client-api/#socket > error-object
    }
}

