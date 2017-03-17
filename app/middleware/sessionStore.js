var session       = require('express-session');
var MongoStore = require('connect-mongo')(session);

var db = require('../db/database');

var sessionStore = new MongoStore({
    url: db.url,
    ttl: 24 * 60 * 60 * 1000, // 24 hours
})

module.exports = sessionStore;