const transection = require('../../../models/sales/transection');
const currency = require('../../../models/system/currency');
exports.getTransection = async (req, res, next) => {
  try {
    const currencydata = await currency
    .findOne({ status: true })
    .select('symbol');
    if (req.query.type === 'dashboard') {
      const data = await transection
        .find()
        .sort({ _id: -1 })
        .limit(5)
        .select('-__v');
      res.status(200).json({
        success: true,
        data: data,
        symbol: currencydata !== null ?currencydata.symbol:''
      });
    } else {
      const data = await transection.find().sort({ _id: -1 }).select('-__v');

      res.status(200).json({
        success: true,
        data: data,
        symbol: currencydata !== null ?currencydata.symbol:''
      });
    }
  } catch (err) {
    res.status(200).json({
      success: false,
    });
  }
};
exports.postTransection = () => {};
