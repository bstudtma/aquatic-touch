var passport = require('passport');
var session = require('express-session');

function secure(req, res, next) {
  if (!req.secure) {
    res.sendStatus(401);
  }
  next();
}

module.exports = function(app) {
  require('../functions/setup-passport')(passport);
  app.use(session({
    secret: 'secret secret',
    resave: false,
    saveUninitialized: false,
    secure: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/login', function(req, res) {
    if (!req.secure) {
      res.redirect(['https://', req.hostname, global.site.ports.https, req.url].join(''));
    } else {
      res.render('login', {});
    }
  });
  app.post('/login', secure, passport.authenticate('local', {session: true}), function(req, res) {
    res.redirect('/');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return function (req, res, next) {
    console.log('passport-sessions:', Date.now());
    next();
  }
}
