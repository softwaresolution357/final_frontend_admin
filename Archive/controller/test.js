const sgMail = require('@sendgrid/mail')
const nodemailer = require('nodemailer');
const fs = require('fs');
const Handlebars = require('handlebars');
const path = require('path')
exports.sendgridTester = async(req,res,next)=>{
console.log(process.env.SENDGRID_API_KEY)
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: 'softwaresolution357@gmail.com', // Change to your recipient
        from: 'sunilla1990@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      }
      
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
          res.status(200).json({
              success:true
          })
        })
        .catch((error) => {
            console.log(error)
            res.status(200).json({
                success:false
            })
        })
}

 exports.GmailTester=async(req,res,next)=>{
   console.log('hello')
  const i = 0;
  var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
      if (err) {
        throw err;
        callback(err);
      } else {
        callback(null, html);
      }
    });
  };
 
 
  var transporter = nodemailer.createTransport({
    service: "Gmail",
     auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.PASSWORD,
    },
    debug: true,
  });

  readHTMLFile(
    path.join(
      __dirname + `/template.html`
    ),
    function (err, html) {
      var template = Handlebars.compile(html);
      var data = {
       
      };
      var htmlToSend = template(data);
      var mailOptions = {
        from: `${process.env.EMAIL_ID}`,
        to: `sunilla1990@gmail.com`,
        subject: `test email`,
        html: htmlToSend,
        attachments: [
          {
            
            path: path.join(
              __dirname +
                `/attachment.pdf`
            ),
          },
        ],
      };
      transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
          callback(error);
        }
        res.status(202).json({
          success:true
        })
      });
    }
  );
 }

 exports.dynamicRouting = async(req,res,next)=>{
  const routerpath =[{path:'login',component: 'Login'}]
  res.status(200).json({
    success:true,
    path:routerpath
  })
 }