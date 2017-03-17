var express       = require('express'),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser'),
    passport      = require('passport'),
    session       = require('express-session'),
    morgan        = require('morgan'),
    sessionStore  = require('./sessionStore');

var config = require('../config');

module.exports = function(app){

    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(session({
        name:   'session_id',
        resave: true,
        saveUninitialized: false,
        secret: config.sessionPwd,
        store: sessionStore
    }))
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(__dirname + '/../public'));

}

                // For plain cookies instead of database
                //name:   'session_id',
                //keys:   [sessionPwd],
                //maxAge: 24 * 60 * 60 * 1000, // 24 hours,