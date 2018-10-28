module.exports = function(req, res, next) {
  if (!req.secure) {
    res.sendStatus(401);
    return;
  }
  if (req.isAuthenticated()) return next();
  res.sendStatus(401);
}
