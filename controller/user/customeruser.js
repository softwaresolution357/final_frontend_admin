const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcryptjs = require('bcryptjs');
const register = require('../../models/user/customer');
const address = require('../../models/user/address');
const ordercustomer = require('../../models/user/ordercustomer');
const cart = require('../../models/marketing/cart');
const categorymodel = require('../../models/catlog/category');
const home = require('../../models/cms/home');
exports.registerUser = async (req, res, next) => {
  try {
    const mobbilecount = await register.countDocuments({
      mobile: req.body.mobile,
    });
    const emailValue = await register.countDocuments({ email: req.body.email });

    if (mobbilecount == 0 && emailValue == 0) {
      const data = await register.create(req.body);
      if (!data) {
        res.status(404).json({
          success: false,
          message: "user n't created ",
        });
      }
      const JsonWebToken = jwt.sign({ id: data._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      sendTokenResponse(JsonWebToken, 202, res, data);
    } else if (mobbilecount != 0) {
      res.status(400).json({
        success: false,
        message: 'mobile number already register',
      });
    } else if (emailValue != 0) {
      res.status(400).json({
        success: false,
        message: 'email id already register',
      });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map((val) => val.message);
      res.status(400).json({
        success: false,
        message: `validation is failed ${message}`,
      });
    }
  }
};
exports.login = async (req, res, next) => {
  const { name, password } = req.body;

  const value = name.split('@');
  const fainal_cart = [];
  if (value.length == 1) {
    const data = await register.findOne({ mobile: name }).select(' +password');

    if (data == null) {
      res.status(400).json({
        success: false,
        message: 'Mobile Number is not registered',
      });
    } else {
      const validation = await data.passwordVlidationCheck(password);
      if (validation) {
        const JsonWebToken = jwt.sign(
          { id: data._id },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRE,
          }
        );

        sendTokenResponse(JsonWebToken, 202, res, data);
      } else {
        res.status(400).json({
          success: false,
          message: 'Sorry,Password Does not matching',
        });
      }
    }
  } else if (value.length == 2) {
    let address_id = '';
    const data = await register.findOne({ email: name }).select(' +password');
    const address_data = await address.findOne({ status: true });

    if (address_data !== null) {
      address_id = address_data._id;
    }
    if (data == null) {
      res.status(400).json({
        success: false,
        message: 'Email ID is not registered',
      });
    } else {
      const validation = await data.passwordVlidationCheck(password);
      if (validation) {
        const JsonWebToken = jwt.sign(
          { id: data._id },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRE }
        );

        sendTokenResponse(JsonWebToken, 202, res, data);
      } else {
        res.status(400).json({
          success: false,
          message: "password doesn't valid, Please enter valid Password",
        });
      }
    }
  } else {
    res.status(400).json({
      success: false,
      message: "password doesn't valid, Please enter valid Password",
    });
  }
};

exports.updateAddress = async (req, res, next) => {
  try {
    const create = await address.create(req.body);
    await register.updateOne(
      { _id: req.id },
      { $push: { address: create._id } }
    );
    const data = await register
      .findOne({ _id: req.id })
      .populate({ path: 'address', model: 'address' })
      .populate({ path: 'wishlist', model: 'products' })
      .populate({ path: 'cartlist', modle: 'cartlist' })
      .populate({ path: 'order', model: 'order' });

    res.status(202).json({
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      sucess: false,
      message: 'no data found',
    });
  }
};
exports.changepassword = async (req, res, next) => {
  const { oldpassword, confirmpassword } = req.body;
  if (oldpassword !== confirmpassword) {
    const data = {};
    const chnagedata = await register
      .findOne({ _id: req.id })
      .select('+password');

    const validation = await chnagedata.passwordVlidationCheck(oldpassword);
    if (validation) {
      const salt = await bcryptjs.genSalt(10);
      const newpassword = await bcryptjs.hash(confirmpassword, salt);
      data.password = newpassword;

      await register.findOneAndUpdate(
        req.id,
        data,
        { new: true },
        (err, doc) => {
          if (err) {
            req.status(400).json({
              success: false,
              message: "password doesn't update",
            });
          }

          res.status(202).json({
            success: true,
            message: 'password update successfully',
          });
        }
      );
    } else {
      res.status(400).json({
        success: false,
        message: "password doesn't update",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "old password and new password doesn't same",
    });
  }
};
exports.wishlistCustomer = async (req, res, next) => {
  const updatedata = await register.findByIdAndUpdate(req.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedata) {
    res.status(400).json({
      success: false,
      message: "data does't updated",
    });
  }
};
exports.addCartCustomer = async (req, res, next) => {
  const updatedata = await register.findByIdAndUpdate(req.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedata) {
    res.status(400).json({
      success: false,
      message: "data does't updated",
    });
  }
};
exports.editaddress = async (req, res, next) => {
  const { billing, shipping } = req.body;
  const data = {};
  data.billing = billing;
  data.shipping = shipping;
  await address.findOneAndUpdate(req.id, data, (err, doc) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "address doesn't updated",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        billig: doc.billig,
        shipping: doc.shipping,
      },
    });
  });
};

exports.ForgotPassword = async (req, res, next) => {
  const salt = await bcryptjs.genSalt(10);
  const newpassword = await bcryptjs.hash(req.body.password, salt);
  if (new Date().toISOString().slice(0, 10) == req.body.date) {
    register.findByIdAndUpdate(
      { _id: req.id },
      { password: newpassword },
      (err, data) => {
        if (err) {
          res.status(400).json({
            success: false,
            message: "Password Doesn't Update",
          });
        }
        res.status(200).json({
          success: true,
          message: 'Password Update Successfully',
        });
      }
    );
  } else {
    res.status(400).json({
      success: false,
      message: "You can't update password,Password Cookies Expire",
    });
  }
};

exports.ResetYourPassword = async (req, res, nex) => {
  const { name } = req.body;
  console.log('error ')
try{
  if (name.split('@').length == 1) {
    const data = await register.findOne({ mobile: name });
    console.log(data == null)
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
        hrefurl = `${process.env.development_url}/resetpassword/${JsonWebToken}/${new Date()
          .toISOString()
          .slice(0, 10)}`;
      } else {
        hrefurl = `${process.env.production_url}/resetpassword/${JsonWebToken}/${new Date()
          .toISOString()
          .slice(0, 10)}`;
      }

      var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
         user: process.env.GMAIL_ADDRESS,
         pass: process.env.PASSWORD,
       },
       debug: true,
      });

      const mailOptions = {
        from: `MyLitekart <${process.env.EMAIL_ID}>`, // sender address
        to: data.email, // list of receivers
        subject: 'Password Reset', // Subject line
        html: `hi, ${
          data.name
        } </br>for reset your password, Pleaase click below link <a href=${hrefurl} ><span>link</span></a>.<br>This is a <b>test</b> email on ${new Date().toISOString()}`, // plain text body
      };
      await transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err)
        }
        console.log(info)
      });
      res.status(200).json({
        success: true,
      });
    }
   
  } else if (name.split('@').length == 2) {
    const data = await register.findOne({ email: name });
    if (data == null) {
      res.status(400).json({
        success: false,
        message: "this is n't register email id",
      });
    } else {
      const JsonWebToken = jwt.sign({ id: data._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      let hrefurl = '';
      if (process.env.NODE_ENV == 'development') {
        hrefurl = `${process.env.developement_url}/resetpassword/${JsonWebToken}/${new Date()
          .toISOString()
          .slice(0, 10)}`;
      } else {
        hrefurl = `${process.env.production_url}/resetpassword/${JsonWebToken}/${new Date()
          .toISOString()
          .slice(0, 10)}`;
      }
      var transporter = nodemailer.createTransport({
        service: "Gmail",
     auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.PASSWORD,
    },
    debug: true,
      });

      const mailOptions = {
        from: 'softwaresolution357@gmail.com', // sender address
        to: data.email, // list of receivers
        subject: 'Password Reset', // Subject line
        html: `hi, ${
          data.name
        } </br>for reset your password, Pleaase click below link <a href=${hrefurl} ><span>link</span></a>.<br>This is a <b>test</b> email. on${new Date().toISOString()}`, // plain text body
      };
      await transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
        }
      });
      res.status(200).json({
        success: true,
      });
    }
   
  }
 
}catch(err){
  console.log(err)
  res.status(400).json({
    success:true
  })
}
  
};
exports.adminregisterUser = async (req, res, next) => {
  const admindata = [];
  const registerdata = await register.find();
  if (!registerdata) {
    res.status(400).json({
      success: false,
      message: 'No record found',
    });
  }
  for (const {
    id: id,
    name: name,
    email: email,
    mobile: mobile,
  } of registerdata) {
    const data = {
      id: id,
      name: name,
      email: email,
      mobile: mobile,
    };
    admindata.push(data);
  }
  res.status(200).json({
    success: true,
    data: admindata,
  });
};

exports.adminguestUser = async (req, res, next) => {
  const admindata = [];
  const userdata = await ordercustomer.find({ usertype: 'guest' });
  if (!userdata) {
    res.status(400).json({
      success: false,
      message: 'No record found',
    });
  }
  for (const { id: id, name: name, email: email, mobile: mobile } of userdata) {
    const data = {
      id: id,
      name: name,
      email: email,
      mobile: mobile,
    };
    admindata.push(data);
  }
  res.status(200).json({
    success: true,
    data: admindata,
  });
};
exports.updateProfile = async (req, res, next) => {
  try {
    const data = await register.findOneAndUpdate(req.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        billing: data.billing,
        shipping: data.shipping,
        newsletter: data.newsletter,
        address_id: data._id,
      },
    });
  } catch (err) {
    res.status(200).json({
      success: false,
    });
  }
};
exports.updateNewsletter = async (req, res, next) => {
  try {
    const data = await register.findByIdAndUpdate(
      { _id: req.id },
      { newsletter: req.body.status },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      data: {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        billing: data.billing,
        shipping: data.shipping,
        newsletter: data.newsletter,
        address_id: data._id,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: true,
      message: 'news letter add successfully',
    });
  }
};
exports.updateWishList = async (req, res, next) => {
  try {
    const count = await register
      .find({ wishlist: { $in: [req.body.product] } })
      .countDocuments();

    if (count == 0) {
      await register.findOneAndUpdate(
        { _id: req.id },
        { $push: { wishlist: req.body.product } }
      );

      res.status(201).json({
        success: true,
        message: 'your Item added wish list successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Item doesn't add to wish list",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Item doesn't add to wish list",
    });
  }
};
exports.updateCartList = async (req, res, next) => {
  try {
    const count = await cart.countDocuments({ product: req.body.product });

    if (count == 0) {
      const data = {};
      data.product = req.body.product;
      data.qty = req.body.qty;
      data.sum = req.body.sum;
      data.customerid = req.id;
      await cart.create(data);
      res.status(201).json({
        success: true,
        message: 'your Item added wish list successfully',
      });
    } else if (count == 1) {
      const cartupdate = await cart.findOne({ product: req.body.product });

      const data = {};
      data.qty = parseInt(cartupdate.qty) + parseInt(req.body.qty);
      data.sum = parseInt(cartupdate.sum) + parseInt(req.body.sum);

      await cart.findOneAndUpdate({ product: req.body.product }, data);

      res.status(201).json({
        success: true,
        message: 'your Item added wish list successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Item doesn't add to wish list",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Item doesn't add to wish list",
    });
  }
};
exports.updatecartremovewishlist = async (req, res, next) => {
  try {
    await register.updateOne(
      { _id: req.id },
      { $pullAll: { wishlist: [req.body.product] } }
    );

    await cart.countDocuments();
    if (count == 0) {
      await register.findOneAndUpdate(
        { _id: req.id },
        { $push: { cartlist: req.body.product } }
      );

      res.status(201).json({
        success: true,
        message: 'your Item added wish list successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Item doesn't add to wish list",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Item doesn't add to wish list",
    });
  }
};
exports.removeCartItem = async (req, res, next) => {
  try {
    await cart.findOneAndDelete({ product: req.body.product });
    res.status(200).json({
      success: true,
      message: 'item is removed',
    });
  } catch (err) {
    res.status(400).json({
      statsu: 400,
      message: err.message,
    });
  }
};
exports.removeWishListItem = async (req, res, next) => {
  try {
    const count = await register
      .find({ wishlist: { $in: [req.body.product] } })
      .countDocuments();
    if (count == 1) {
      await register.updateOne(
        { _id: req.id },
        { $pullAll: { wishlist: [req.body.product] } }
      );
      res.status(200).json({
        statsu: 400,
        message: 'Item removed from wishlist',
      });
    } else {
      res.statsu(400).json({
        statsu: 400,
        message: "Item doesn't  removed from wishlist",
      });
    }
  } catch (err) {
    res.status(400).json({
      statsu: 400,
      message: err.message,
    });
  }
};
exports.updateAddressStatus = async (req, res, next) => {
  
  try {
    if (req.body.status == true) {
    

     
        
        const address_data = await address.findByIdAndUpdate(
          { _id: req.body._id },
          { status: req.body.status }
        );
        const register_data = await register.findByIdAndUpdate(
          { _id: req.id },
          {
            billing: address_data.billing,
            shipping: address_data.shipping,
            addressid: address_data._id,
          }
        );
        res.status(200).json({
          success: true,
          data: {
            _id: register_data._id,
            name: register_data.name,
            email: register_data.email,
            mobile: register_data.mobile,
            billing: address_data.billing,
            shipping: address_data.shipping,
            newsletter: register_data.newsletter,
            address_id: address_data._id,
          },
        });
     
    } else {
      await address.findByIdAndUpdate(
        { _id: req.body._id },
        { status: req.body.status }
      );
      const register_data = await register.findByIdAndUpdate(
        { _id: req.id },
        {
          billing: '',
          shipping: '',
        }
      );
      res.status(200).json({
        success: true,
        data: {
          _id: register_data._id,
          name: register_data.name,
          email: register_data.email,
          mobile: register_data.mobile,
          billing: '',
          shipping: '',
          newsletter: register_data.newsletter,
          address_id: '',
        },
      });
    }
  } catch (err) {
    console.log(err)
    res.status(202).json({
      success: false,
      message: "you can't update status",
    });
  }
};
exports.editingbillingshipping = async (req, res, next) => {
  try {
    const customer = await register.findOne({ _id: req.id });

    if (req.body.type == 'address') {
      const address_data = await address.findOneAndUpdate(
        { _id: req.params.id },
        { billing: req.body.billing, shipping: req.body.shipping },
        {
          new: true,
          runValidators: true,
        }
      );
      if (customer.addressid == req.params.id) {
        await register.findOneAndUpdate(
          { _id: req.id },
          {
            addressid: address_data._id,
            billing: req.body.billing,
            shipping: req.body.shipping,
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
    } else if (req.body.type == 'billing') {
      const address_data = await address.findOneAndUpdate(
        { _id: req.params.id },
        { billing: req.body.billing },
        {
          new: true,
          runValidators: true,
        }
      );
      if (customer.addressid == req.params.id) {
        await register.findOneAndUpdate(
          { _id: req.id },
          {
            addressid: address_data._id,
            billing: req.body.billing,
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
    } else if (req.body.type == 'shipping') {
      const address_data = await address.findOneAndUpdate(
        { _id: req.params.id },
        { shipping: req.body.shipping },
        {
          new: true,
          runValidators: true,
        }
      );
      if (customer.addressid == req.params.id) {
        await register.findOneAndUpdate(
          { _id: req.id },
          {
            addressid: address_data._id,
            shipping: req.body.shipping,
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
    }

    const data = await register
      .findOne({ _id: req.id })
      .populate({ path: 'address', model: 'address' })
      .populate({ path: 'wishlist', model: 'products' })
      .populate({ path: 'cartlist', modle: 'cartlist' })
      .populate({ path: 'order', model: 'order' });
    res.status(202).json({
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
exports.AddAddress = async (req, res, next) => {
  
  const { billing, shipping } = req.body;
  const addressdata = await address.create({
    addressid: req.id,
    billing: billing,
    shipping: shipping,
  });
  await register.findByIdAndUpdate(
    { _id: req.id },
    { $push: { address: addressdata._id } }
  );
  res.status(200).json({
    success: true,
  });
};
exports.EditAddress = async (req, res, next) => {
  const addressdata = await address.findOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    address: addressdata,
  });
};
exports.editCustomerAddress = async (req, res, next) => {
  if (req.body.url === 'editaddress') {
    await address.findByIdAndUpdate(
      { _id: req.params.id },
      {
        billing: req.body.billing,
        shipping: req.body.shipping,
      },
      (err, data) => {
        if (err) {
          res.status(400).json({
            success: false,
          });
        }
        res.status(202).json({
          success: true,
        });
      }
    );
  } else if (req.body.url === 'editbillingaddress') {
    const billing_address = await address.findByIdAndUpdate(
      { _id: req.params.id },
      { billing: req.body.billing },
      {
        new: true,
      }
    );
    const register_data = await register.findByIdAndUpdate(
      { _id: req.id },
      {
        billing: req.body.billing,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      data: {
        _id: register_data._id,
        name: register_data.name,
        email: register_data.email,
        mobile: register_data.mobile,
        billing: register_data.billing,
        shipping: register_data.shipping,
        newsletter: register_data.newsletter,
        address_id: billing_address._id,
      },
    });
  } else {
    const register_data = await register.findByIdAndUpdate(
      { _id: req.id },
      {
        shipping: req.body.shipping,
      },
      {
        new: true,
      }
    );
  
    const billing_address = await address.findByIdAndUpdate(
      { _id: req.params.id },
      {
        shipping: req.body.shipping,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      data: {
        _id: register_data._id,
        name: register_data.name,
        email: register_data.email,
        mobile: register_data.mobile,
        billing: register_data.billing,
        shipping: register_data.shipping,
        newsletter: register_data.newsletter,
        address_id: billing_address._id,
      },
    });
  }
};

const sendTokenResponse = (JsonWebToken, statusCode, res, data, address_id) => {
  res.status(statusCode).json({
    success: true,
    data: {
      _id: data._id,
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      billing: data.billing,
      shipping: data.shipping,
      newsletter: data.newsletter,
      address_id: data.addressid,
    },

    token: JsonWebToken,
  });
};
