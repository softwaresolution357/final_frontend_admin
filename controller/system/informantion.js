const information = require('../../models/system/information');
exports.postGeneralInformation = async (req, res, next) => {
  try {
    const data = await information.create(req.body);
    if (!data) {
      res.status(400).json({
        success: false,
        message: "data doesn't create",
      });
    }
    res.status(200).json({
      success: true,
    });
  } catch (e) {}
};
exports.getGeneralIngormation = async (req, res, next) => {
  try {
    const infomrmationdata = [];
    const data = await information.find();
    if (!data) {
      res.status(400).json({
        success: false,
        message: "data dosesn't found",
      });
    }
    for (const {
      id: id,
      storename: storename,
      bissnessname: bissnessname,
      email: email,
      mobile: mobile,
      storeaddress: storeaddress,
      pincode: pincode,
      state: state,
    } of data) {
      const data = {
        id: id,
        storename: storename,
        bissnessname: bissnessname,
        email: email,
        mobile: mobile,
        storeaddress: storeaddress,
        pincode: pincode,
        state: state,
      };
      infomrmationdata.push(data);
      res.status(200).json({
        success: true,
        data: infomrmationdata,
      });
    }
  } catch (e) {}
};
