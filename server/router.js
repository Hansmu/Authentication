module.exports = function(app) {
    app.get('/', function(req, res, next) { //Maps to a get request. First parameter is the route. If it's sent to /, then run our function
                 //req represents the HTTP request. Res represents the response we send back. Next is for error handling.
        res.send(['waterbottle', 'banana', 'tractor']);
    });
}