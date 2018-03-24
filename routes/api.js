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

// DEFAULT GET HERE ///
router.get('/music', function (req, res) {

    Song.findAll().then(songs => {
        res.json(songs)
      })
});

/// GET Song BY ID ///
router.get('/music/id=:id', function (req, res) {

  Song.find({
    where: {
      id: req.params.id
    }
  }).then((song) => song ? res.json(song) : res.status(404).json({error: 'unknown song'}))
});

/// GET Song BY name ///
router.get('/music/name=:name', function (req, res) {

    Song.find({
      where: {
        title: req.params.name
      }
    }).then((song) => song ? res.json(song) : res.status(404).json({error: 'unknown song'}))
  });

/// GET Song BY album ///
router.get('/music/album=:album', function (req, res) {

    Song.find({
      where: {
        album: req.params.album
      }
    }).then((song) => song ? res.json(song) : res.status(404).json({error: 'unknown song'}))
  });

  //Users here later on

module.exports = router;