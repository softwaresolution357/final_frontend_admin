const checksum_lib = require('../../middleware/paytm/checksum');
const payment = require('../../models/system/payment');
const transectioncreate = require('../../models/sales/transection');
const ordercustomer = require('../../models/user/ordercustomer');
const invoice = require('../../models/sales/invoice');
const orders = require('../../models/sales/order');
const { sendEmailTemplate } = require('../../common/common');
const statuscreate = require('../../models/sales/orderstatus');
const { productImage, productUrl } = require('../../common');

exports.paytmMethod = async (req, res, next) => {
  const data = await payment.findOne({ method: 'PaYtm' });

  const { email, mobile, amount, orderid, customerid } = req.query;
  console.log(req.query);
  const params = {};
  params.MID = data.id;
  params.WEBSITE = data.WEBSITE;
  params.ORDER_ID = orderid;
  params.CHANNEL_ID = data.CHANNEL_ID;
  params.INDUSTRY_TYPE_ID = data.INDUSTRY_TYPE_ID;
  params.CUST_ID = customerid;
  params.TXN_AMOUNT = amount;
  params.CALLBACK_URL =
    process.env.NODE_ENV == 'development'
      ? 'http://localhost:5000/api/v1/paytm'
      : 'http://api.mylitekart.com/api/v1/paytm';
  params.EMAIL = email;
  params.MOBILE_NO = mobile;
  checksum_lib.genchecksum(params, data.key, (err, checksum) => {
    const data = {
      ...params,
      CHECKSUMHASH: checksum,
    };
    res.json(data);
  });
};
exports.postPaymentMethod = async (req, res, next) => {
  const {
    TXNID,
    ORDERID,
    TXNDATE,
    PAYMENTMODE,
    GATEWAYNAME,
    BANKNAME,
    BANKTXNID,
    TXNAMOUNT,
    STATUS,
  } = req.body;

  const transection = await transectioncreate.findOneAndUpdate(
    { refid: ORDERID },
    {
      trxid: TXNID,
      orderid: ORDERID,
      trxdate: TXNDATE,
      paymentgatway: 'paytm',
      paymenmode: PAYMENTMODE,
      bankname: GATEWAYNAME,
      paymentype: BANKNAME,
      bankrefno: BANKTXNID,
      totaldebitamount: TXNAMOUNT,
      trxstatus: STATUS,
      paymentstatus: STATUS == 'TXN_SUCCESS' ? 'paid' : 'unpaid',
    },
    {
      new: true,
    }
  );
  const transection_data = await transectioncreate.findOne({
    _id: transection._id,
  });
  const customer = await ordercustomer.findOne({
    transection: transection._id,
  });
  const invoice = await orders.find({ customerid: customer._id }).populate({
    path: 'productid',
    model: 'products',
    select: 'name photo slug',
  });

  res.render('homepage', {
    customer: customer,
    invoice: invoice,
    transection: transection_data,
    productImage: productImage,
  });
};
