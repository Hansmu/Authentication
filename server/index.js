//Main starting point of the application.
//node index.js to run the server.
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser'); // Used to parse incoming requests as JSON.
const morgan = require('morgan'); // Morgan is a logging framework.
const app = express(); //Create an instance with Express
const router = require('./router');
const mongoose = require('mongoose');

//DB setup
mongoose.connect('mongodb://localhost:auth/auth'); //Creates a new DB called auth inside your MongoDB.

//App Setup
app.use(morgan('combined')); //Middleware with app.use().
app.use(bodyParser.json({ type: '*/*'})); //Middleware
router(app);

//Server Setup
const port = process.env.PORT || 3090; //If port defined, use that, if not then 3090.
const server = http.createServer(app); //Native node library to work with http at a very low level.
server.listen(port);
console.log('Server listening on: ', port);
