//To tell Mongoose how to handle our models.
const mongoose = require('mongoose');
const Schema = mongoose.Schema; //To tell Mongoose about our fields

// Define our model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true }, //Uniqueness check is case sensitive so make it lowercase.
    password: String
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema); //Loads the schema into Mongoose.

// Export the model
module.expots = ModelClass;