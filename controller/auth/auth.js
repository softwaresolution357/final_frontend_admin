const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const media_gallery = require('../../models/extra/gallery')
const adminuser = require('../../models/users/admin');
const bcryptjs = require('bcryptjs');

exports.admin = async (req, res, next) => {
 
  const {userid,password } = req.body;
 
      const data = await adminuser.findOne({ user: userid}).select(' +password');
  
      if (data == null) {
        res.status(400).json({
          success: false,
          message: 'User id  not registered',
        });
      }else{
        const JsonWebToken = jwt.sign(
          { id: data._id },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRE }
        );
        const validation = await data.passwordVlidationCheck(password);
      console.log(validation)
      if(validation){
        sendTokenResponse(JsonWebToken, 202, res, data);
      }else{
        res.status(400).json({
          success: false,
          message: `Password is Wrong`,
        });
      }
        
      }
         
        
      }
   
  


// creat cookies amd send response
const sendTokenResponse = (JsonWebToken,statusCode, res, role) => {
  res.status(statusCode).json({
    success: true,
    role: role,
    token:JsonWebToken,
  });
};

exports.register = async (req, res, next) => {
  try {
    const count = await adminuser.countDocuments({email:req.body.email,user:req.body.user,mobile:req.body.mobile})
    console.log(count)
    if(count === 0){
      const adminusers = await adminuser.create({
        name:req.body.name,
        mobile:req.body.mobile,
        user:req.body.user,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role,
        path:JSON.parse(req.body.path)
      });
    if (!adminusers) {
      res.status(400).json({
        success: false,
        message: "User n't created",
      });
    }
    res.status(200).json({
      success: true,
    }); 
    }else{
      res.status(400).json({
        success: false,
        message:"User Name and Mobile Number and Email Id already used"
      }); 
    }
   
  } catch (err) {
    console.log(err)
    if (err.code === 11000) {
      res.status(400).json({
        success: false,
        name: `This ${req.body.name} name is already used`,
      });
    }
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map((val) => val.message);
      res.status(400).json({
        success: false,
        name: `validation is failed ${message}`,
      });
    }
  }
};
exports.SuperUser = async(req,res,next)=>{
  try{
    const count = await adminuser.countDocuments({role:'super user'});
    const header_logo = await media_gallery.countDocuments({name:'header_logo.png'}) 
    res.status(200).json({
      success:true,
      count:count,
      logo_count:header_logo,
    })
  }catch(err){
    res.status(400).json({
      success:false,
    })
  }
 
}

exports.UserList =async (req,res,next)=>{
  try{
    const data = await adminuser.find();
    res.status(200).json({
      success:true,
      data:data
    })
  }catch(err){
    res.status(400).json({
      success:false,
     
    })
  }
 
}

exports.SingleData = async(req,res,next)=>{
  console.log(req.params.id)
  try{
    const data = await adminuser.findById({_id:req.params.id});
    res.status(200).json({
      success:true,
      data:data
    })
  }catch(err){
    res.status(400).json({
      success:false,
     
    })
}
}
exports.ForgotPassword = async(req,res,next)=>{
  const count = await adminuser.countDocuments({user:req.body.userid});
  if(count === 1){
    const data = await adminuser.findOne({user:req.body.userid});
   
    if (data == null) {
      res.status(400).json({
        success: false,
        message: "this is n't register mobile number",
      });
    } else {
      const JsonWebToken = jwt.sign({ id: data._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      let hrefurl = '';
      if (process.env.NODE_ENV == 'development') {
        hrefurl = `${process.env.admin_development_url}/updatepassword/?token=${JsonWebToken}&date=${new Date()
          .toISOString()
          .slice(0, 10)}`;
      } else {
        hrefurl = `${process.env.admin_production_url}/updatepassword/?token=${JsonWebToken}&date=${new Date()
          .toISOString()
          .slice(0, 10)}`;
      }

      var transporter = nodemailer.createTransport({
        service:process.env.SERVICE,
        auth: {
         user: process.env.GMAIL_ADDRESS,
         pass: process.env.PASSWORD,
       },
       debug: true,
      });

      const mailOptions = {
        from: `${process.env.mail_dispaly_name} <${process.env.EMAIL_ID}>`, // sender address
        to: data.email, // list of receivers
        subject: 'Password Reset', // Subject line
        html: `hi, ${
          data.name
        } </br>for reset your password, Please click below <a href=${hrefurl} ><span>link</span></a>.<br>This is a <b>test</b> email on ${new Date().toISOString()}`, // plain text body
      };
      await transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err)
          res.status(400).json({
            success: false,
            message: "email doesn't send, Please after sometime"
          });
        }
        res.status(200).json({
          success: true,
          message: `Password Reset Link, Send to register Email Id is ${data.email}`
        });
      });
     
    }
  }else{
    res.status(400).json({
      success: false,
      message:"User Id n't register"
    });
  }
}

exports.UpdatePassword = async(req,res,next)=>{
  const {date,password} =req.body

  if(new Date().toISOString().split('T')[0] == date){
    const salt = await bcryptjs.genSalt(10);
    const newpassword = await bcryptjs.hash(password, salt);
    await adminuser.findByIdAndUpdate({_id:req.id},{password:newpassword},(err,data)=>{
      if(err){
        res.status(400).json({
          success:false,
          message:"error update password"
        })
      }
      res.status(200).json({
        success:true,
      
      })
    })
  }else{
    res.status(400).json({
      success:false,
      message: "your toker is expire" 
    })
  }
}

exports.SingleUpdateUser = async(req,res,next)=>{
   await adminuser.findByIdAndUpdate({
    _id:req.params.id
  },{
    name:req.body.name,
    mobile:req.body.mobile,
    user:req.body.user,
    email:req.body.email,
    
    role:req.body.role,
    path:JSON.parse(req.body.path)
  },(err,data)=>{
    if(err){
      rea.status(400).json({
        success:false
      })
    }
    res.status(200).json({
      success:true
    })
  })
}
exports.AdminMobile = async(req,res,next)=>{

try{
  console.log(req.query.email)


  
  const adminemail = await adminuser.findOne({mobile:req.query.mobile})
  res.status(200).json({
    success:true,
    message:`Register user id is ${adminemail.user}`
  })
}catch(err){
  res.status(400).json({
    success:false,
    message:"Mobile Number n't Register,Please Contact To Admin"
  })
}
}
exports.AdminEmail = async(req,res,next)=>{
  try{
    const adminemail = await adminuser.findOne({email:req.query.email})
    res.status(200).json({
      success:true,
      message:`Register user id is ${adminemail.user}`
    })
  }catch(err){
    res.status(400).json({
      success:false,
      message:"Email Id n't Register,Please Contact To Admin"
    })
  }
   

}
exports.ChangePassword = async(req,res,next)=>{
  const {password} =req.body
  console.log(req.id)
  
    const salt = await bcryptjs.genSalt(10);
    const newpassword = await bcryptjs.hash(password, salt);
    await adminuser.findByIdAndUpdate({_id:req.id},{password:newpassword},(err,data)=>{
      if(err){
        console.log(err)
        res.status(400).json({
          success:false,
          message:"error update password"
        })
      }
      res.status(200).json({
        success:true,
      
      })
    })
 
}
exports.EditProfile = async(req,res,next)=>{
  const {name,email,mobile,dob,linkedin,twitter,facebook,image} = req.body;
  await adminuser.findByIdAndUpdate({_id:req.id},req.body,{
    new:true
  },(err,data)=>{
    console.log(data)
    if(err){
      console.log(err)
      res.status(400).json({
        success:false,
        message:"error update password"
      })
    }
  
    res.status(200).json({
      success:true,
      data:data,
    
    })
  })
}