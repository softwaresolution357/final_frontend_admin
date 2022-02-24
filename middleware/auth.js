const jwt = require('jsonwebtoken');
const customer = require('../models/user/customer');
const admin = require('../models/users/admin')
const {getCookies} = require('../common/common')
exports.auth = (req, res, next) => {
  let token = req.headers['authorization'].split(' ')[1];
  if (token) {
    try {
      const decoder = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = decoder.admin;

      next();
    } catch (e) {
      return res.status(404).json({
        sucess: false,
      });
    }
  } else {
    res.status(401).json({
      sucess: false,
      message: " N't authorized to access this route",
    });
  }
};
exports.update = async (req, res, next) => {
  if (req.headers['x-auth-token']) {
    let token = req.headers['x-auth-token'].split(' ')[1];
    try {
      const decoder = jwt.verify(token, process.env.JWT_SECRET);

      const count = await customer.countDocuments({ _id: decoder.id });

      if (count == 1) {
        req.id = decoder.id;
        next();
      } else {
        res.status(400).json({
          sucess: false,
          message: "you are n't a authorised user",
        });
      }
    } catch (e) {
      return res.status(404).json({
        sucess: false,
      });
    }
  } else if (req.headers['authorization']) {
    let token = req.headers['authorization'].split(' ')[1];

    try {
      const decoder = jwt.verify(token, process.env.JWT_SECRET);

      const count = await customer.countDocuments({ _id: decoder.id });

      if (count == 1) {
        req.id = decoder.id;
        next();
      } else {
        res.status(400).json({
          sucess: false,
          message: "you are n't a authorised user",
        });
      }
    } catch (e) {
      return res.status(404).json({
        sucess: false,
      });
    }
  } else {
    res.status(401).json({
      sucess: false,
      message: " N't authorized to access this route",
    });
  }
};
exports.admin_auth = async(req,res,next)=>{
 console.log(req.headers['authorization'])
  let token = req.headers['authorization'].split(' ')[1];
  console.log(token)
    try {
      const decoder = jwt.verify(token, process.env.JWT_SECRET);
      const count = await admin.countDocuments({ _id: decoder.id });
     
      if (count == 1) {
        req.id = decoder.id;
        next();
      } else {
        res.status(400).json({
          sucess: false,
          message: "you are n't a authorised user",
        });
      }
    } catch (e) {
      return res.status(404).json({
        sucess: false,
      });
    }
 
}