const invNum = require('invoice-number');
var jsSHA = require('jssha');
const order = require('../../models/sales/order');
const { orderId } = require('../../common/common');
const payment = require('../../models/system/payment');
const register = require('../../models/user/customer');
const transectioncreate = require('../../models/sales/transection');
exports.payUmoney = async (req, res, next) => {
  const data = await payment.findOne({ method: 'PayUmoney' });
  const ref = await transectioncreate.findOne().sort({ _id: -1 });
  const ref_count_value =
    ref != null ? parseInt(ref.refid) + parseInt(1) : Date.now().toString();
  const countemail = await register.countDocuments({ email: req.body.email });
  const countmobile = await register.countDocuments({
    mobile: req.body.mobile,
  });
  try {
    console.log(req.body.usertype);
    if (req.body.usertype == 'guest') {
      if (countemail == 0 && countmobile == 0) {
        console.log(data);
        if (
          !req.body.amount ||
          !req.body.productinfo ||
          !req.body.firstname ||
          !req.body.email
        ) {
          res.send('Mandatory fields missing');
        } else {
          console.log(ref_count_value);
          const txnid = ref_count_value;
          var pd = req.body;
          var hashString =
            data.key + // Merchant Key
            '|' +
            txnid +
            '|' +
            pd.amount +
            '|' +
            pd.productinfo +
            '|' +
            pd.firstname +
            '|' +
            pd.email +
            '|' +
            '||||||||||' +
            data.salt; // Your salt value
          var sha = new jsSHA('SHA-512', 'TEXT');
          sha.update(hashString);
          var hash = sha.getHash('HEX');
          res.status(200).json({
            success: true,
            key: data.key,
            txnid: txnid,
            hash: hash,
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: 'email or mobile number already register',
        });
      }
    } else {
      console.log(data.key);
      const ordercount = await order.findOne().sort({ _id: -1 });
      const txnid = invNum.InvoiceNumber.next(
        ordercount != null ? ordercount.order : orderId(0)
      );
      var pd = req.body;
      var hashString =
        data.key + // Merchant Key
        '|' +
        txnid +
        '|' +
        pd.amount +
        '|' +
        pd.productinfo +
        '|' +
        pd.firstname +
        '|' +
        pd.email +
        '|' +
        '||||||||||' +
        data.salt; // Your salt value
      var sha = new jsSHA('SHA-512', 'TEXT');
      sha.update(hashString);
      var hash = sha.getHash('HEX');
      res.status(200).json({
        success: true,
        key: data.key,
        txnid: txnid,
        hash: hash,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
    });
  }
};
