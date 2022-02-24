const mongodb = require('mongodb');
const general = require('../../models/system/general');

exports.postgeneralInfomation = async (req, res, next) => {
  const count = await general.countDocuments();
  if (count == 0) {
    const data = await general.create(req.body);
    if (!data) {
      res.status(404).json({
        success: false,
        message: 'Due to some error',
      });
    }
    res.status(202).json({
      success: true,
      data: data,
    });
  } else {
    res.status(202).json({
      success: false,
      message: "you cann't create more then one document",
    });
  }
};
exports.viewgeneralInfomation = async (req, res, next) => {
  const data = {};
  const count = await general.countDocuments();
  if (count == 1) {
    const generaldata = await general.findOne();
    if (!generaldata) {
      res.status(400).json({
        success: false,
        message: " n't data found",
      });
    }
    data.id = generaldata.id;
    data.storename = generaldata.storename;
    data.bissnesstorename = generaldata.bissnesstorename;
    data.description = generaldata.description;
    data.address = generaldata.address;
    data.email = generaldata.email;
    data.supportemail = generaldata.supportemail;
    data.customeremail = generaldata.customeremail;
    data.mobile = generaldata.mobile;
    data.supportemobile = generaldata.supportemobile;
    data.customeremobile = generaldata.customeremobile;
    data.state = generaldata.state;
    data.city = generaldata.city;
    data.country = generaldata.country;
    data.pincode = generaldata.pincode;
    data.GST = generaldata.GST;
    data.facebook = generaldata.facebook;
    data.twitter = generaldata.twitter;
    data.instagram = generaldata.instagram;
    data.linked = generaldata.linked;
    data.firstshipping = generaldata.firstshipping;
    data.freeshipping = generaldata.freeshipping;
    res.status(202).json({
      success: true,
      data: data,
    });
  } else {
    res.status(400).json({
      success: false,
      data: [],
    });
  }
};
exports.updategeneral = async (req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);
  const data = {};
  try {
    const generaldata = await general.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );

    data.id = generaldata.id;
    data.storename = generaldata.storename;
    data.bissnesstorename = generaldata.bissnesstorename;
    data.description = generaldata.description;
    data.address = generaldata.address;
    data.email = generaldata.email;
    data.supportemail = generaldata.supportemail;
    data.customeremail = generaldata.customeremail;
    data.mobile = generaldata.mobile;
    data.supportemobile = generaldata.supportemobile;
    data.customeremobile = generaldata.customeremobile;
    data.state = generaldata.state;
    data.city = generaldata.city;
    data.country = generaldata.country;
    data.pincode = generaldata.pincode;
    data.GST = generaldata.GST;
    data.facebook = generaldata.facebook;
    data.twitter = generaldata.twitter;
    data.instagram = generaldata.instagram;
    data.linked = generaldata.linked;
    res.status(202).json({
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: [],
    });
  }
};
exports.firstShippingStatus = async (req, res, next) => {
  const { status } = req.body;
  if (mongodb.ObjectID.isValid(req.params.id)) {
    const statusData = await general.findByIdAndUpdate(
      req.params.id,
      {
        firstshipping: status,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!statusData) {
      return new ErrorResponse("Category n't update successfully", 404);
    }
    res.status(200).json({
      success: true,
      message: 'Update data successfully',
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'no such id found',
    });
  }
};
exports.freeShippingStatus = async (req, res, next) => {
  const { status } = req.body;
  if (mongodb.ObjectID.isValid(req.params.id)) {
    const statusData = await general.findByIdAndUpdate(
      req.params.id,
      {
        freeshipping: status,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!statusData) {
      return new ErrorResponse("Category n't update successfully", 404);
    }
    res.status(200).json({
      success: true,
      message: 'Update data successfully',
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'no such id found',
    });
  }
};
