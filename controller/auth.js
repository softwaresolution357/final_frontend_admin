const user = require('../models/user/customer');
exports.mobileNumber = async (req, res, next) => {
  if (req.query.mobile.match(/^[0-9]*$/)) {
    const count = await user.countDocuments({ mobile: req.query.mobile });

    if (count == 1) {
      res.status(400).json({
        success: false,
        message: 'Mobile Number Already Register',
      });
    } else {
      res.status(200).json({
        success: true,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'This is not valid mobile number',
    });
  }
};
exports.registerEmail = async (req, res, next) => {
  const count = await user.countDocuments({ email: req.query.email });

  if (count == 1) {
    res.status(400).json({
      success: false,
      message: 'E-Mail id Already Register',
    });
  } else {
    res.status(200).json({
      success: true,
    });
  }
};
