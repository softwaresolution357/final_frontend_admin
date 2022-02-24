const payment = require('../../models/system/payment');
const invNum = require('invoice-number');
const order = require('../../models/sales/order');
const { orderId } = require('../../common/common');
const Razorpay = require('razorpay');
const register = require('../../models/user/customer');
const transectioncreate = require('../../models/sales/transection');
exports.getRozorpay = async (req, res, next) => {
  const countemail = await register.countDocuments({ email: req.query.email });
  const countmobile = await register.countDocuments({
    mobile: req.query.mobile,
  });
  const ordercount = await order.findOne().sort({ _id: -1 });
  const ref = await transectioncreate.findOne().sort({ _id: -1 });
  const ref_count_value =
    ref != null ? parseInt(ref.refid) + parseInt(1) : Date.now().toString();
  if (req.query.usertype == 'guest') {
    if (countemail == 0 && countmobile == 0) {
      const data = await payment.findOne({ method: 'Razorpay' });
      res.status(200).json({
        key: data.key,
        order_id: ref_count_value,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'email or mobile number already register',
      });
    }
  } else {
    const data = await payment.findOne({ method: 'Razorpay' });
    res.status(200).json({
      key: data.key,
      order_id: ref_count_value,
    });
  }
};

exports.rozorpay = async (req, res) => {
  const data = await payment.findOne({ method: 'Razorpay' });
  const { payment_id } = req.params;
  const instance = new Razorpay({
    key_id: data.key,
    key_secret: data.salt,
  });
  const amount = Number(req.params.amount * 100);
  instance.payments
    .capture(payment_id, amount)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
    });
};
