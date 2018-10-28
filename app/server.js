var express = require('express');
var app = express();
var https = require('https');
var fs = require('fs');

// app.use('/js',express.static('static/js'));
// app.use('/css',express.static('static/css'));
// app.use('/images',express.static('static/images'));
app.use(express.static('static'));
app.use(require('./routes/paths')(__dirname));
app.use(require('./routes/swig')(app));
app.use(require('./routes/parsers')(app));
app.use(require('./routes/passport-session')(app));
app.use(require('./routes/images')(app,express,global.site.imagesPath));
app.use(require('./routes/email')(app));
app.get('/',function(req,res){res.render('home',{isAuthenticated:req.isAuthenticated(), content: global.content, user:require('./functions/getUser')(req)})});
app.use('/content',require("./routes/content"));

require("./functions/cacheFiles")(global.site.contentPath + "/");

https.createServer({
  key: fs.readFileSync(global.site.ssl.keyPath),
  cert: fs.readFileSync(global.site.ssl.certPath)
}, app).listen(3000);

// prd 3000 https and 8080 for http

var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
