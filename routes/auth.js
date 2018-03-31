const router = require('express').Router();
const passport = require('passport');

//This is where passeport comes in.
router.get('/google', passport.authenticate('google', {
    //Defining what data i want from the user to use in my app here (your google+ profile infos)
    scope: ['profile']
})); //passport nows that it's the google strategy.

//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log('you reached the callback URI');
    //before we see tis message, it fires the middleware (to run the callback function)
    res.redirect('/#!/music');
})


module.exports = router;