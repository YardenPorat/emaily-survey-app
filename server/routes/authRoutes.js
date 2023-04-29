const passport = require('passport');

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate(
            //internal identifier that calls GoogleStrategy
            'google',
            //data we want to receive from google
            { scope: ['profile', 'email'] }
        )
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys'); // where to go on successful authentication
        }
    );

    app.get('/api/logout', (req, res) => {
        console.log(`logging out`);
        req.logout(); //removes auth cookie, and logs out
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
