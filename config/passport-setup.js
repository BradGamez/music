const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const config = require('./database');

passport.use(
    new GoogleStrategy({
    //options for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret
        }, (accessToken, refreshToken, profile, done) => { //passport callback function
        //we recive a special code (uri) and it contains the data infos that we want.
        console.log('passport callback function reached');
        console.log(profile);

        }
    )
);