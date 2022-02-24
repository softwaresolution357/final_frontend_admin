const path = require('path');
const invoice = require('../../../models/sales/invoice');
const ordercustomer = require('../../../models/user/ordercustomer');
const currency = require('../../../models/system/currency');
exports.dowloadinvoice = async (req, res, next) => {
  res.download(path.join(__dirname, req.params.id + '.pdf'), (err, data) => {});
};

exports.getAllInvoice = async (req, res, next) => {
  const fainaldata = [];
  try {
    const currencydata = await currency
    .findOne({ status: true })
    .select('symbol');
    let invoicedata = '';
    if (req.query.type === 'dashboard') {
      invoicedata = await ordercustomer
        .find()
        .sort({ _id: -1 })
        .limit(5)
        .populate({
          path: 'transection',
          model: 'transection',
          select: 'refid totaldebitamount paymentstatus date paymentgatway',
        });
      if (!invoicedata) {
        res.status(400).json({
          success: false,
          message: 'no data found',
        });
      }
    } else {
      invoicedata = await ordercustomer.find().sort({ _id: -1 }).populate({
        path: 'transection',
        model: 'transection',
        select: 'refid totaldebitamount paymentstatus date paymentgatway',
      });
      if (!invoicedata) {
        res.status(400).json({
          success: false,
          message: 'no data found',
        });
      }
    }
    for (const {
      _id: _id,
      name: name,
      transection: transection,
    } of invoicedata) {
      const data = {
        _id: _id,
        date: transection !== undefined ? transection.date : '',
        refid: transection !== undefined ? transection.refid : '',
        name: name,
        total: transection !== undefined ? transection.totaldebitamount : '',
        method: transection !== undefined ? transection.paymentgatway : '',
        paymentstatus:
          transection !== undefined ? transection.paymentstatus : '',
      };
      fainaldata.push(data);
    }

    res.status(200).json({
      success: true,
      data: fainaldata,
      symbol: currencydata !== null ?currencydata.symbol:''
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: 'server error',
    });
  }
};
