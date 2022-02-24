const mongoose = require('mongoose');

const invoice = new mongoose.Schema({
  productid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'products',
  },
  order: {
    type: String,
  },
  varient1: {
    type: String,
  },
  varient2: {
    type: String,
  },
  varient3: {
    type: String,
  },
  invoice: {
    type: String,
  },
  ordercustomer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'ordercustomer',
  },

  unitprice: {
    type: String,
  },
  taxamout: {
    type: String,
  },
  deliver: {
    type: String,
  },
  quantity: {
    type: String,
  },
  totalamount: {
    type: String,
  },
  tax: {
    type: String,
  },

  created: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('invoice', invoice);
