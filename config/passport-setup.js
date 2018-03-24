const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const config = require('./database');

passport.use(
    new GoogleStrategy({
    //options for the google strategy
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret
    }), () => {
        //passport callback function
    }
)