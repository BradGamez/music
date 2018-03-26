const router = require('express').Router();

var Sequelize = require('sequelize');
const config = require('../config/database');

//Connect to Postgre
const sequelize = new Sequelize(config.database);

//Db connection
sequelize
    .authenticate()
    .then(() => {
      console.log('Db connected...');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
});

//init song model
const Song = sequelize.define('songs', {

  title: {
    type: Sequelize.TEXT
  },
  artist: {
    type: Sequelize.TEXT
  },
  album: {
      type: Sequelize.TEXT
  },
  album_img: {
      type: Sequelize.STRING
  },
  path: {
      type: Sequelize.STRING
  }
});

//Api stuff with song Model

//let's check if user is connected before doing anything
const authCheck = (req, res, next) => { //Simple middleware to be injected.
  if(!req.user){
    //if user is not logged in
    res.send('Error 404, please try again later.')
  } else {
    next();
  }
};

// DEFAULT GET HERE ///
router.get('/music', authCheck, function (req, res) {

    Song.findAll().then(songs => {
        res.json(songs)
      })
});

/// GET Song BY ID ///
router.get('/music/id=:id', authCheck, function (req, res) {

  Song.find({
    where: {
      id: req.params.id
    }
  }).then((song) => song ? res.json(song) : res.redirect('/music/error'))
});

/// GET Song BY name ///
router.get('/music/name=:name', authCheck, function (req, res) {

    Song.find({
      where: {
        title: req.params.name
      }
    }).then((song) => song ? res.json(song) : res.redirect('/music/error'))
  });

/// GET Song BY album ///
router.get('/music/album=:album', authCheck, function (req, res) {

    Song.find({
      where: {
        album: req.params.album
      }
    }).then((song) => song ? res.json(song) : res.redirect('/music/error'))
  });

//Count musics
router.get('/music/count', authCheck, function (req, res) {
  Song.count().then(c => {
    res.json(c);
  });
});

/// POST NEW Song ///
router.post('/music', authCheck, function (req, res) {

  var newId;

  Song.count().then(count => {

    newId = count + 1;

    Song.create({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      album_img: req.body.album_img,
      path: "module/ressource/" + req.body.path,
      id: newId

    }).then((song) => res.json(song))
  });
});

/// DELETE Song ///
router.delete('/music/id=:id', authCheck, function (req, res) {

  Song.destroy({
    where: {
      id: req.params.id
    }
  }).then((song) => song ? res.json(song) : res.redirect('/music/error'))
});

module.exports = router;