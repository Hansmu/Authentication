const User = require('../models/user');

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

            res.json({ success: true });
        }); // Saves a new user
    }); // Callback once the search is complete

    // Respond to request indicating the user was created
}