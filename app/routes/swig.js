var swig = require('swig');

module.exports = function(app) {
  swig.setDefaults({ cache: false });
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('views', __dirname + '/../views');

  return function (req, res, next) {
    console.log('swig:', Date.now());
    next();
  }
}
