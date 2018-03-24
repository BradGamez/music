const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {

});

//Passport as well
router.get('/logout', (req,res) => {
    res.send('loggout');
});

//This is where passeport comes in.
router.get('/google', passport.authenticate('google', {
    //Defining what data i want from the user to use in my app here
    scope: ['profile']
})); //passport nows that it's the google strategy.

//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('you reached the callback URI'); 
    //before we see tis message, it fires the middleware (to run the callback function)
})


module.exports = router;