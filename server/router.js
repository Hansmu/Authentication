const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false }); //By default tries to make a cookie based session.
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
    app.post('/signup', Authentication.signup);
    app.post('/signin', requireSignin, Authentication.signin)
}