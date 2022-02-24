const mongoose = require('mongoose');
const cart = new mongoose.Schema({
  product: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'products',
  },
  qty: {
    type: Number,
  },
  sum: {
    type: Number,
  },
  customerid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'register',
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('cart', cart);
