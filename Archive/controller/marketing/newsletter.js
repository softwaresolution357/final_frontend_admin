const newsletter = require('../../models/marketing/subscription');
const Handlebars = require('handlebars');
const path = require('path');
const fs = require('fs')
const nodemailer = require('nodemailer');
exports.getNewsletter = async (req, res, next) => {
  try {
    const data = await newsletter.find().select("_id email");
    if (!data) {
      res.stastus(400).json({
        success: false,
        message: 'There is no data found',
      });
    }
   
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    
    res.status(400).json({
      success: false,
      message: 'There is no data found',
    });
  }
};
exports.postNewsletter = async (req, res, next) => {
  try {
    console.log(req.body)
    let photo = path.parse(req.files.file.name).ext;
    // const data = await newsletter.create(req.body);
    // if (!data) {
    //   res.status(400).json({
    //     success: false,
    //     message: 'There is no data found',
    //   });
    // }
    console.log(path.join(__dirname + 'template'+photo))
    req.files.file.mv(path.join(__dirname + 'template'+photo),function(err) {
      if(err){
        console.log(err);
      }else{
        sendTempate(JSON.parse(req.body.email),req.body.subject,photo,res)
 }
})

    res.status(200).json({
      success: true,
      
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      message: 'There is no data found',
    });
  }
};
sendTempate =async(email, sub,photo) => {
  console.log(email,sub)
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
    path.join(__dirname + 'template'+photo),
    function (err, html) {
      var template = Handlebars.compile(html);
    
      var htmlToSend = template();
      var mailOptions = {
        from: `${process.env.EMAIL_ID}`,
        to: email,
        subject: sub,
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
          // callback(error);
        }
        res.status(200).json({
          success: true,
          
        });
      });
    }
  );
};
