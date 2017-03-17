var express       = require('express');
    passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){

    passport.use(new LocalStrategy(
        function(username, password, done) {
            console.log(username)
            user = { username: username, password: password};
            if(user.username==='admin') return done(null, user);
            else return done(null, false, { message: 'Incorrect password.' })
            /*
            User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
            });
            */
        }
    ));


    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(function(id, done) {
        done(null, id)
        /*
        User.findById(id, function(err, user) {
            done(err, user);
        });
        */
    });


}