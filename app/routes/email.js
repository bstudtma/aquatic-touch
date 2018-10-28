module.exports = function(app) {
  app.post('/email', function(req, res) {
    if (!req.body) return res.sendStatus(400)
    var email = req.body;
    require('../functions/email')("My subject",email.text);
    res.sendStatus(200); // equivalent to res.status(200).send('OK')
  });
  return function (req, res, next) {
    console.log('email:', Date.now());
    next();
  }
}
