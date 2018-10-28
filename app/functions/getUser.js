module.exports = function (req) {
  var user = "";
  if (req.secure) {
    if (req.user) {
      user = req.user;
    }
  }
  return user;
}
