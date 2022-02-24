const mongoose = require('mongoose');
const products = require('../catlog/products');
const customer = require('../user/customer');
const wishListSchema = new mongoose.Schema({
  product: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: products,
  },

  customer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: customer,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('wishlist', wishListSchema);
