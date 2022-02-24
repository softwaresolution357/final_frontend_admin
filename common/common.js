const path = require('path');
const nodemailer = require('nodemailer');
const Handlebars = require('handlebars');
const fs = require('fs');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const insecureHandlebars = allowInsecurePrototypeAccess(Handlebars);

Handlebars.registerHelper('inc', function (value) {
  return parseInt(value) + 1;
});
exports.invoiceID = (count) => {
  const year = new Date();
  const month = year.getMonth() + 1;
  const day = year.getDate();
  return (
    year.getFullYear() + '/' + month + '/' + day + '/' + '000' + parseInt(count)
  );
};
exports.orderId = (count) => {
  return Date.now().toString() + parseInt(count);
};
exports.get_cookies = (request)=> {
    console.log(request)
  var cookies = {};
  request.headers && request.headers.authorization.split(';').forEach(function(cookie) {
    console.log(cookie)
    var parts = cookie.match(/(.*?)=(.*)$/)
    cookies[ parts[1].trim() ] = (parts[2] || '').trim();
  });
  return cookies;
};
exports.sendEmailTemplate = async (customer, oreder, transection, symbol) => {
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
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.PASSWORD,
    },
    debug: true,
  });

  readHTMLFile(
    path.join(
      __dirname + `../../controller/sales/template/email-order-success-two.html`
    ),
    function (err, html) {
      var template = Handlebars.compile(html);
      var data = {
        customer: customer,
        invoice: oreder,
        transection: transection,
      };
      var htmlToSend = template(data);
      var mailOptions = {
        from: `${process.env.EMAIL_ID}`,
        to: `${customer.email}`,
        subject: `transection_ref_${transection.refid}`,
        html: htmlToSend,
        // attachments: [
        //   {
        //     filename: `Invoice_${transection.refid}.pdf`,
        //     path: path.join(
        //       __dirname +
        //         `../../controller/sales/invoice/${transection.refid}.pdf`
        //     ),
        //   },
        // ],
      };
      transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
          callback(error);
        }
      });
    }
  );
};
exports.mailTester = async (req,res,next)=>{
  
}

exports.getCookies = (request)=> {
  console.log(request.headers.authorization)
  var cookies = {};
  request.headers && request.headers.authorization.split(';').forEach(function(cookie) {
    var parts = cookie.match(/(.*?)=(.*)$/)
    cookies[ parts[1].trim() ] = (parts[2] || '').trim();
  });
  return cookies;
};