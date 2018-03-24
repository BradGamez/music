const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const config = require('./database');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.database);

//Define User model
const User = sequelize.define('users', { 
    //on exporte le modèle User pour l'utiliser dans auth
  
    username: {
      type: Sequelize.STRING
    },
    googleId: {
      type: Sequelize.STRING
    }
  
  });

//Passport stuff with User model

passport.use(
    new GoogleStrategy({
    //options for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret
        }, (accessToken, refreshToken, profile, done) => { //passport callback function
        //we recive a special code (uri) and it contains the data infos that we want.
        console.log('passport callback function reached');
        
        //check if user already exist
            User.findOne({googleId: profile.id}).then(currentuser => {
                if(currentuser) {
                console.log('user already exist');
                } else {
                User.create({
                    username: profile.displayName,
                    googleId: profile.id
                });
                }
            });

        }
    )
);