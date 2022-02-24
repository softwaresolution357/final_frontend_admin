const mongoose = require('mongoose');
const transectionScema = new mongoose.Schema({
  trxid: {
    type: String,
  },
  refid: {
    type: String,
  },
  trxdate: {
    type: String,
  },
  paymentgatway: {
    type: String,
  },
  paymenmode: {
    type: String,
  },
  bankname: {
    type: String,
  },
  paymentype: {
    type: String,
  },
  bankrefno: {
    type: String,
  },
  totaldebitamount: {
    type: String,
  },
  paymentstatus: {
    type: String,
  },
  trxstatus: {
    type: String,
  },
  date: {
    type: String,
  },
  createDate: { type: Date, default: Date.now() },
});
module.exports = mongoose.model('transection', transectionScema);
