const keys = require('../config/keys');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users'); // fetching from mongoose

passport.serializeUser((user, done) => {
    done(null, user.id); //use the db id ()
});

passport.deserializeUser(async (id, done) => {
    user = await User.findById(id);
    if (user) {
        done(null, user);
    }
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback', // same one that was defined on googleAPI
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
                //already have a record with a profile ID
                done(null, existingUser);
            }

            //id not found, make a new record (model instance)
            const user = await new User({ googleId: profile.id }).save();
            done(null, user);
        }
    )
);
