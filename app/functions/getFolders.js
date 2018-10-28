var fs = require('fs');
var path = require('path');

module.exports = function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

//console.log(getDirectories(__dirname));