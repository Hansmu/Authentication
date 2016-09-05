//To tell Mongoose how to handle our models.
const mongoose = require('mongoose');
const Schema = mongoose.Schema; //To tell Mongoose about our fields
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true }, //Uniqueness check is case sensitive so make it lowercase.
    password: String
});

// On Save Hook, encrypt password
userSchema.pre('save', function(next) { // Before saving a model, run this function.
    // Get access to the user model.
    const user = this; // Context of this function is the user.

    // Generate a salt, then run callback. A salt is a randomly generated string of characters. Combined it with a plain password.
    bcrypt.genSalt(10, function(err, salt) { // Takes some amount of time, so we pass a callback function.
        if (err) {
            return next(err);
        }

        // Hash(encrypt) our password using the salt.
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
                return next(err);
            }

            // hash is the result of our encryption, so we're going to overwrite the password.
            user.password = hash;
            next(); // Means it's now fine to save.
        });
    });
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema); //Loads the schema into Mongoose.

// Export the model
module.exports = ModelClass;