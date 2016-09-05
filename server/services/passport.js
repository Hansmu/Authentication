const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = { usernameField: 'email' }; // Specify what's the field for username called.
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    //Verify this username and password
    User.findOne({ email: email }, function(err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false);
        }

        //Compare passwords
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                return done(err);
            }

            if (!isMatch) {
                return done(null, false);
            }

            return done(null, user);
        });
    });
});

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) { //Second parameter is a function that's going to be run every time we try to authenticate a JWT.
    // Payload is the decoded JWT token. Done is a callback function we should call if we successfully authenticate.

    User.findById(payload.sub, function(err, user) {
        if (err) {
            return done(err, false);
        }

        if (user) {
            done(null, user); //First parameter is an error object, the second is our user object.
        } else {
            done(null, false);
        }
    });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);