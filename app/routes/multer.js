var multer = require('multer');

module.exports = function(dest) {
  return multer({
    dest: dest
  })
}
