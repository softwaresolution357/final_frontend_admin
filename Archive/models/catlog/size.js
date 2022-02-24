const mongoose = require('mongoose');

const sizes = new mongoose.Schema({
  size: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },

  created: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('sizes', sizes);
