var fs = require('fs');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

module.exports = router;

// module.exports = function (app) {
//
//   // var express = require('express');
//   //  var bodyParser = require('body-parser')
//   //  var jsonParser = bodyParser.json()
//   // var fs = require('fs');
//   // var router = express.Router();

// var bodyParser = require('body-parser');
// var jsonParser = bodyParser.json();

function isAuthenticated(req, res, next) {
  console.log("secure: ", req.secure)
  if (!req.secure) {
    res.sendStatus(401);
    return;
  }

  console.log("authenticated: ", req.isAuthenticated());
  console.log(req.session);
  if (req.isAuthenticated())
    return next();

  res.json({
    err: 'not authenticated'
  });
}

router.use(function timeLog(req, res, next) {
  console.log('content middleware: ', Date.now(), req.method, req.url);
  next();
});

//router.get('/', function (req, res) {
//  res.send('Hello World!');
//});

router.get('/:contentid', function(req, res) {
  //res.send("hello");
  //console.log('got here');
  //console.log(__dirname + '/../content/' + req.params.contentid + '.html');
  //res.send(req.params.contentid.toString());

  //  var fs = require('fs');
  fs.readFile(global.site.contentPath + '/' + req.params.contentid + '.html', function(err, data) {
    //  if (err) {
    //    throw err;
    //  }
    if (typeof data == 'undefined') {
      data = "new content";
    }

    //console.log(data.toString());
    res.send(data.toString());
  });
});

//  router.post('/', passport.authenticate('basic', {
//    session: true
//  }), function (req, res) {
router.post('/', isAuthenticated,
  function(req, res) {
    if (!req.body) return res.sendStatus(400)
    console.log(req.body.content_id);

    //console.log(req.body.content);
    global['content'][req.body.content_id] = req.body.content;
    fs.writeFile(global.site.contentPath + "/" + req.body.content_id + ".html", req.body.content, function(err) {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    });
    // create user in req.body
  });

// app.use('/content', router);

// }

module.exports = router;
