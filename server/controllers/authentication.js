const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime(); //iat means issued at time.
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret); //JWT is a convention. As a convention they have a sub property. Sub being subject it means who is this token about.
}

exports.signin = function(req, res, next) {
    //User has already had their email and password auth'd.
    //We just need to give them a token.
    res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {// Maps to a get request. First parameter is the route. If it's sent to /, then run our function
    // req represents the HTTP request. Res represents the response we send back. Next is for error handling.

    const email = req.body.email; // Anything contained in the post request (body)
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: "You must provide email and password." });
    }

    // See if a user with the given email exists
    User.findOne({ email: email }, function(err, existingUser) {
        if (err) {
            return next(err);
        }

        // If a user with email does exists, return an error
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' }); //422 is bad supplied data.
        }

        // If a user with email does NOT exist, create and save user record
        const user = new User({ // Creates a new in-memory user
            email: email,
            password: password
        });

        // When it's saved to the DB, it automatically gets an _id assigned.
        user.save(function(err) {
            if (err) {
                return next(err);
            }

            // Respond to request indicating the user was created
            res.json({ token: tokenForUser(user) });
        }); // Saves a new user
    }); // Callback once the search is complete
}
/**
 * When singing up or signing in, give a token in exchange for an ID.
 * User ID + our secret string = JSON Web Token (JWT)
 *
 * In the future when a user makes an authenticated request they should include their JWT
 * JWT + our secret string = User ID
 * **/