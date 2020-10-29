const express = require('express');
const mongoose = require('mongoose');

const cookieSession = require('cookie-session'); // cookie session management package
const passport = require('passport'); //needed for cookie session

const keys = require('./config/keys');
require('./models/User'); //should be before passport since passport is using the orm
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in milliseconds
        keys: [keys.cookieKey], //allows to specify multiple key (will choose randomly)
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000; // Dynamic Port Binding
app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
