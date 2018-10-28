var fs = require('fs');
var path = require('path');

//module.exports =
//global.myglobal = 1;
//var value = global["myglobal"];
//console.log(global["myglobal"]);

module.exports = function cacheFiles(srcpath) {
    //  return fs.readdirSync(srcpath).filter(function (file) {
    //    return fs.statSync(path.join(srcpath, file)).isFile();
    //  });
    global['content'] = {};
    var list = fs.readdirSync(srcpath).filter(function (file) {
      return fs.statSync(path.join(srcpath, file)).isFile();
    });
    //    console.log(list);
    for (var i = 0; i < list.length; i++) {
      //console.log(list[i]);
      var data = fs.readFileSync(srcpath + list[i]);
      var contentid = list[i].split('.')[0];
      if (typeof global['content'] === 'undefined') global['content'] = {};
      global['content'][contentid] = data.toString();
      //      global[list[i].split('.')[0]] = data.toString();


    }
  }
  //getFiles('./');
  //console.log(global.loadContent);

//function getFiles(srcpath) {
//  return fs.readdirSync(srcpath).filter(function (file) {
//    return fs.statSync(path.join(srcpath, file)).isFile();
//  });
//}
//
//console.log(getFiles("./"));
//console.log(global.mygloba

//router.get('/:contentid', function (req, res) {
//  //res.send("hello");
//  //console.log('got here');
//  //console.log(__dirname + '/../content/' + req.params.contentid + '.html');
//  //res.send(req.params.contentid.toString());
//
//  //  var fs = require('fs');
//  fs.readFile(__dirname + '/../content/' + req.params.contentid + '.html', function (err, data) {
//    //  if (err) {
//    //    throw err;
//    //  }
//    if (typeof data == 'undefined') {
//      data = "new content";
//    }
//
//    //console.log(data.toString());
//    res.send(data.toString());
//  });
//});
