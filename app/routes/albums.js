var express = require('express');
var router = express.Router();
var getFolders = require('../functions/getFolders');
var fs = require('fs');

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  //console.log('Time: ', Date.now());
  //var getFolders = require('./getFolders');

  next();
});
// define the home page route
router.get('/', function (req, res) {
  // res.json(getFolders(__dirname + '/../../public/img/albums'));
  res.json(getFolders(__dirname + '/../../data/albums'));
  //console.log(getFolders(__dirname + '/../public/img/albums'));
});
router.get('/all/photos', function (req, res) {
  //res.json(getFolders(__dirname + '/public/files/photos'));
  //console.log(getFolders(__dirname + '/public/files/photos'));
  var albums = [];
  var folders = getFolders(__dirname + '/../../../albums');
  //console.log(folders.length);
  for (var i = 0; i < folders.length; i++) {
    var album = new Object();
    album.title = folders[i];
    //console.log(i);
    //console.log(album.title);
    album.photos = fs.readdirSync(__dirname + '/../../../albums/' + album.title);
    //console.log(album.photos);
    albums.push(album);
  }
  res.json(albums);
});
// define the about route
router.get('/:albumID', function (req, res) {
  res.send(req.params.albumID);
});

router.get('/:albumID/photos', function (req, res) {
  //console.log(fs.readdirSync(__dirname + '/../public/img/albums/' + req.params.albumID));
  res.json(fs.readdirSync(__dirname + '/../../../albums/' + req.params.albumID));
  //var files = fs.readdirSync(__dirname + '/public/files/photos/' + req.params.albumID);
  //for (var i = 0; i < files.length; i++){
  //    console.log(__dirname + '/public/files/photos/' + req.params.albumID + '/' + files[i]);
});

module.exports = router;
