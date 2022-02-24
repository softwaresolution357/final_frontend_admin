const payment = require('../../models/system/payment');
exports.paymentPost = async (req, res, next) => {
  try {
    const data = await payment.create(req.body);
    if (!data) {
      res.status(400).json({
        success: false,
        message: "data doesn't create",
      });
    }
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      message: '',
    });
  }
};
exports.paymentGet = async (req, res, next) => {
  try {
    const COD = await payment.findOne({ method: `COD` });
    const PaYtm = await payment.findOne({ method: 'PaYtm' });
    const PayUmoney = await payment.findOne({ method: 'PayUmoney' });
    const Razorpay = await payment.findOne({ method: 'Razorpay' });

    res.status(200).json({
      success: true,
      COD: COD,
      PaYtm: PaYtm,
      PayUmoney: PayUmoney,
      Razorpay: Razorpay,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'no data found',
    });
  }
};
exports.getSinglePaymentMethod = async (req, res, next) => {
  try {
    const singlepayment = await payment.findOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      singlepayment: singlepayment,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'no data found',
    });
  }
};
exports.putSinglePaymentMethod = async (req, res, next) => {
  try {
    console.log(req.body);
    const singlepayment = await payment.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );

    res.status(200).json({
      success: true,
      singlepayment: singlepayment,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'no data found',
    });
  }
};
