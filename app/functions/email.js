var nodemailer = require('nodemailer');

module.exports = function (subject,text) {
  //var auth=require('../../data/gmail');
  var auth=require(global.site.gmailPath);
  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: auth
  });

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: auth.user, // sender address
      to: auth.user, // list of receivers
      subject: subject, // Subject line
      text: text.join('\n') // plaintext body
      //html: html // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
          return;
      }
      console.log('Message sent: ' + info.response);
  });
}
