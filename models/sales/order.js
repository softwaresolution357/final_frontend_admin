const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const order = new mongoose.Schema({
  refid: {
    type: ObjectId,
    ref: 'transection',
  },
  customerid: {
    type: ObjectId,
    ref: 'ordercustomer',
  },
  order: {
    type: Number,
  },
  invoice: {
    type: String,
  },
  orderdate: {
    type: String,
  },
  productid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'products',
  },
  unitprice: {
    type: String,
  },
  quantity: {
    type: String,
  },
  tax: {
    type: String,
  },
  taxamout: {
    type: String,
  },

  deliver: {
    type: String,
  },

  totalamount: {
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
  brand: {
    type: String,
  },
  courier: {
    type: String,
  },
  tracking: {
    type: String,
  },
  orderstatusdescription: {
    type: ObjectId,
    ref: 'orderstatus',
  },
  createDate: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('order', order);
