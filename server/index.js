const express = require('express');
const mongoose = require('mongoose');

const cookieSession = require('cookie-session'); // cookie session management package
const passport = require('passport'); //needed for cookie session
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User'); //should be before passport since passport is using the orm
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in milliseconds
        keys: [keys.cookieKey], //allows to specify multiple key (will choose randomly)
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // make express server production assets
    app.use(express.static('client/build'));

    // make express serve index.html if route isn't recognized
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000; // Dynamic Port Binding
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
