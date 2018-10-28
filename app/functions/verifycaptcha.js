var https = require('https');
var secret = "blah blah";

function verifyRecaptcha(res, key, callback) {
        https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + secret + "&response=" + key, function(res) {
                var data = "";
                res.on('data', function (chunk) {
                        data += chunk.toString();
                });
                res.on('end', function() {
                        try {
                                var parsedData = JSON.parse(data);
                                console.log(parsedData);
                                callback(parsedData.success);
                        } catch (e) {
                                callback(false);
                        }
                });
        });
}
