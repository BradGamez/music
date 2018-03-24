const router = require('express').Router();

router.get('/login', (req, res) => {

});

//Passport as well
router.get('/logout', (req,res) => {
    res.send('loggout');
});

//This is where passeport comes in.
router.get('/google', (req, res) => {
    res.send('connected with google')
});

module.exports = router;