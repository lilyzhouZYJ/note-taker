const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');

const config = require('./config.js');           /* configuration */

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {       // done is a callback function
        // build new User object
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        };

        // try to store in mongoDB
        try {
            let user = await User.findOne({ googleId: profile.id })
            if (user) {
                // user exists already
                done(null, user);
            } else {
                // create new user
                user = await User.create(newUser);
                done(null, user);
            }
        } catch (err) {
            console.log(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}