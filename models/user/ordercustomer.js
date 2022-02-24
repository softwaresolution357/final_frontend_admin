const mongoose = require('mongoose');

const ordercustomer = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  usertype: {
    type: String,
    enum: ['guest', 'register', 'login'],
    default: 'guest',
  },
  payment: {
    type: String,
  },
  billing: {
    type: String,
  },
  shipping: {
    type: String,
  },

  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  orderid: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'order',
    },
  ],
  deliverdate: {
    type: String,
  },
  transection: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'transection',
  },
  courier: {
    type: String,
  },
  tracking: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('ordercustomer', ordercustomer);
