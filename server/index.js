/**
 * Authentication is the exchange of credentials for some piece of identifying information.
 * The important part is how we include that authentication information. Either by cookies or by a manually set token.
 *
 * Cookies are included with a HTTP request by default. Whenever you visit a website, you have some number of cookies that are associated with a domain.
 * Cookies are to bring state to a stateless protocol - HTTP. HTTP protocol has no state. It's by including cookies that identify us to the server.
 * Cookies are included on all HTTP requests by default. They're in the header. A server can choose to place info on a cookie to identify them uniquely.
 * We could stick information into a cookie to identify the user. Cookies are unique to each domain. Cannot be sent to different domains, exists for security purposes.
 *
 * Tokens we have to wire them up manually. We have to manually say to include in the header. The benefit is that we can send it to any domain we wish.
 * This is useful if we make a distributed system for our application. For example an app with many different servers posted on many different domains, but I still
 * want my user to be authenticated on all these different domains.
 *
 * Main difference is that with cookies we're limited to a single domain, whereas with a token we are not.
 *
 * In our example we have a content server and an api server.
 * Content server serves index.html + bundle.js. A lightweight server, doesn't require a lot of resources. No auth required.
 * API server on a different server.
 * **/

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