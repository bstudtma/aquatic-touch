module.exports = function(appPath) {
  global.site={};
  global.site.ssl={};
  global.site.appPath = appPath;
  global.site.rootPath = appPath + "/..";
  global.site.dataPath = global.site.rootPath + "/data";
  global.usersPath=global.site.dataPath + "/users.json";
  global.site.ssl.certPath = global.site.dataPath + "/ssl/cert.pem";
  global.site.ssl.keyPath = global.site.dataPath + "/ssl/key.pem";
  global.site.contentPath = global.site.dataPath + "/content";
  global.site.imagesPath = global.site.dataPath + "/images";
  global.site.gmailPath = global.site.dataPath + "/gmail.json";
  global.site.ports = {};
  global.site.ports.https = "";

  return function (req, res, next) {
    console.log('paths:', Date.now());
    req.rootPath = appPath;
    req.dataPath = req.rootPath + "/../data";
    next();
  }
}
