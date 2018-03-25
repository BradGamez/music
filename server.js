var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
const passportSetup = require('./config/passport-setup'); //to fire google strategy when server is on.
const cookieSession = require('cookie-session');
const config = require('./config/database');
const passport = require('passport');

//Routes
var api = require('./routes/api');
var auth = require('./routes/auth');

var app = express();

//Cookie stuff
app.use(cookieSession({
    maxAge: 24*60*60*1000, //Lenght of cookie is validate in ms.,
    keys: [config.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/src'));
app.use(bodyParser.json());

app.use('/api', api);
app.use('/auth', auth);


app.get('/', function (req, res) {
    res.send('Please use /api/books or /api/genres');

});


//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));