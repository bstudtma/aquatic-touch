var fs = require('fs');
var path = require('path');

module.exports = function(app,express,imgdir) {
  app.use('/images',function (req, res, next) {
    if (req.query.size=='380') req.url='/380'+req.url;
    if (req.query.size=='800') req.url='/800'+req.url;
    next();
  },express.static(imgdir,{ maxAge: 86400000 }));

  app.post('/images', require('./authenticate'),require('./multer')(imgdir).array('images'), function(req, res) {
    for (var i = 0, len = req.files.length; i < len; i++) {
      fs.renameSync(req.files[i].path, req.files[i].path + path.extname(req.files[i].originalname));
      var image={};
      //image.path=global.site.imagePath + '/' + req.files[i].filename + path.extname(req.files[i].originalname)
      image.path= global.site.imagePath + '/' + req.files[i].filename + path.extname(req.files[i].originalname)
      require('../functions/minimage')(image.path,global.site.imagePath + '/380',380);
      require('../functions/minimage')(image.path,global.site.imagePath + '/800',800);
    }
    res.sendStatus(200); // equivalent to res.status(200).send('OK')
  });

  return function (req, res, next) {
    console.log('images:', Date.now());
    next();
  }
}
